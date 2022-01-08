import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './general/store/rootReducer';
import rootSaga from './general/store/rootSaga';

const sagaMiddleWare = createSagaMiddleware();

const createDataStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
  sagaMiddleWare.run(rootSaga);
  return store;
};

export default createDataStore;
