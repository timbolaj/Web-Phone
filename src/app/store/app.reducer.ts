import { state } from '@angular/animations';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setMyStream, setRemoteStream } from './app.actions';

interface appState {
  myStream: string;
  remoteStream: string;
}

export const initialState = {
  myStream: 'blah',
  remoteStream: '',
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
);

export function appReducer(state: appState | undefined, action: Action) {
  return _appReducer(state, action);
}

const appSelector = createFeatureSelector<appState>('appState');

export const fetchMyStream = createSelector(appSelector, (state) => state.myStream);
export const fetchRemoteStream = createSelector(appSelector, (state) => state.remoteStream);
