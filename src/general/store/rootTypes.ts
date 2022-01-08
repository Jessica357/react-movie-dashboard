import {
  MoviesStoreAction,
  MoviesStoreState,
} from './moviesStore/moviesStore-type';

export type RootState = {
  movies: MoviesStoreState;
};

export type Action = MoviesStoreAction;

export type Dispatch = (action: Action) => void;
