import { Action, createReducer, on } from '@ngrx/store';
import { Chat, QueryUsers, User } from 'src/app/interface';

import * as UsersActionTypes from '../actions/users.actions';

export const USERS_RECENT_CHATS_FEATURE_KEY = 'users_recent_chats';
export const USERS_RECENT_CHATS_SEARCH_KEY = 'users_recent_chats_search';

export interface UsersRecentChatsState {
        users: User[];
        online: { userID: string }[];
        page: number;
        limit: number;
        totalPages: number;
        totalResults: number;
        message: string;
        status: string;
        query: QueryUsers;
        isSearch: boolean;
        isSearchMore?: boolean;
}

export const initialUsersState: UsersRecentChatsState = {
        users: [],
        online: [],
        page: 0,
        limit: 0,
        totalPages: 0,
        totalResults: 0,
        message: '',
        status: '',
        query: {
                userID: '',
                searchword: '',
                pagesize: '',
                page: '',
                sortBy: ''
        },
        isSearch: false,
        isSearchMore: false
};

export const initialUsersSearchState: UsersRecentChatsState = {
        users: [],
        online: [],
        page: 0,
        limit: 0,
        totalPages: 0,
        totalResults: 0,
        message: '',
        status: '',
        query: {
                userID: '',
                searchword: '',
                pagesize: '',
                page: '',
                sortBy: ''
        },
        isSearch: false
};

export interface UsersRecentChatsPartialState {
        readonly [USERS_RECENT_CHATS_FEATURE_KEY]: UsersRecentChatsState;
}

export interface UsersRecentChatsSearchPartialState {
        readonly [USERS_RECENT_CHATS_SEARCH_KEY]: UsersRecentChatsState;
}

function update_user_chat(current_user: User, chat: Chat[], selectedID?: string) {
        switch (true) {
                case (current_user?.userID === selectedID && current_user?.userID === chat[0].toUserId): {
                        return [{ recent_chat: chat, unread: [] }];
                }
                case (current_user?.userID === selectedID && current_user?.userID === chat[0].fromUserId): {
                        return [{ recent_chat: chat, unread: [] }];
                }
                case (!selectedID && current_user?.userID === chat[0]?.fromUserId): {
                        return [{ recent_chat: chat, unread: [...current_user?.chats[0]?.unread, ...chat] }];
                }
                case (current_user?.userID !== selectedID && current_user?.userID === chat[0]?.fromUserId): {
                        return [{ recent_chat: chat, unread: [...current_user?.chats[0]?.unread, ...chat] }];
                }
                default: {
                        return current_user?.chats;
                }
        }
}

function update_chats(users: User[], chat: Chat[], selectedID?: string) {
        const temp = users.map((user) =>
                Object.assign({}, user, {
                        chats: update_user_chat(user, chat, selectedID)
                })
        );
        return temp;
}

function update_chats_unread(users: User[], selectedID: string) {
        const temp = users.map((user) =>
                Object.assign({}, user, {
                        chats: user?.userID === selectedID ? [{ recent_chat: user?.chats[0]?.recent_chat, unread: [] }] : user?.chats
                })
        );
        return temp;
}

function update_online_user(users: User[], list: { userID: string }[]) {
        const temp = users.map((item) =>
                Object.assign({}, item, {
                        userStatus: item.userID === list.filter(o => o?.userID === item?.userID)[0]?.userID ? 'Online' : 'Offline'
                })
        );
        return temp;
}

const users_recent_chats_reducer_$ = createReducer(initialUsersState,
        on(UsersActionTypes?.load_initial_users$, ({ query }) => ({
                ...initialUsersState,
                query,
                isSearch: true
        })),
        on(UsersActionTypes?.search_start_users$, (state, { query }) => ({
                ...state,
                query: query
        })),
        on(UsersActionTypes?.search_ended_success_users$, (state) => ({
                ...state,
                isSearch: false
        })),
        on(UsersActionTypes?.add_users_in_state$, (state, { payload }) => ({
                ...state,
                users: update_online_user(payload?.data[0]?.results, state?.online),
                page: payload?.data[0]?.page,
                limit: payload?.data[0]?.limit,
                totalPages: payload?.data[0]?.totalPages,
                totalResults: payload?.data[0]?.totalResults,
                message: payload?.message,
                status: payload?.status
        })),
        on(UsersActionTypes?.search_more_users$, (state, { query }) => ({
                ...state,
                query,
                isSearchMore: true
        })),
        on(UsersActionTypes?.search_start_more_users$, (state, { query }) => ({
                ...state,
                query
        })),
        on(UsersActionTypes?.search_ended_success_more_users$, (state) => ({
                ...state,
                isSearchMore: false
        })),
        on(UsersActionTypes?.add_more_users_in_state$, (state, { payload }) => ({
                ...state,
                users: [...state.users, ...update_online_user(payload?.data[0]?.results, state?.online)],
                page: payload?.data[0]?.page,
                limit: payload?.data[0]?.limit,
                totalPages: payload?.data[0]?.totalPages,
                totalResults: payload?.data[0]?.totalResults,
                message: payload?.message,
                status: payload?.status
        })),
        on(UsersActionTypes?.send_and_receive_chat_user$, (state, { payload }) => ({
                ...state,
                users: update_chats(state.users, payload?.chat, payload?.selectedID)
        })),
        on(UsersActionTypes?.add_chat_online_user$, (state, { payload }) => ({
                ...state,
                users: update_online_user(state.users, payload?.users),
                online: payload?.users
        })),
        on(UsersActionTypes?.success_reset_user_unread_chats$, (state, { success }) => ({
                ...state,
                users: update_chats_unread(state.users, JSON.parse(success?.query)?.receiverUserID)
        })),
        on(UsersActionTypes?.failure_reset_user_unread_chats$, (state) => ({
                ...state,
                users: state?.users
        })),
        on(UsersActionTypes?.failure_search_users$, (state, { err }) => ({
                ...state,
                isSearch: false,
                isSearchMore: false,
                errorMessage: err
        })),
        on(UsersActionTypes?.reset_users_state$, () => ({
                ...initialUsersState
        }))
);

const users_recent_chats_search_reducer_$ = createReducer(initialUsersSearchState,
        on(UsersActionTypes?.search_icon_clicked$, () => ({
                ...initialUsersSearchState,
                isSearch: true
        })),
        on(UsersActionTypes?.copy_users_recent_chats$, (state) => ({
                ...state,
        })),
        on(UsersActionTypes?.start_search_users_recent_chats$, (state, { query }) => ({
                ...state,
                query: query,
                isSearch: true
        })),
        on(UsersActionTypes?.search_ended_success_search_users$, (state) => ({
                ...state
        })),
        on(UsersActionTypes?.add_search_users_in_state$, (state, { payload }) => ({
                ...state,
                users: update_online_user(payload?.data[0]?.results, state?.online),
                page: payload?.data[0]?.page,
                limit: payload?.data[0]?.limit,
                totalPages: payload?.data[0]?.totalPages,
                totalResults: payload?.data[0]?.totalResults,
                message: payload?.message,
                status: payload?.status,
                isSearch: false
        })),
        on(UsersActionTypes?.failure_search_users$, (state, { err }) => ({
                ...state,
                isSearch: false,
                errorMessage: err
        })),
        on(UsersActionTypes?.reset_users_state$, () => ({
                ...initialUsersSearchState
        }))
);

export function users_recent_chats_reducer$(state: UsersRecentChatsState, action: Action) {
        return users_recent_chats_reducer_$(state, action);
}

export function users_recent_chats_search_reducer$(state: UsersRecentChatsState, action: Action) {
        return users_recent_chats_search_reducer_$(state, action);
}