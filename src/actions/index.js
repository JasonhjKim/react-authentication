import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from './types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import history  from '../components/history';

const ROOT_URL = "http://localhost:3090"

export function signInUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', res.data.token);
                history.push('/feature')
            })
            .catch(err => {
                dispatch(authError('Bad login info'));
                console.log(err)
            })
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signOutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}

export function signUpUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(res => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', res.data.token);
                history.push('/feature')
                console.log(res);
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            })
    }
}