import { createAction, props } from '@ngrx/store';

export const setMyStream = createAction(
  '[Stream] Set My Stream',
  props<{ myStream: MediaStream }>()
);

export const setRemoteStream = createAction(
  '[Stream] Set Remote Stream',
  props<{ remoteStream: MediaStream }>()
);

export const setCallStatus = createAction(
  '[Stream] End streaming',
  props<{ callStatus: boolean }>()
);
