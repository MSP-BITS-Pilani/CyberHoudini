import * as actionTypes from './actionTypes';
import axios from 'axios';
import baseUrl from '../../baseUrl';

const logThemIn = (user) => {
    console.log(user);
    return {
        type: actionTypes.LOGIN,
        payload: user
    };
}

export const login = (user) => {
    console.log(user);
    return (dispatch) => {
        dispatch(logThemIn(user));
    }
}

export const logout = () => {
    return (dispatch) => {
        const cookies = document.cookie.split('; ');
        const value = cookies.find(item => item.startsWith('jwt')).split('=')[1];
        console.log(value);
        axios({
            url: baseUrl + '/auth/logout',
            method: 'post',
            headers: {
            Authorization: `Bearer ${value}`
            }
        }).then( response => {
            if(response.status === 200) {
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                alert("you have been logged out");
                dispatch({ type: actionTypes.LOGOUT });
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                console.log(response);
                error.response = response;
                throw error;
            }
        }).catch(error => {
            console.log(error);
            alert("Could not logout.\nError: "+ error.message);
        });
    };
}
