import { Action, createReducer, on } from '@ngrx/store';
import { User, UserRegister, UserSignIn } from 'src/app/interface';

import * as AuthActions from '../actions/login-register.actions';

export const AUTH_SIGNIN_FEATURE_KEY = 'signin';
export const AUTH_SIGNUP_FEATURE_KEY = 'signup';

// user sign-in
export interface SignInState {
        user: User;
        errorMessage: string;
        query: UserSignIn;
        isSearch: boolean;
}
export const initialSignInState: SignInState = {
        user: null,
        errorMessage: '',
        query: {
                userEmail: {
                        email: '',
                        state: false
                },
                userPassword: {
                        password: '',
                        state: false
                }
        },
        isSearch: false
};

// user sign-up
export interface SignUpState {
        user: User;
        errorMessage: string;
        query: UserRegister;
        isSearch: boolean;
}
export const initialSignUpState: SignUpState = {
        user: null,
        errorMessage: '',
        query: {
                userName: {
                        name: '',
                        state: false
                },
                userEmail: {
                        email: '',
                        state: false
                },
                userMobile: {
                        mobile: '',
                        state: false
                },
                userPassword: {
                        password: '',
                        state: false
                },
                userRePassword: {
                        re_password: '',
                        state: false
                }
        },
        isSearch: false
};

export interface AuthSignInPartialState {
        readonly [AUTH_SIGNIN_FEATURE_KEY]: SignInState;
}

export interface AuthSignUpPartialState {
        readonly [AUTH_SIGNUP_FEATURE_KEY]: SignUpState;
}

const auth_reducer_signin_$ = createReducer(initialSignInState,
        on(AuthActions?.called_login$, () => ({
                ...initialSignInState,
                isSearch: true
        })),
        on(AuthActions?.server_login$, (state, { query }) => ({
                ...state,
                query: query
        })),
        on(AuthActions?.success_login$, (state, { payload }) => ({
                ...state,
                data: payload?.data,
                token: payload?.token,
                isSearch: false
        })),
        on(AuthActions?.failed_login$, (state, { err }) => ({
                ...state,
                isSearch: false,
                errorMessage: err
        })),
        on(AuthActions?.reset_login$, () => ({
                ...initialSignInState
        }))
);

const auth_reducer_signup_$ = createReducer(initialSignUpState,
        on(AuthActions?.called_register$, () => ({
                ...initialSignUpState,
                isSearch: true
        })),
        on(AuthActions?.server_register$, (state, { query }) => ({
                ...state,
                query: query
        })),
        on(AuthActions?.success_register$, (state, { payload }) => ({
                ...state,
                data: payload?.data,
                isSearch: false
        })),
        on(AuthActions?.failed_register$, (state, { err }) => ({
                ...state,
                isSearch: false,
                errorMessage: err
        })),
        on(AuthActions?.reset_register$, () => ({
                ...initialSignUpState
        }))
);

export function auth_reducer_signin$(state: SignInState, action: Action) {
        return auth_reducer_signin_$(state, action);
}

export function auth_reducer_signup$(state: SignUpState, action: Action) {
        return auth_reducer_signup_$(state, action);
}