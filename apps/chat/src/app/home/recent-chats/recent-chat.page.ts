import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, NgZone } from "@angular/core";
import { IonicModule, ViewWillEnter } from "@ionic/angular";
import { SharedUserPageComponent } from "./shared/shared-user.page";
import * as UsersActionTypes from '../../state/actions/users.actions';
import { Store } from "@ngrx/store";
import { AuthenticationService } from "src/app/auth/authentication.service";
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from "rxjs";
import { initialUsersState, UsersRecentChatsState } from "src/app/state/reducers/users.reducer";
import { recent_chats$ } from "src/app/state/selector";
import { QueryUsers, ScrollSize, User } from "src/app/interface";
import * as moment from "moment";
import { UserSkeletonPageComponent } from "./shared/shared-user-skeleton.page";
import { SharedUserEmptyPageComponent } from "./shared/shared-empty-user.page";

@Component({
        selector: 'recent-chat-user',
        standalone: true,
        templateUrl: 'recent-chat.page.html',
        styleUrls: ['recent-chat.page.scss'],
        imports: [
                IonicModule,
                CommonModule,
                SharedUserPageComponent,
                UserSkeletonPageComponent,
                SharedUserEmptyPageComponent
        ],
        animations: [],
        providers: [AsyncPipe]
})
export default class RecentChatPageComponent implements ViewWillEnter {

        store = inject(Store);
        async = inject(AsyncPipe);
        ngZone = inject(NgZone);
        auth = inject(AuthenticationService);

        size_users_recent_chats$: Subject<ScrollSize> = new BehaviorSubject<ScrollSize>({
                page: 1,
                totalPages: 0,
                totalResults: 0,
                limit: 20,
                query: initialUsersState?.query
        });

        users_recent_chats$: Observable<UsersRecentChatsState> = this.store.select(recent_chats$).pipe(
                map((state) => ({
                        ...state,
                        users: state?.users.map((user: User) => {
                                return {
                                        ...user,
                                        userStatus: user?.userStatus || 'Offline',
                                        unread: user?.chats[0]?.unread?.length || 0,
                                        chats: user?.chats[0]?.recent_chat?.map(chat => {
                                                return {
                                                        ...chat,
                                                        time: moment(new Date(`${chat?.date} ${chat?.time}`)).format('hh:mm a')
                                                };
                                        }),
                                };
                        })
                })),
                tap((size) => this.ngZone.run(() => this.size_users_recent_chats$.next({ ...size }))),
                catchError(() => of(initialUsersState))) as Observable<UsersRecentChatsState>;

        ionViewWillEnter(): void {
                this.store.dispatch(UsersActionTypes.load_initial_users$({
                        query: {
                                userID: 'C2oozLrjU',
                                searchword: '',
                                pagesize: '20',
                                page: '1',
                                sortBy: ''
                        }
                }))
        }

        track_users = (index: number, user: User) => user?.userID;

        scroll_recent_chats_users = (event: any) => {
                if (this.async.transform(this.size_users_recent_chats$)?.page !== this.async.transform(this.size_users_recent_chats$)?.totalPages) {
                        const size_scroll = this.async.transform(this.size_users_recent_chats$)?.query as QueryUsers;
                        size_scroll.page = (+size_scroll.page + 1).toString();
                        size_scroll.pagesize = size_scroll.pagesize;
                        this.store.dispatch(UsersActionTypes.load_initial_users$({ query: size_scroll }));
                        setTimeout(() => {
                                event.target.complete();
                        }, 1000);
                }
                if (this.async.transform(this.size_users_recent_chats$)?.page === this.async.transform(this.size_users_recent_chats$)?.totalPages) {
                        event.target.disabled = true;
                }
        }
}