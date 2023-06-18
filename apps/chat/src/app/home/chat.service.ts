import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
const socket: Socket = io('http://localhost:8080/chat', { transports: ['websocket', 'polling', 'flashsocket'], forceNew: false, autoConnect: false });

@Injectable({
        providedIn: 'root'
})
export class ChatService {

        constructor() { }

        check_connection = () => {
                if (!socket.connected && self.clientInformation.onLine) {
                        socket.connect();
                }
        }

        verify = () => {
                return new Observable<string>((observer) => {
                        socket.off('verifyUser').on('verifyUser', () => {
                                observer.next('verify_user');
                        });
                });
        }

        onlineUsers = () => {
                return new Observable<{ userID: string }[]>((observer) => {
                        socket.off('online_users').on('online_users', (userList) => {
                                observer.next(userList);
                        });
                });
        }

        cameOnline = () => {
                return new Observable<string>((observer) => {
                        socket.off('came_online').on('came_online', (userName) => {
                                observer.next(userName);
                        });
                });
        }

        authError = () => {
                return new Observable((observer) => {
                        socket.on('auth-error', (data) => {
                                observer.next(data);
                        });
                });
        }

        chat = (userID: string) => {
                return new Observable<string>((observer) => {
                        socket.off(userID).on(userID, (data) => {
                                observer.next(data);
                        });
                });
        }

        is_typing = (userID: string) => {
                return new Observable<string>((observer) => {
                        socket.off(`${userID} is typing...$`).on(`${userID} is typing...$`, (info) => {
                                observer.next(info);
                        });
                });
        }

        send_message = (temp: string) => {
                socket.emit('message', (temp));
        }

        typing_message = (info: string) => {
                socket.emit('typing...$', (info));
        }

        logout = () => {
                socket.close();
        }

        leave = () => {
                return new Observable((observer) => {
                        socket.on('leave', (data) => {
                                observer.next(data);
                        });
                });
        }

        markChatAsSeen = (userID: string) => {
                socket.emit('mark-chat-as-seen', userID);
        }

        setUser = (access: string) => {
                socket.emit('setUser', access);
        }

}