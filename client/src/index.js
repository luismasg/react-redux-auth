import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import {AUTH_USER} from './actions/types';

import App from './components/app';
import Header from './components/header';
import SignOut from './components/auth/signout';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import reducers from './reducers';
import Feature from './components/feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';


// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store=createStoreWithMiddleware(reducers);

const store= applyMiddleware(reduxThunk)(createStore)(reducers);

if (localStorage.getItem('token')){
    store.dispatch({type:AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory} >
          <Route path='/' component={App}>
              <IndexRoute component={Welcome} />
              <Route path="signin"  component={Signin} ></Route>
              <Route path="signout"  component={SignOut} ></Route>
              <Route path="signup"  component={SignUp} ></Route>
              <Route path="feature"  component={RequireAuth(Feature)} ></Route>
          </Route>

      </Router>

  </Provider>
  , document.querySelector('.container'));
