import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_SIGNIN_FEATURE_KEY, AUTH_SIGNUP_FEATURE_KEY, SignInState, SignUpState } from './reducers/login-register.reducer';
import { UsersRecentChatsState, USERS_RECENT_CHATS_FEATURE_KEY, USERS_RECENT_CHATS_SEARCH_KEY } from './reducers/users.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthSignInState = createFeatureSelector<SignInState>(AUTH_SIGNIN_FEATURE_KEY);
export const getAuthSignUpState = createFeatureSelector<SignUpState>(AUTH_SIGNUP_FEATURE_KEY);

// Lookup the 'Users' feature state managed by NgRx
export const getUsersRecentChatsState = createFeatureSelector<UsersRecentChatsState>(USERS_RECENT_CHATS_FEATURE_KEY);
export const getUsersRecentSearchChatsState = createFeatureSelector<UsersRecentChatsState>(USERS_RECENT_CHATS_SEARCH_KEY);

// Auth related selected
export const sign_in$ = createSelector(getAuthSignInState, (state: SignInState) => state);
export const sign_up$ = createSelector(getAuthSignUpState, (state: SignUpState) => state);

// Users related selected
export const recent_chats$ = createSelector(getUsersRecentChatsState, (state: UsersRecentChatsState) => state);
export const recent_searched_chats$ = createSelector(getUsersRecentSearchChatsState, (state: UsersRecentChatsState) => state);


