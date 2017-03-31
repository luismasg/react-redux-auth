import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Header from './components/header';
import SignOut from './components/auth/signout';
import Signin from './components/auth/signin';
import SignUp from './components/auth/signup';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

      <Router history={browserHistory} >


          <Route path='/' component={App}>
              <Route path="signin"  component={Signin} ></Route>
              <Route path="signout"  component={SignOut} ></Route>
              <Route path="signup"  component={SignUp} ></Route>
          </Route>

      </Router>

  </Provider>
  , document.querySelector('.container'));
