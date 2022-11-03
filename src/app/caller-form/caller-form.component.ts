import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Peer from 'peerjs';
import { Subject, takeUntil } from 'rxjs';
import { setCallStatus, setMyStream, setRemoteStream } from '../store/app.actions';
import { fetchCallStatus, fetchMyStream, fetchRemoteStream } from '../store/app.reducer';

@Component({
  selector: 'caller-form',
  templateUrl: './caller-form.component.html',
  styleUrls: ['./caller-form.component.scss']
})
export class CallerFormComponent implements OnInit {
  callId: string | null = null;
  peer: Peer | null = null;
  myStream: MediaStream | null = null;
  generating: boolean | null = null;
  call: any;

  private destroy$ = new Subject();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(fetchMyStream).pipe(
      takeUntil(this.destroy$)
    ).subscribe((myStream: any) => {
      this.myStream = myStream;
    });

    this.store.select(fetchCallStatus).pipe(
      takeUntil(this.destroy$)
    ).subscribe((callStatus: boolean) => {
      if (this.peer?.id && !!this.call && !callStatus) {
        this.endCall();
      }
    });
  }

  startCall(): void {
    this.generating = true;

    this.peer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
      ]},
      debug: 1
    });

    this.peer.on('open', (id: string) => {
      this.callId = id;
      this.generating = false;
    });

    this.peer.on('call', (call: any) => {
      // Answer incoming call
      this.call = call;
      call.answer(this.myStream);
      // Handle incoming call
      call.on('stream', (remoteStream: any) => {
        this.store.dispatch(setCallStatus({ callStatus: true }));
        this.store.dispatch(setRemoteStream({ remoteStream }));
      });

      // known bug with peerjs means that this currently does not work
      call?.on('close', () => {
        alert('Call ended');
      });
    });

    this.peer.on('error', console.error);
  }

  copyCallId(): void {
    if (this.callId) {
      navigator.clipboard.writeText(this.callId);
      alert(`${this.callId} has been copied to clipboard`);
    }
  }

  endCall(): void {
    this.call.close();
    this.resetState();
  }

  resetState(): void {
    this.store.dispatch(setRemoteStream({ remoteStream: {} as MediaStream }));
    this.store.dispatch(setCallStatus({ callStatus: false }));
    this.callId = this.peer = null;
  }
}
