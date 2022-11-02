import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setCallStatus, setMyStream, setRemoteStream } from './app.actions';

interface appState {
  myStream: MediaStream;
  remoteStream: MediaStream;
  callStatus: boolean;
};

export const initialState = {
  myStream: {},
  remoteStream: {},
  callStatus: false,
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

  on(setCallStatus, (state, { callStatus }) => {
    return {
      ...state,
      callStatus,
    }
  }),
);

export function appReducer(state: appState, action: Action): any {
  return _appReducer(state, action);
}

const appSelector = createFeatureSelector<appState>('appState');

export const fetchMyStream = createSelector(appSelector, (state) => state?.myStream);
export const fetchRemoteStream = createSelector(appSelector, (state) => state?.remoteStream);
export const fetchCallStatus = createSelector(appSelector, (state) => state.callStatus);
