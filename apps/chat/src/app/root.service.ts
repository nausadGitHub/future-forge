import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay, retry, map } from 'rxjs/operators';
import { chat_global } from './global';
import { QueryUsers, ResponseChats, ResponseRead, ResponseUsers } from './interface';

@Injectable({
        providedIn: 'root'
})
export class RootService {

        isLoggedIn = () => true;

        isNotLoggedIn = () => true;

        // users url's
        get_users_url = 'http://192.168.36.107:8080/api/v1/get/users';
        get_chats_url = 'http://192.168.36.107:8080/api/v1/chat/get-chat';
        read_chats_url = 'http://192.168.36.107:8080/api/v1/chat/update-read';

        // Behavior-subjects
        update_chat_view$: Subject<{ userID: string, userName: string, status: string }> = new BehaviorSubject<{ userID: string, userName: string, status: string }>({ userID: '', userName: '', status: 'Offline' });
        chat_view$ = this.update_chat_view$.asObservable();
        updatehue$: Subject<boolean> = new BehaviorSubject<boolean>(false);
        hue$ = this.updatehue$.asObservable();

        constructor(
                private http: HttpClient) { }

        httpOptions = {
                headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                })
        };

        isNewSearchQuery = (query: string, status: string) => {
                if (JSON.parse(query)?.receiverUserID !== chat_global?.receiverUserID) {
                        chat_global.receiverUserID = JSON.parse(query)?.receiverUserID;
                        this.update_chat_view$.next({ userID: JSON.parse(query)?.receiverUserID, userName: JSON.parse(query)?.receiverUserName, status });
                        return true;
                }
                return false;
        }

        users = (query: QueryUsers): Observable<ResponseUsers> => {
                const params = new HttpParams()
                        .set('userID', query?.userID)
                        .set('searchword', query?.searchword)
                        .set('page', query?.page)
                        .set('pagesize', query?.pagesize)
                        .set('sortBy', query?.sortBy);
                return this.http
                        .post<ResponseUsers[]>(`${this.get_users_url}`, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        chats = (item: string): Observable<ResponseChats> => {
                const params = new HttpParams()
                        .set('userID', JSON.parse(item)?.userID)
                        .set('searchword', JSON.parse(item)?.searchword)
                        .set('page', JSON.parse(item)?.page)
                        .set('pagesize', JSON.parse(item)?.pagesize)
                        .set('receiverUserID', JSON.parse(item)?.receiverUserID)
                        .set('sortBy', JSON.parse(item)?.sortBy);
                return this.http
                        .post<ResponseChats[]>(`${this.get_chats_url}`, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        read = (item: string): Observable<ResponseRead> => {
                const params = new HttpParams()
                        .set('userID', JSON.parse(item)?.userID)
                        .set('receiverUserID', JSON.parse(item)?.receiverUserID);
                return this.http
                        .post<ResponseRead[]>(`${this.read_chats_url}`, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }
}
