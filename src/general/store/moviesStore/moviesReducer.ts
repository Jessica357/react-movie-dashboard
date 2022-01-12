import type {MoviesStoreState, MoviesStoreAction} from './moviesStore-type';

const initialState: MoviesStoreState = {
  isLoading: false,
  page: 1,
  movieList: [],
  movieDetails: null,
  myFavorites: [],
};

export default function moviesReducer(
  state: MoviesStoreState = initialState,
  action: MoviesStoreAction,
) {
  switch (action.type) {
    case 'REFETCH_MOVIE_LIST_REQUESTED': {
      return {
        ...state,
        movieList: [],
        isLoading: true,
      };
    }
    case 'FETCH_MOVIE_LIST_REQUESTED': {
      let {page} = action.payload;
      return {
        ...state,
        page,
        isLoading: true,
      };
    }
    case 'FETCH_MOVIE_LIST_SUCCEEDED': {
      let {movieList: newMovieList} = action.payload;
      return {
        ...state,
        movieList: state.movieList.concat(newMovieList),
      };
    }
    case 'FETCH_MOVIE_LIST_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GET_MOVIE_DETAILS_REQUESTED': {
      return {
        ...state,
        movieDetails: null,
        isLoading: true,
      };
    }
    case 'GET_MOVIE_DETAILS_SUCCEEDED': {
      let {movieDetails} = action.payload;
      return {
        ...state,
        movieDetails,
        isLoading: false,
      };
    }
    case 'GET_MOVIE_DETAILS_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GET_MY_FAVORITES_REQUESTED': {
      return {
        ...state,
        myFavorites: [],
        isLoading: true,
      };
    }
    case 'GET_MY_FAVORITES_SUCCEEDED': {
      let {myFavorites} = action.payload;
      return {
        ...state,
        myFavorites,
        isLoading: false,
      };
    }
    case 'GET_MY_FAVORITES_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'UPDATE_MY_FAVORITES_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_MY_FAVORITES_SUCCEEDED': {
      let {myFavorites} = action.payload;
      return {
        ...state,
        myFavorites,
        isLoading: false,
      };
    }
    case 'UPDATE_MY_FAVORITES_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
