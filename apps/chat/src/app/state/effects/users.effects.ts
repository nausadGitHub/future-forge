import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, delay, filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { SearchRecentChatComponent } from 'src/app/home/recent-chats/search/search.page';
import { RootService } from 'src/app/root.service';
import * as UsersActionTypes from '../actions/users.actions';
import { recent_chats$, recent_searched_chats$ } from '../selector';

@Injectable()
export class UsersEffects {

        actions$ = inject(Actions);
        store$ = inject(Store);
        root = inject(RootService);
        modalCtrl = inject(ModalController);

        load_initial_users$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.load_initial_users$),
                        delay(500),
                        map((a) => UsersActionTypes.search_start_users$({ query: a?.query })));
        });

        search_start_users$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.search_start_users$),
                        withLatestFrom(this.store$.select(recent_chats$).pipe(map(recent => recent?.users))),
                        switchMap(action => this.root.users(action[0]?.query).pipe(
                                map((response) => UsersActionTypes.search_ended_success_users$({
                                        payload: {
                                                ...response
                                        }
                                })), take(1),
                                catchError((err) => of(UsersActionTypes.failure_search_users$({ err: err?.message || 'Ops, something went wrong while fetching initial users.' }))))
                        )
                );
        });

        search_ended_success_users$ = createEffect(() => {
                return this.actions$.pipe(ofType(UsersActionTypes.search_ended_success_users$),
                        map((a) => UsersActionTypes.add_users_in_state$({ ...a }))
                );
        });

        search_more_users$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.search_more_users$),
                        map((a) => UsersActionTypes.search_start_more_users$({ query: a?.query })));
        });

        search_start_more_users$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.search_start_more_users$),
                        withLatestFrom(this.store$.select(recent_chats$).pipe(map(recent => recent?.users))),
                        switchMap(action => this.root.users(action[0]?.query).pipe(
                                map((response) => UsersActionTypes.search_ended_success_more_users$({
                                        payload: {
                                                ...response
                                        }
                                })), take(1),
                                catchError((err) => of(UsersActionTypes.failure_search_users$({ err: err?.message || 'Ops, something went wrong while fetching more users.' }))))
                        )
                );
        });

        add_more_users_in_state$ = createEffect(() => {
                return this.actions$.pipe(ofType(UsersActionTypes.search_ended_success_more_users$),
                        map((a) => UsersActionTypes.add_more_users_in_state$({ ...a }))
                );
        });

        reset_users_unread_chats$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.reset_user_unread_chats$),
                        map((a) => UsersActionTypes.start_reset_user_unread_chats$({ query: a?.query })));
        });

        start_reset_user_unread_chats$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.start_reset_user_unread_chats$),
                        switchMap(action => this.root.read(action?.query).pipe(
                                map((response) => UsersActionTypes.success_reset_user_unread_chats$({
                                        success: {
                                                query: action.query,
                                                ...response
                                        }
                                })), take(1),
                                catchError((err) => of(UsersActionTypes.failure_reset_user_unread_chats$({ err: err?.message || 'Ops, something went wrong while reading unread chats.' }))))
                        )
                );
        });

        search_icon_clicked$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.search_icon_clicked$),
                        switchMap((query) => from(this.openSearchModal()).pipe(
                                filter((success) => success),
                                map(() => {
                                        return UsersActionTypes.copy_users_recent_chats$({ ...query })
                                })
                        )));
        });

        copy_users_recent_chats$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.copy_users_recent_chats$),
                        withLatestFrom(this.store$.select(recent_chats$).pipe(map(recent => recent))),
                        map((a) => UsersActionTypes.search_ended_success_search_users$({
                                payload: {
                                        data: [{
                                                results: a[1].users,
                                                page: a[1].page,
                                                limit: a[1].limit,
                                                totalPages: a[1].totalPages,
                                                totalResults: a[1].totalResults,
                                        }],
                                        message: a[1].message,
                                        status: a[1].status
                                }
                        })));
        });

        start_search_users_recent_chats$ = createEffect(() => {
                return this.actions$.pipe(
                        ofType(UsersActionTypes.start_search_users_recent_chats$),
                        withLatestFrom(this.store$.select(recent_searched_chats$).pipe(map(recent => recent?.users))),
                        switchMap(action => this.root.users(action[0]?.query).pipe(
                                map((response) => UsersActionTypes.search_ended_success_search_users$({
                                        payload: {
                                                ...response
                                        }
                                })), take(1),
                                catchError((err) => of(UsersActionTypes.failure_search_users$({ err: err?.message || 'Ops, something went wrong while fetching initial users.' }))))
                        )
                );
        });

        search_ended_success_search_users$ = createEffect(() => {
                return this.actions$.pipe(ofType(UsersActionTypes.search_ended_success_search_users$),
                        map((a) => UsersActionTypes.add_search_users_in_state$({ ...a }))
                );
        });

        failure_search_users$ = createEffect(() => this.actions$.pipe(
                ofType(UsersActionTypes?.failure_search_users$, UsersActionTypes?.failure_reset_user_unread_chats$),
                map((a) => alert(a?.err || 'Ops, something went wrong, please try again later.'))),
                {
                        dispatch: false
                });

        openSearchModal = async () => {
                const modal = await this.modalCtrl.create({
                        component: SearchRecentChatComponent,
                        animated: true,
                        canDismiss: true
                });
                await modal.present();
                return true;
        }
}
