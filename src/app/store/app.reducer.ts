import { state } from '@angular/animations';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setMyStream, setRemoteStream, setPeerConnection } from './app.actions';

interface appState {
  myStream: MediaStream;
  remoteStream: MediaStream;
  peerConnection: any;
};

export const initialState = {
  myStream: {},
  remoteStream: {},
  peerConnection: {},
};

const _appReducer = createReducer(
  initialState,

  on(setMyStream, (state, { myStream }) => {
    return {
      ...state,
      myStream: myStream,
    }
  }),

  on(setRemoteStream, (state, { remoteStream }) => {
    return {
      ...state,
      remoteStream: remoteStream,
    }
  }),

  on(setPeerConnection, (state, { peerConnection }) => {
    return {
      ...state,
      peerConnection,
    }
  }),
);

export function appReducer(state: appState, action: Action): any {
  return _appReducer(state, action);
}

const appSelector = createFeatureSelector<appState>('appState');

export const fetchMyStream = createSelector(appSelector, (state) => state?.myStream);
export const fetchRemoteStream = createSelector(appSelector, (state) => state?.remoteStream);
