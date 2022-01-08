export type MovieListItem = {
  title: string;
  year: string;
  movieID: string;
  type: string;
  poster: string;
};

export type GetMovieDetails = {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
};

export type MoviesStoreState = {
  isLoading: boolean;
  movieList: Array<MovieListItem>;
  movieDetails: GetMovieDetails | null;
};

export type MoviesStoreAction =
  | {
      type: 'FETCH_MOVIE_LIST_REQUESTED';
    }
  | {
      type: 'FETCH_MOVIE_LIST_SUCCEEDED';
      payload: {
        movieList: Array<MovieListItem>;
      };
    }
  | {
      type: 'FETCH_MOVIE_LIST_FAILED';
    };
