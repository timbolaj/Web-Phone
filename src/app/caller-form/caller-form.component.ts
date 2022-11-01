import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Peer from 'peerjs';
import { Subject, takeUntil } from 'rxjs';
import { setMyStream, setRemoteStream } from '../store/app.actions';
import { fetchMyStream } from '../store/app.reducer';

@Component({
  selector: 'caller-form',
  templateUrl: './caller-form.component.html',
  styleUrls: ['./caller-form.component.scss']
})
export class CallerFormComponent implements OnInit {
  callId: any;
  peer: any;
  myStream: any;

  private destroy$ = new Subject();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    const webcamVideo = document.getElementById('webcamVideo') as HTMLVideoElement;

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((myStream) => {
        this.store.dispatch(setMyStream({ myStream }))
        webcamVideo.srcObject = myStream;
      })
      .catch((err) => {
        alert('There was an error');
        console.error(err)
      });

    this.store.select(fetchMyStream).pipe(
      takeUntil(this.destroy$)
    ).subscribe((myStream: any) => {
      this.myStream = myStream;
    });
  }

  startCall(): void {
    this.peer = new Peer({
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
      ]},
    });

    this.peer.on('open', (id: string) => {
      this.callId = id;
    });

    this.peer.on('call', (call: any) => {
      const remoteCamVideo = document.getElementById('remoteVideo') as HTMLVideoElement;

      call.answer(this.myStream);
      call.on('stream', (remoteStream: any) => {
        remoteCamVideo.srcObject = remoteStream;
      })
    });

    this.peer.on('error', console.error)
  }
}
