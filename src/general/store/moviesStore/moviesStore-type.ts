export type MovieListItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type GetMovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MoviesStoreState = {
  isLoading: boolean;
  page: number;
  movieList: Array<MovieListItem>;
  movieDetails: GetMovieDetails | null;
  myFavorites: Array<string>;
};

export type MoviesStoreAction =
  | {
      type: 'REFETCH_MOVIE_LIST_REQUESTED';
      payload: {page: number};
    }
  | {
      type: 'FETCH_MOVIE_LIST_REQUESTED';
      payload: {page: number};
    }
  | {
      type: 'FETCH_MOVIE_LIST_SUCCEEDED';
      payload: {
        movieList: Array<MovieListItem>;
      };
    }
  | {
      type: 'FETCH_MOVIE_LIST_FAILED';
    }
  | {
      type: 'GET_MOVIE_DETAILS_REQUESTED';
      payload: {id: string};
    }
  | {
      type: 'GET_MOVIE_DETAILS_SUCCEEDED';
      payload: {
        movieDetails: GetMovieDetails;
      };
    }
  | {
      type: 'GET_MOVIE_DETAILS_FAILED';
    }
  | {
      type: 'GET_MY_FAVORITES_REQUESTED';
      payload: {myNewFavorites: Array<string>};
    }
  | {
      type: 'GET_MY_FAVORITES_SUCCEEDED';
      payload: {
        myFavorites: Array<string>;
      };
    }
  | {
      type: 'GET_MY_FAVORITES_FAILED';
    }
  | {
      type: 'UPDATE_MY_FAVORITES_REQUESTED';
      payload: {myNewFavorites: Array<string>};
    }
  | {
      type: 'UPDATE_MY_FAVORITES_SUCCEEDED';
      payload: {
        myFavorites: Array<string>;
      };
    }
  | {
      type: 'UPDATE_MY_FAVORITES_FAILED';
    };
