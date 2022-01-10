import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import moviesReducer from './moviesStore/moviesReducer';

// export default combineReducers({
//   movies: moviesReducer,
// });

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    movies: moviesReducer,
  });

export default createRootReducer;
