import { inject, Injectable, NgZone } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { StorageService } from 'src/app/storage.service';
import * as AuthActions from '../actions/login-register.actions';

@Injectable()
export class AuthEffects {

        actions$ = inject(Actions);
        nav = inject(NavController);
        root = inject(AuthenticationService);
        storage = inject(StorageService);
        toast = inject(ToastController);
        zone = inject(NgZone);

        /**
         * Actions of sign-in.
         * @author Nausad Ansari
         * @version 1.0.0
         * @param userEmail: string;
         * @param userPassword: string;
        */

        called_login$ = createEffect(() => this.actions$.pipe(
                ofType(AuthActions?.called_login$),
                map((a) => AuthActions?.server_login$(a)))
        );

        server_login$ = createEffect(() => this.actions$.pipe(
                ofType(AuthActions?.server_login$),
                switchMap(action => this.root.signIn(action?.query).pipe(
                        map((data) => {
                                if (data?.status !== 'true') {
                                        return AuthActions?.failed_login$({ err: data?.message || 'Incorrect email or password.' });
                                }
                                return AuthActions?.success_login$({
                                        payload: {
                                                data: data?.data[0],
                                                token: data?.tokens
                                        }
                                })
                        }), take(1), catchError((err) => {
                                return of(AuthActions?.failed_login$({ err: err?.message || 'Ops, something went wrong.' }));
                        }))
                )
        ));

        success_signin$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.success_login$),
                map(async (a) => {
                        if (a?.payload?.token.access) {
                                this.call_success_toast('Logged in successfully.');
                                this.storage.set_token_success(JSON.stringify(a.payload.token.access.token));
                                this.storage.set_user_success(JSON.stringify(a?.payload?.data))
                                this.root.updateUser(a?.payload?.data);
                                return this.zone?.run(() => {
                                        this.nav.navigateForward('/user', { animationDirection: 'forward' });
                                });
                        }
                })),
                {
                        dispatch: false
                });

        failed_login$ = createEffect(() => this.actions$.pipe(
                ofType(AuthActions?.failed_login$),
                map((a) => alert(a?.err || 'Ops, something went wrong, please try again later.'))),
                {
                        dispatch: false
                });

        /**
         * Actions of Register.
         * @author Nausad Ansari
         * @version 1.0.0
         * @param userName: string;
         * @param userEmail: string;
         * @param userMobile: string;
         * @param userPassword: string;
         * @param userRePassword: string;
        */

        called_register$ = createEffect(() => this.actions$.pipe(
                ofType(AuthActions?.called_register$),
                map((a) => AuthActions?.server_register$(a)))
        );

        server_register$ = createEffect(() => this.actions$.pipe(
                ofType(AuthActions?.server_register$),
                switchMap(action => this.root.signup(action?.query).pipe(
                        map((data) => {
                                if (data?.status !== 'true') {
                                        return AuthActions?.failed_register$({ err: data?.message || 'Ops, something went wrong.' });
                                }
                                return AuthActions?.success_register$({
                                        payload: {
                                                data: data?.data[0]
                                        }
                                })
                        }), take(1), catchError((err) => {
                                return of(AuthActions?.failed_register$({ err: err?.message || 'Ops, something went wrong.' }));
                        }))
                )
        ));

        success_register$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.success_register$),
                map((a) => {
                        if (a?.payload?.data) {
                                this.call_success_toast('Register successfully.');
                                return this.zone?.run(() => {
                                        this.nav.navigateForward('/login', { animationDirection: 'back' });
                                });
                        }
                })),
                {
                        dispatch: false
                });

        failed_register$ = createEffect(() => this.actions$.pipe(ofType(AuthActions?.failed_register$),
                map((a) => alert(a?.err || 'Ops, something went wrong, please try again later.'))),
                {
                        dispatch: false
                });

        call_success_toast = async (message: string) => {
                const toast = await this.toast.create({
                        message,
                        duration: 2000,
                        position: 'bottom',
                        color: 'dark',
                        cssClass: 'custom-toast'
                });
                await toast.present();
        }
}
