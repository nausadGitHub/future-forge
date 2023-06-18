import { Action } from '@ngrx/store';
import { Chat, Chats } from 'src/app/interface';

export enum ChatsActionTypes {
	// for NEW Chats
	ADD_NEW_CHATS = '[Chats] ADD_NEW_CHATS',
	ADD_NEW_MORE_CHATS = '[Chats] ADD_NEW_MORE_CHATS',
	LOAD_INITIAL_NEW_CHATS = '[Chats] LOAD_INITIAL_NEW_CHATS',
	LOAD_FAILURE_NEW_CHATS = '[Chats] LOAD_FAILURE_NEW_CHATS',
	RESET_NEW_CHATS = '[Chats] RESET_NEW_CHATS',
	SEARCH_NEW_QUERY_NEW_CHATS = '[Chats] SEARCH_NEW_QUERY_NEW_CHATS',
	SEARCH_ENDED_SUCCESS_NEW_CHATS = '[Chats] SEARCH_ENDED_SUCCESS_NEW_CHATS',
	SEARCH_ENDED_SUCCESS_MORE_NEW_CHATS = '[Chats] SEARCH_ENDED_SUCCESS_MORE_NEW_CHATS',
	SEARCH_START_NEW_CHATS = '[Chats] SEARCH_START_NEW_CHATS',
	SEARCH_START_NEW_MORE_CHATS = '[Chats] SEARCH_START_NEW_MORE_CHATS',
	START_SEND_AND_RECEIVE_CHATS = '[Chats] START_SEND_AND_RECEIVE_CHATS',
	SEND_CHATS = '[Chats] SEND_CHATS',
	RECEIVE_CHATS = '[Chats] RECEIVE_CHATS',
	SEARCH_MORE_NEW_CHATS = '[Chats] SEARCH_MORE_NEW_CHATS',
}

// NEW ACTIONS
export class AddNewChats implements Action {
	readonly type = ChatsActionTypes.ADD_NEW_CHATS;
	constructor(public payload: { data: Chats[]; message: string; status: string; }, public unread: number, public query: string) { }
}
export class AddNewMoreChats implements Action {
	readonly type = ChatsActionTypes.ADD_NEW_MORE_CHATS;
	constructor(public payload: {
		data: Chats[];
		message: string;
		status: string;
	}) { }
}
export class StartSendReceiveChats implements Action {
	readonly type = ChatsActionTypes.START_SEND_AND_RECEIVE_CHATS;
	constructor(public payload: {
		chat: Chat[];
		selected: string;
	}) { }
}
export class ReceiveChats implements Action {
	readonly type = ChatsActionTypes.RECEIVE_CHATS;
	constructor(public payload: {
		chat: Chat[];
		selected: string;
	}) { }
}
export class SendChats implements Action {
	readonly type = ChatsActionTypes.SEND_CHATS;
	constructor(public payload: {
		chat: Chat[];
		selected: string;
	}) { }
}
export class SearchStartNewChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_START_NEW_CHATS;
	constructor(public query: string, public unread?: number) { }
}
export class SearchStartNewMoreChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_START_NEW_MORE_CHATS;
	constructor(public query: string) { }
}
export class LoadInitialNewChats implements Action {
	readonly type = ChatsActionTypes.LOAD_INITIAL_NEW_CHATS;
	constructor(public query: string) { }
}
export class SearchEndedSuccessNewChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_ENDED_SUCCESS_NEW_CHATS;
	constructor(public payload: { data: Chats[]; message: string; status: string; }, public unread: number, public query: string) { }
}
export class SearchEndedSuccessMoreNewChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_ENDED_SUCCESS_MORE_NEW_CHATS;
	constructor(public payload: {
		data: Chats[];
		message: string;
		status: string;
	}) { }
}
export class SearchNewQueryNewChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_NEW_QUERY_NEW_CHATS;
	constructor(public query: string, public unread: number, public status: string) { }
}
export class SearchMoreNewChats implements Action {
	readonly type = ChatsActionTypes.SEARCH_MORE_NEW_CHATS;
	constructor(public query: string) { }
}
export class FailureNewChats implements Action {
	readonly type = ChatsActionTypes.LOAD_FAILURE_NEW_CHATS;
	constructor(public err: {
		data: Chats[];
		message: string;
		status: string;
	}) { }
}
export class ResetNewChats implements Action {
	readonly type = ChatsActionTypes.RESET_NEW_CHATS;
	constructor(public query?: string) { }
}

export type ChatsActions =
	| AddNewChats
	| AddNewMoreChats
	| LoadInitialNewChats
	| SearchStartNewChats
	| SearchStartNewMoreChats
	| StartSendReceiveChats
	| SendChats
	| ReceiveChats
	| SearchEndedSuccessNewChats
	| SearchEndedSuccessMoreNewChats
	| SearchNewQueryNewChats
	| SearchMoreNewChats
	| FailureNewChats
	| ResetNewChats;
