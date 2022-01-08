import type {MoviesStoreState, MoviesStoreAction} from './moviesStore-type';

const initialState: MoviesStoreState = {
  isLoading: false,
  movieList: [],
  movieDetails: null,
};

export default function moviesReducer(
  state: MoviesStoreState = initialState,
  action: MoviesStoreAction,
) {
  switch (action.type) {
    case 'FETCH_MOVIE_LIST_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FETCH_MOVIE_LIST_SUCCEEDED': {
      let {movieList} = action.payload;
      return {
        ...state,
        movieList,
        isLoading: false,
      };
    }
    case 'FETCH_MOVIE_LIST_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
