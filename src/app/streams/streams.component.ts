import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchRemoteStream } from '../store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { setMyStream } from '../store/app.actions';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit, OnDestroy {
  hasRemoteStream: boolean = false;

  private destroy$ = new Subject<boolean>();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    const webcamVideo = document.getElementById('webcamVideo') as HTMLVideoElement;
    const remoteCamVideo = document.getElementById('remoteVideo') as HTMLVideoElement;

    // Get and display local stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((myStream) => {
        this.store.dispatch(setMyStream({ myStream }));
        webcamVideo.srcObject = myStream;
      })
      .catch((err) => {
        alert('There was an error');
        console.error(err)
      });

    // Get and display peer's stream
    this.store.select(fetchRemoteStream).pipe(
      takeUntil(this.destroy$)
    ).subscribe((remoteStream: any) => {
      console.log(remoteStream, remoteStream.id)
      if (remoteStream.id) {
        remoteCamVideo.srcObject = remoteStream;
        this.hasRemoteStream = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
