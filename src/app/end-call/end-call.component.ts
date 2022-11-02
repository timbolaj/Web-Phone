import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { setCallStatus } from '../store/app.actions';
import { fetchCallStatus, fetchRemoteStream } from '../store/app.reducer';

@Component({
  selector: 'end-call',
  templateUrl: './end-call.component.html',
  styleUrls: ['./end-call.component.scss']
})
export class EndCallComponent implements OnInit {
  inCall: boolean = false;
  destroy$ = new Subject();
  peerConnection: any;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(fetchRemoteStream).pipe(
      takeUntil(this.destroy$)
    ).subscribe((remoteStream: MediaStream) => {
      this.inCall = !!remoteStream.id;
    });

    this.store.select(fetchCallStatus).pipe(
      takeUntil(this.destroy$)
    ).subscribe((callStatus: boolean) => this.inCall = callStatus);
  };

  endCall(): void {
    this.store.dispatch(setCallStatus({ callStatus: false }));
  }
}
