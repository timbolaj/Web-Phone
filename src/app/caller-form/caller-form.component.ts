import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Peer from 'peerjs';
import { Subject, takeUntil } from 'rxjs';
import { setRemoteStream } from '../store/app.actions';
import { fetchMyStream } from '../store/app.reducer';

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
      call.answer(this.myStream);
      call.on('stream', (remoteStream: any) => {
        this.store.dispatch(setRemoteStream({ remoteStream }));
      });
    });

    this.peer.on('error', console.error)
  }

  copyCallId(): void {
    if (this.callId) {
      navigator.clipboard.writeText(this.callId);
      alert(`${this.callId} has been copied to clipboard`);
    }
  }
}
