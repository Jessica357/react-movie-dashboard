import {call, put, takeLatest} from 'redux-saga/effects';

import moviesAPI from './moviesAPI';
import {MoviesStoreAction} from './moviesStore-type';

export default function* authorizationSagaWatcher() {
  yield takeLatest('REFETCH_MOVIE_LIST_REQUESTED', refetchMovieList);
  yield takeLatest('FETCH_MOVIE_LIST_REQUESTED', fetchMovieList);
  yield takeLatest('GET_MOVIE_DETAILS_REQUESTED', getMovieDetails);
  yield takeLatest('GET_MY_FAVORITES_REQUESTED', getMyFavorites);
  yield takeLatest('UPDATE_MY_FAVORITES_REQUESTED', updateMyFavorites);
}

export function* refetchMovieList(action: MoviesStoreAction): any {
  if (action.type !== 'REFETCH_MOVIE_LIST_REQUESTED') {
    return;
  }

  let {page} = action.payload;

  yield put({
    type: 'FETCH_MOVIE_LIST_REQUESTED',
    payload: {
      page,
    },
  });
}

export function* fetchMovieList(action: MoviesStoreAction): any {
  if (action.type !== 'FETCH_MOVIE_LIST_REQUESTED') {
    return;
  }

  try {
    let {page} = action.payload;
    const movieListFromServer = yield call(moviesAPI.getMovieList, page);

    if (movieListFromServer.Response === 'True') {
      yield put({
        type: 'FETCH_MOVIE_LIST_SUCCEEDED',
        payload: {
          movieList: movieListFromServer.Search,
        },
      });
      yield put({
        type: 'FETCH_MOVIE_LIST_REQUESTED',
        payload: {
          page: page + 1,
        },
      });
    } else {
      yield put({
        type: 'FETCH_MOVIE_LIST_FAILED',
      });
    }
  } catch (error) {
    yield put({
      type: 'FETCH_MOVIE_LIST_FAILED',
    });
  }
}

export function* getMovieDetails(action: MoviesStoreAction): any {
  if (action.type !== 'GET_MOVIE_DETAILS_REQUESTED') {
    return;
  }

  try {
    let {id} = action.payload;
    const movieDetailsFromServer = yield call(moviesAPI.getMovieDetails, id);

    if (movieDetailsFromServer.Response === 'True') {
      yield put({
        type: 'GET_MOVIE_DETAILS_SUCCEEDED',
        payload: {
          movieDetails: movieDetailsFromServer,
        },
      });
    } else {
      yield put({
        type: 'GET_MOVIE_DETAILS_FAILED',
      });
    }
  } catch (error) {
    yield put({
      type: 'GET_MOVIE_DETAILS_FAILED',
    });
  }
}

export function* getMyFavorites(action: MoviesStoreAction): any {
  if (action.type !== 'GET_MY_FAVORITES_REQUESTED') {
    return;
  }

  try {
    let {myNewFavorites} = action.payload;
    const myFavoritesFromLocalStorage = localStorage.getItem('myFavorites');

    if (myFavoritesFromLocalStorage) {
      yield put({
        type: 'GET_MY_FAVORITES_SUCCEEDED',
        payload: {
          myFavorites: JSON.parse(myFavoritesFromLocalStorage),
        },
      });
    } else {
      yield put({
        type: 'GET_MY_FAVORITES_FAILED',
      });
      yield put({
        type: 'UPDATE_MY_FAVORITES_REQUESTED',
        payload: {myNewFavorites},
      });
    }
  } catch (error) {
    yield put({
      type: 'GET_MY_FAVORITES_FAILED',
    });
  }
}

export function* updateMyFavorites(action: MoviesStoreAction): any {
  if (action.type !== 'UPDATE_MY_FAVORITES_REQUESTED') {
    return;
  }

  try {
    let {myNewFavorites} = action.payload;
    localStorage.setItem('myFavorites', JSON.stringify(myNewFavorites));

    yield put({
      type: 'UPDATE_MY_FAVORITES_SUCCEEDED',
      payload: {
        myFavorites: myNewFavorites,
      },
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_MY_FAVORITES_FAILED',
    });
  }
}
