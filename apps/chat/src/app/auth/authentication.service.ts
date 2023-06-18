import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry, shareReplay } from 'rxjs/operators';
import { SignInSuccess, SignUpResponse, User, UserRegister, UserSignIn } from '../interface';
import { Capacitor } from '@capacitor/core';

@Injectable({
        providedIn: 'root'
})

export class AuthenticationService {
        // urls
        registration = 'http://192.168.36.107:8080/api/v1/auth/signup';
        login = 'http://192.168.36.107:8080/api/v1/auth/login';
        forget = 'http://192.168.36.107:8080/api/v1/auth/forgot-password';
        reset = 'http://192.168.36.107:8080/api/v1/auth/reset-password';
        otpVerify = 'http://192.168.36.107:8080/api/v1/auth/otp-verification';
        otpResend = 'http://192.168.36.107:8080/api/v1/users/otp-resend';
        changeUrl = 'http://192.168.36.107:8080/api/v1/users/user-change-password';

        // user-subject
        userSubject: BehaviorSubject<User>;
        user: Observable<User>;

        constructor(
                private router: Router,
                private http: HttpClient) {
                this.userSubject = new BehaviorSubject<User>(null);
                this.user = this.userSubject.asObservable();
        }

        httpOptions = {
                headers: new HttpHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                })
        };

        // User
        get_session = (): string | null => {
                return sessionStorage.getItem('USER_LOGGED') ? sessionStorage.getItem('USER_LOGGED') : localStorage.getItem('USER_LOGGED');
        }

        is_authenticated(): boolean {
                const token = this.get_session();
                return typeof (token) === 'string' ? true : false;
        }

        get userValue(): User {
                return this.userSubject.value;
        }

        signIn = (query: UserSignIn): Observable<SignInSuccess> => {
                const params = new HttpParams()
                        .set('userEmail', query?.userEmail?.email)
                        .set('userPassword', query?.userPassword?.password);
                return this.http
                        .post<SignInSuccess[]>(this.login, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        forgot = (item: string): Observable<{
                data: { userID: string, userMobile: string }[]
                message: string;
                status: string
        }> => {
                const params = new HttpParams()
                        .set('userEmail', JSON.parse(item).userEmail)
                        .set('userMobile', JSON.parse(item).userMobile);
                return this.http
                        .post<{
                                data: { userID: string, userMobile: string }[]
                                message: string;
                                status: string
                        }[]>(this.forget, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        otpVerification = (item: string): Observable<{
                data: User[];
                status: string;
                message: string;
        }> => {
                const params = new HttpParams()
                        .set('userID', JSON.parse(item).userID)
                        .set('userOTP', JSON.parse(item).userOTP);
                return this.http
                        .post<{
                                data: User[];
                                status: string;
                                message: string;
                        }[]>(this.otpVerify, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        otpResendVerification = (item: string): Observable<string> => {
                const params = new HttpParams()
                        .set('email', JSON.parse(item).email)
                        .set('password', JSON.parse(item).password);
                return this.http
                        .post<{
                                status: string;
                                message: string;
                        }[]>(this.otpResend, params, this.httpOptions)
                        .pipe(map(r => r[0].status), shareReplay(), retry(2));
        }

        resetPassword = (item: string): Observable<{
                data: User[];
                status: string;
                message: string;
        }> => {
                const params = new HttpParams()
                        .set('userID', JSON.parse(item).userID)
                        .set('userPassword', JSON.parse(item).userNewPassword);
                return this.http
                        .post<{
                                data: User[];
                                status: string;
                                message: string;
                        }[]>(this.reset, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        changePassword = (item: string): Observable<{
                status: string;
                message: string;
        }> => {
                const params = new HttpParams()
                        .set('email', JSON.parse(item).email)
                        .set('password', JSON.parse(item).password);
                return this.http
                        .post<{
                                status: string;
                                message: string;
                        }[]>(this.changeUrl, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        signup = (query: UserRegister): Observable<SignUpResponse> => {
                const params = new HttpParams()
                        .set('userFirstName', query?.userName?.name?.split(' ')[0]?.trim() || '')
                        .set('userLastName', query?.userName?.name?.split(' ')[1]?.trim() || '')
                        .set('userEmail', query?.userEmail?.email)
                        .set('userPassword', query?.userPassword?.password)
                        .set('userCountryCode', query?.userCountryCode)
                        .set('userMobile', query?.userMobile?.mobile)
                        .set('userProfilePicture', query?.userProfilePicture)
                        .set('userDeviceType', Capacitor?.getPlatform())
                        .set('userDeviceID', navigator?.userAgent)
                        .set('apiType', 'Android')
                        .set('apiVersion', '1.0');
                return this.http
                        .post<SignUpResponse[]>(this.registration, params, this.httpOptions)
                        .pipe(map(r => r[0]), shareReplay(), retry(2));
        }

        logout = () => {
                // remove user from local storage to log user out
                sessionStorage.removeItem('USER_LOGGED');
                localStorage.removeItem('USER_LOGGED');
                localStorage.removeItem('tempCart');
                this.userSubject.next({
                        userID: '',
                        userFirstName: '',
                        userLastName: '',
                        userEmail: '',
                        userCountryCode: '',
                        userMobile: '',
                        userPassword: '',
                        userProfilePicture: '',
                        languageID: '',
                        userVerified: '',
                        userStatus: '',
                        userCreatedDate: '',
                        chats: null
                });
                if (window.sessionStorage) { sessionStorage.clear(); }
                if (this.router.url.startsWith('/user')) {
                        this.router.navigate(['/'], { replaceUrl: true });
                }
        }

        updateUser = (user: User) => {
                this.userSubject.next(user);
        }
}
