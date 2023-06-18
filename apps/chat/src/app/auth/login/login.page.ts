import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { UserSignIn } from "src/app/interface";
import { sign_in$ } from "src/app/state/selector";
import * as AuthActions from '../../state/actions/login-register.actions';

@Component({
        standalone: true,
        selector: 'login-auth',
        templateUrl: 'login.page.html',
        styleUrls: ['login.page.scss'],
        imports: [CommonModule, IonicModule, RouterModule, FormsModule, ReactiveFormsModule],
        animations: [
                trigger('shakeit', [
                        transition('false <=> true', animate('1000ms ease-in', keyframes([
                                style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
                                style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
                                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
                                style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
                                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
                                style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
                                style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
                                style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
                                style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
                        ]))),
                ])
        ]
})

export default class LoginPageComponent {

        store = inject(Store)
        fb = inject(FormBuilder)

        signin: FormGroup;
        auth$: Observable<boolean> = this.store.select(sign_in$)?.pipe(map(u => u?.isSearch));

        constructor() {
                // for Login
                this.signin = this.fb.group({
                        showPassword: [],
                        userEmail: this.fb.group({
                                email: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
                                state: [false]
                        }),
                        userPassword: this.fb.group({
                                password: [''],
                                state: [false]
                        }),
                });
        }

        onClickLogin = (post: UserSignIn) => {
                if (!this.checkControlPostLogin(post)) {
                        if (this.signin.valid && this.findInvalidControlsLogin().length === 0) {
                                return this.store.dispatch(AuthActions?.called_login$({ query: post }));
                        }
                        return this.signin.markAllAsTouched();
                }
        }

        checkControlPostLogin = (post: UserSignIn) => {
                let invalid = false;
                Object.keys(post).forEach((key: string) => {
                        if (key === 'userEmail' && !(this.signin.get('userEmail') as FormGroup).get('email').value) {
                                (this.signin.get(`userEmail`) as FormGroup).get('email').addValidators([Validators.required]);
                                (this.signin.get(`userEmail`) as FormGroup).get('state').patchValue((this.signin.get(`userEmail`) as FormGroup).get('state').value ? false : true);
                                (this.signin.get(`userEmail`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        if (key === 'userPassword' && !(this.signin.get('userPassword') as FormGroup).get('password').value) {
                                (this.signin.get(`userPassword`) as FormGroup).get('password').addValidators([Validators.required]);
                                (this.signin.get(`userPassword`) as FormGroup).get('state').patchValue((this.signin.get(`userPassword`) as FormGroup).get('state').value ? false : true);
                                (this.signin.get(`userPassword`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        return invalid;
                });
                return invalid;
        }

        findInvalidControlsLogin = () => {
                const invalid = [];
                const controls = this.signin.controls;
                for (const name in controls) {
                        if (controls[name].invalid) {
                                invalid.push(name);
                        }
                }
                return invalid;
        }

}