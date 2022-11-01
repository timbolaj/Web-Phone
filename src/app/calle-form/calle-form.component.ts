import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Peer from 'peerjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { setRemoteStream } from '../store/app.actions';
import { fetchMyStream } from '../store/app.reducer';

@Component({
  selector: 'callee-form',
  templateUrl: './calle-form.component.html',
  styleUrls: ['./calle-form.component.scss']
})
export class CalleFormComponent implements OnInit, OnDestroy {
  peer: any = null;
  myStream: any;

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

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  joinPeer(): void {
    this.peer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
      ]},
    });

    this.peer.on('open', () => {
      // Call peer on that id
      const callId = document.getElementById("call-field") as HTMLInputElement;
      const call = this.peer.call(callId.value, this.myStream);

      // Handle peer answer
      call.on('stream', (remoteStream: any) => {
        console.log('on stream', remoteStream)
        const remoteCamVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
        this.store.dispatch(setRemoteStream({ remoteStream }));
        remoteCamVideo.srcObject = remoteStream;
      });
    });

    this.peer.on('error', console.error)
  }
}
