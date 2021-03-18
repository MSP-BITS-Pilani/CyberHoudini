import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    loggedIn: false,
    userData: undefined
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN :
            console.log(action.payload);
            return { loggedIn: true, userData: action.payload }
        case actionTypes.LOGOUT :
            return { loggedIn: false, userData: undefined }
        default:
            return {
                ...state
            }
    }
};

export default loginReducer;