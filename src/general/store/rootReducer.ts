import {combineReducers} from 'redux';

import moviesReducer from './moviesStore/moviesReducer';

export default combineReducers({
  movies: moviesReducer,
});
