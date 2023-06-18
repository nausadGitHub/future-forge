import { Chat } from 'src/app/interface';
import { ChatsActions, ChatsActionTypes } from '../actions/chat.actions';

export interface ChatsList {
	chats: Chat[];
	page: number;
	limit: number;
	totalPages: number;
	totalResults: number;
	message: string;
	status: string;
	query: string;
	isSearch: boolean;
	isSearchMore: boolean;
}
export const initial_chats: ChatsList = {
	chats: [],
	page: 0,
	limit: 0,
	totalPages: 0,
	totalResults: 0,
	message: 'initial_load',
	status: 'initial',
	query: '',
	isSearch: false,
	isSearchMore: false
};
export function ReducerChats(state = initial_chats, action: ChatsActions): ChatsList {
	switch (action.type) {
		case ChatsActionTypes.ADD_NEW_CHATS:
			return Object.assign({}, state, {
				chats: action.payload.data[0].results,
				page: action.payload.data[0].page,
				limit: action.payload.data[0].limit,
				totalPages: action.payload.data[0].totalPages,
				totalResults: action.payload.data[0].totalResults,
				message: action.payload.message,
				status: action.payload.status
			});
		case ChatsActionTypes.ADD_NEW_MORE_CHATS:
			return Object.assign({}, state, {
				chats: [...state.chats, ...action.payload.data[0].results],
				page: action.payload.data[0].page,
				limit: action.payload.data[0].limit,
				totalPages: action.payload.data[0].totalPages,
				totalResults: action.payload.data[0].totalResults,
				message: action.payload.message,
				status: action.payload.status
			});
		case ChatsActionTypes.SEARCH_NEW_QUERY_NEW_CHATS:
			return Object.assign({}, state, {
				query: action.query
			});
		case ChatsActionTypes.SEARCH_MORE_NEW_CHATS:
			return Object.assign({}, state, {
				query: action.query
			});
		case ChatsActionTypes.SEARCH_START_NEW_CHATS:
			return {
				...state,
				isSearch: true,
			};
		case ChatsActionTypes.START_SEND_AND_RECEIVE_CHATS:
			return Object.assign({}, state, {
				chats: [...state.chats, ...action.payload.chat],
			});
		case ChatsActionTypes.RECEIVE_CHATS:
			return Object.assign({}, state, {
				chats: [...state.chats, ...action.payload.chat],
			});
		case ChatsActionTypes.SEARCH_START_NEW_MORE_CHATS:
			return {
				...state,
				isSearchMore: true
			};
		case ChatsActionTypes.SEARCH_ENDED_SUCCESS_NEW_CHATS:
			return {
				...state,
				isSearch: false
			};
		case ChatsActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_CHATS:
			return {
				...state,
				isSearchMore: false
			};
		case ChatsActionTypes.LOAD_INITIAL_NEW_CHATS:
			return Object.assign({}, state, {
				query: action.query,
				isSearch: true
			});
		case ChatsActionTypes.RESET_NEW_CHATS:
			return Object.assign({}, state, {
				chats: [],
				page: 0,
				limit: 0,
				totalPages: 0,
				totalResults: 0,
				message: 'initial_load',
				status: 'initial',
				isSearch: false,
				isSearchMore: false
			});
		case ChatsActionTypes.LOAD_FAILURE_NEW_CHATS:
			return Object.assign({}, state, {
				chats: [],
				page: 0,
				limit: 0,
				totalPages: 0,
				totalResults: 0,
				message: 'fail_state',
				status: 'fail',
				isSearch: false,
				isSearchMore: false
			});
		default:
			return state;
	}
}
