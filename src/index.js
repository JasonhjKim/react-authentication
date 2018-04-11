import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router} from 'react-router-dom'
import { createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import history from './components/history';
import './index.css';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/require_auth';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')
if (token) {
    store.dispatch({ type: AUTH_USER })
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route path="/signin" component={SignIn} />
                <Route path="/signout" component={SignOut} />
                <Route path="/signup" component={SignUp} />
                <Route path="/feature" component={RequireAuth(Feature)} />
            </App>
        </Router>
    </Provider>
    , document.getElementById('root'));
