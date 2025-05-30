
import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.patload?.DT?.access_token,
                    refresh_token: action?.patload?.DT?.refresh_token,
                    username: action?.patload?.DT?.username,
                    image: action?.patload?.DT?.image,
                    role: action?.patload?.DT?.role,
                    email: action?.patload?.DT?.email

                },
                isAuthenticated: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: ''
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;