import { createAction, props } from '@ngrx/store';
import { Token, User, UserRegister, UserSignIn } from 'src/app/interface';

// for sign in

export const called_login$ = createAction('[Login Page] Login button clicked', props<{ query: UserSignIn; }>());

export const server_login$ = createAction('[Login Page] Login went to server', props<{ query: UserSignIn; }>());

export const success_login$ = createAction('[Login Page] Login success by server', props<{
        payload: {
                data: User;
                token: Token;
        }
}>());

export const failed_login$ = createAction('[Login Page] Login failed by server', props<{ err: string; }>());

export const reset_login$ = createAction('[Login Page] Reset login state', props<{ reset?: string; }>());


// for registration

export const called_register$ = createAction('[Register Page] Register button clicked', props<{ query: UserRegister; }>());

export const server_register$ = createAction('[Register Page] Register went to server', props<{ query: UserRegister; }>());

export const success_register$ = createAction('[Register Page] Register success by server', props<{
        payload: {
                data: User;
        }
}>());

export const failed_register$ = createAction('[Register Page] Register failed by server', props<{ err: string; }>());

export const reset_register$ = createAction('[Register Page] Reset register state', props<{ reset?: string; }>());
