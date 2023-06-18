import { createAction, props } from '@ngrx/store';
import { Chat, QueryUsers, Users } from 'src/app/interface';


// initial fetch users actions
export const load_initial_users$ = createAction('[User Recent Chat] load_initial_users', props<{ query: QueryUsers; }>());
export const search_start_users$ = createAction('[User Recent Chat] search_start_users', props<{ query: QueryUsers; }>());
export const search_ended_success_users$ = createAction('[User Recent Chat] search_ended_success_users', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());
export const add_users_in_state$ = createAction('[User Recent Chat] add_users_in_state', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());


// failure and reset user state actions
export const failure_search_users$ = createAction('[User Recent Chat] failure_search_users', props<{ err: string; }>());
export const reset_users_state$ = createAction('[User Recent Chat] reset_users_state', props<{ query?: string; }>());


// fetch more users actions
export const search_more_users$ = createAction('[User Recent Chat] search_more_users', props<{ query: QueryUsers; }>());
export const search_start_more_users$ = createAction('[User Recent Chat] search_start_more_users', props<{ query: QueryUsers; }>());
export const search_ended_success_more_users$ = createAction('[User Recent Chat] search_ended_success_more_users', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());
export const add_more_users_in_state$ = createAction('[User Recent Chat] add_more_users_in_state', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());


// reset user unread chats actions
export const reset_user_unread_chats$ = createAction('[User Recent Chat] reset_user_unread_chats', props<{ query?: string; }>());
export const start_reset_user_unread_chats$ = createAction('[User Recent Chat] start_reset_user_unread_chats', props<{ query?: string; }>());
export const failure_reset_user_unread_chats$ = createAction('[User Recent Chat] failure_reset_user_unread_chats', props<{ err: string; }>());
export const success_reset_user_unread_chats$ = createAction('[User Recent Chat] success_reset_user_unread_chats', props<{
        success: {
                query: string;
                code: number;
                message?: string;
        }
}>());


// others users related actions
export const send_and_receive_chat_user$ = createAction('[User Recent Chat] send_and_receive_chat_user', props<{
        payload: {
                selectedID: string;
                chat: Chat[];
        }
}>());
export const add_chat_online_user$ = createAction('[User Recent Chat] add_chat_online_user', props<{
        payload: {
                users: { userID: string }[]
        }
}>());


// search users actions
export const search_icon_clicked$ = createAction('[User Recent Chat Search] search_icon_clicked', props<{ query?: string; }>());
export const copy_users_recent_chats$ = createAction('[User Recent Chat] copy_users_recent_chats', props<{ query?: string; }>());
export const start_search_users_recent_chats$ = createAction('[User Recent Chat] start_search_users_recent_chats', props<{ query: QueryUsers; }>());
export const search_ended_success_search_users$ = createAction('[User Recent Chat] search_ended_success_search_users', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());
export const add_search_users_in_state$ = createAction('[User Recent Chat] add_search_users_in_state', props<{
        payload: {
                data: Users[];
                message: string;
                status: string;
        }
}>());
