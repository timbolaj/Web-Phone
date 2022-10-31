import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchMyStream, fetchRemoteStream } from '../store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss']
})
export class StreamsComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<boolean>();

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.select(fetchMyStream)
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe(console.log);

    this.store.select(fetchRemoteStream)
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
  }
}
