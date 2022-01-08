import {all, fork} from 'redux-saga/effects';
import {Saga} from 'redux-saga';

import moviesSaga from './moviesStore/moviesSaga';

const rootSaga: Saga = function* () {
  yield all([fork(moviesSaga)]);
};

export default rootSaga;
