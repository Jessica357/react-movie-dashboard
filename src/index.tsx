import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';

import './index.css';
// import App from './general/scenes/App';
import reportWebVitals from './reportWebVitals';
import createDataStore, {history} from './DataStore';
import routeList from './routeList';

//@ts-ignore
const store = createDataStore();

ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <ConnectedRouter history={history}>
      {/* {' '} */}
      {/* place ConnectedRouter under Provider */}
      {/* <> */}
      {/* {' '} */}
      {/* your usual react-router v4/v5 routing */}
      <Switch>
        {routeList.map((scene) => {
          return <Route exact path={scene.path} component={scene.component} />;
        })}
      </Switch>
      {/* </> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
