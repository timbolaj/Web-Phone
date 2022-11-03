import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Peer from 'peerjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { setCallStatus, setMyStream, setRemoteStream } from '../store/app.actions';
import { fetchCallStatus, fetchMyStream, fetchRemoteStream } from '../store/app.reducer';

@Component({
  selector: 'callee-form',
  templateUrl: './calle-form.component.html',
  styleUrls: ['./calle-form.component.scss']
})
export class CalleFormComponent implements OnInit, OnDestroy {
  peer: Peer | null = null;
  myStream: any;
  call: any;
  inCall: boolean = false;

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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  joinPeer(): void {
    this.peer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
      ]},
      debug: 1
    });

    this.peer.on('open', () => {
      // Call peer on that id
      const callId = document.getElementById("call-field") as HTMLInputElement;

      if (!callId.value) {
        return;
      }

      const call = this.peer?.call(callId.value, this.myStream);
      this.call = call;
      // Handle peer answer
      call?.on('stream', (remoteStream: any) => {
        this.store.dispatch(setCallStatus({ callStatus: true }));
        this.store.dispatch(setRemoteStream({ remoteStream }));
      });

      // known bug with peerjs means that this curently does not work
      call?.on('close', () => {
        alert('Call ended');
      });
    });

    this.peer.on('error', console.error)
  }

  endCall(): void {
    this.call.close();
    this.resetState();
  }

  resetState(): void {
    this.store.dispatch(setRemoteStream({ remoteStream: {} as MediaStream }));
    this.store.dispatch(setCallStatus({ callStatus: false }));
    this.peer = null;
  }
}
