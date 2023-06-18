import { CommonModule } from "@angular/common";
import { Component, HostBinding, inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonSearchbar, ModalController, ViewDidEnter } from "@ionic/angular";
import { SharedUserPageComponent } from "../shared/shared-user.page";
import { animate, query, style, transition, trigger } from '@angular/animations';
import { catchError, debounceTime, delay, distinctUntilChanged, map, mergeMap, Observable, of } from "rxjs";
import { Store } from "@ngrx/store";

import * as UsersActionTypes from '../../../state/actions/users.actions';
import { initialUsersSearchState, UsersRecentChatsState } from "src/app/state/reducers/users.reducer";
import { recent_searched_chats$ } from "src/app/state/selector";
import { User } from "src/app/interface";
import * as moment from "moment";
import { UserSkeletonPageComponent } from "../shared/shared-user-skeleton.page";
import { SharedUserEmptyPageComponent } from "../shared/shared-empty-user.page";

@Component({
        standalone: true,
        selector: 'search-recent-chat-user',
        templateUrl: 'search.page.html',
        styleUrls: ['search.page.scss'],
        imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SharedUserPageComponent,
                UserSkeletonPageComponent,
                SharedUserEmptyPageComponent
        ],
        animations: [
                trigger('searchbar', [
                        transition(':enter', [
                                query('ion-searchbar', style({ transform: 'scale(0.8)', opacity: 0 }), { optional: true }),
                                query('ion-searchbar', animate('200ms ease-in', style('*')), { optional: true }),
                        ])
                ])
        ],
})
export class SearchRecentChatComponent implements ViewDidEnter, OnInit {

        @HostBinding('@searchbar')

        modalCtrl = inject(ModalController);
        store = inject(Store);

        searchForm = new FormControl();

        users_recent_searched_chats$: Observable<UsersRecentChatsState> = this.store.select(recent_searched_chats$).pipe(
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
                catchError(() => of(initialUsersSearchState))) as Observable<UsersRecentChatsState>;

        @ViewChild('search', { static: true }) search: IonSearchbar;

        async ionViewDidEnter(): Promise<void> {
                await this.search.setFocus();
        }

        ngOnInit(): void {
                this.setupFormSearch();
        }

        cancel() {
                return this.modalCtrl.dismiss('cancel');
        }

        setupFormSearch = () => {
                this.searchForm.valueChanges.pipe(map((event) => event), debounceTime(500), distinctUntilChanged(),
                        mergeMap((search) => of(search).pipe(delay(0)))).subscribe((input: string) => {
                                this.store.dispatch(UsersActionTypes.start_search_users_recent_chats$({
                                        query: {
                                                userID: 'C2oozLrjU',
                                                searchword: input.trim(),
                                                pagesize: '20',
                                                page: '1',
                                                sortBy: ''
                                        }
                                }));
                        });
        }
}
