import { Component, inject } from "@angular/core";
import { trigger, transition, animate, keyframes, style } from "@angular/animations";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UserRegister } from "src/app/interface";
import * as AuthActions from '../../state/actions/login-register.actions';
import { CommonModule } from "@angular/common";
import { sign_up$ } from "src/app/state/selector";

@Component({
        selector: 'registration-auth',
        standalone: true,
        templateUrl: 'registration.page.html',
        styleUrls: ['registration.page.scss'],
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
export default class RegistrationPageComponent {

        store = inject(Store)
        fb = inject(FormBuilder)

        register: FormGroup;
        auth$: Observable<boolean> = this.store.select(sign_up$)?.pipe(map(u => u?.isSearch));

        constructor() {
                // for register
                this.register = this.fb.group({
                        userName: this.fb.group({
                                name: [''],
                                state: [false]
                        }),
                        userEmail: this.fb.group({
                                email: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
                                state: [false]
                        }),
                        userMobile: this.fb.group({
                                mobile: ['', Validators.compose([Validators.pattern('^((\\+971-?)|0)?[0-9]{10}$')])],
                                state: [false]
                        }),
                        userPassword: this.fb.group({
                                password: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
                                state: [false]
                        }),
                        userRePassword: this.fb.group({
                                re_password: [''],
                                state: [false]
                        }),
                        userCountryCode: ['+91'],
                        userProfilePicture: ['a.png'],
                        showPassword: [false],
                        showRePassword: [false]
                }, {
                        validators: this.checkPasswords
                });
        }

        checkPasswords = (group: FormGroup) => {
                const password = (group.get('userPassword') as FormGroup).get('password').value;
                const confirmPassword = (group.get('userRePassword') as FormGroup).get('re_password').value;
                if (password && confirmPassword) {
                        return password === confirmPassword ? null : { confirmedValidator: true };
                }
                return null;
        }

        onClickRegister = (post: UserRegister) => {
                if (!this.checkControlPostRegister(post)) {
                        if (this.register.valid && this.findInvalidControlsRegister().length === 0) {
                                return this.store.dispatch(AuthActions?.called_register$({ query: post }));
                        }
                        return this.register.markAllAsTouched();
                }
        }

        checkControlPostRegister = (post: UserRegister): boolean => {
                let invalid = false;
                Object.keys(post).forEach((key: string) => {
                        if (key === 'userName' && !(this.register.get('userName') as FormGroup).get('name').value) {
                                (this.register.get(`userName`) as FormGroup).get('name').addValidators([Validators.required]);
                                (this.register.get(`userName`) as FormGroup).get('state').patchValue((this.register.get(`userName`) as FormGroup).get('state').value ? false : true);
                                (this.register.get(`userName`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        if (key === 'userEmail' && !(this.register.get('userEmail') as FormGroup).get('email').value) {
                                (this.register.get(`userEmail`) as FormGroup).get('email').addValidators([Validators.required]);
                                (this.register.get(`userEmail`) as FormGroup).get('state').patchValue((this.register.get(`userEmail`) as FormGroup).get('state').value ? false : true);
                                (this.register.get(`userEmail`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        if (key === 'userMobile' && !(this.register.get('userMobile') as FormGroup).get('mobile').value) {
                                (this.register.get(`userMobile`) as FormGroup).get('mobile').addValidators([Validators.required]);
                                (this.register.get(`userMobile`) as FormGroup).get('state').patchValue((this.register.get(`userMobile`) as FormGroup).get('state').value ? false : true);
                                (this.register.get(`userMobile`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        if (key === 'userPassword' && !(this.register.get('userPassword') as FormGroup).get('password').value) {
                                (this.register.get(`userPassword`) as FormGroup).get('password').addValidators([Validators.required]);
                                (this.register.get(`userPassword`) as FormGroup).get('state').patchValue((this.register.get(`userPassword`) as FormGroup).get('state').value ? false : true);
                                (this.register.get(`userPassword`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        if (key === 'userRePassword' && !(this.register.get('userRePassword') as FormGroup).get('re_password').value) {
                                (this.register.get(`userRePassword`) as FormGroup).get('re_password').addValidators([Validators.required]);
                                (this.register.get(`userRePassword`) as FormGroup).get('state').patchValue((this.register.get(`userRePassword`) as FormGroup).get('state').value ? false : true);
                                (this.register.get(`userRePassword`) as FormGroup).updateValueAndValidity({ onlySelf: true });
                                return invalid = true;
                        }
                        return invalid;
                });
                return invalid;
        }

        findInvalidControlsRegister = () => {
                const invalid = [];
                const controls = this.register.controls;
                for (const name in controls) {
                        if (controls[name].invalid) {
                                invalid.push(name);
                        }
                }
                return invalid;
        }
}