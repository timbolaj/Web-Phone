import { createAction, props } from '@ngrx/store';

export const setMyStream = createAction(
  '[Stream] Set My Stream',
  props<{ myStream: string }>()
);

export const setRemoteStream = createAction(
  '[Stream] Set Remote Stream',
  props<{ remoteStream: string }>()
);
