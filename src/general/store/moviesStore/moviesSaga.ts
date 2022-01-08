import {call, put, takeLatest} from 'redux-saga/effects';

import moviesAPI from './moviesAPI';
import {MoviesStoreAction} from './moviesStore-type';
// import {MoviesStoreAction, MoviesStoreState} from './moviesStore-type';

export default function* authorizationSagaWatcher() {
  yield takeLatest('FETCH_MOVIE_LIST_REQUESTED', fetchMovieList);
}

export function* fetchMovieList(action: MoviesStoreAction): any {
  if (action.type !== 'FETCH_MOVIE_LIST_REQUESTED') {
    return;
  }
  console.log('SAGA');
  try {
    const movieListFromServer = yield call(moviesAPI.getMovieList);
    console.log('movieListFromServer', movieListFromServer);

    yield put({
      type: '_FETCH_MOVIE_LIST_SUCCEEDED',
      payload: {
        moviesList: movieListFromServer.search,
      },
    });
  } catch (error) {
    yield put({
      type: 'FETCH_MOVIE_LIST_FAILED',
    });
  }
}
