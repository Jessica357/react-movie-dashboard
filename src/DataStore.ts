import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import rootReducer from './general/store/rootReducer';
import rootSaga from './general/store/rootSaga';

export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleware();

const createDataStore = (preloadedState: any) => {
  // const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
  // sagaMiddleWare.run(rootSaga);
  const store = createStore(
    rootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleWare,
      ),
    ),
  );
  sagaMiddleWare.run(rootSaga);
  return store;
};

export default createDataStore;
