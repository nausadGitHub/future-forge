import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { RootService } from './root.service';

export const auth_child_routes: Route[] = [
        {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
        },
        {
                path: 'login',
                loadComponent: () => import('./auth/login/login.page'),
                data: {
                        title: 'Sign In'
                }
        },
        {
                path: 'register',
                loadComponent: () => import('./auth/registration/registration.page'),
                data: {
                        title: 'Register'
                }
        },
        {
                path: 'forgot-password',
                loadComponent: () => import('./auth/forgot-password/forgot.page'),
                data: {
                        title: 'Forgot password'
                }
        },
];

export const root_routes: Route[] = [
        {
                path: '',
                loadComponent: () => import('./auth/auth-root.component'),
                canActivate: [() => inject((RootService)).isNotLoggedIn()],
                children: auth_child_routes
        },
        {
                path: 'user',
                loadComponent: () => import('./home/home-tabs.page'),
                children: [
                        {
                                path: 'recent-chats',
                                loadComponent: () => import('./home/recent-chats/recent-chat.page'),
                                data: {
                                        title: 'Chats'
                                }
                        },
                        {
                                path: 'status',
                                loadComponent: () => import('./home/status/status.page'),
                                data: {
                                        title: 'People'
                                }
                        },
                        {
                                path: 'profile',
                                loadComponent: () => import('./home/profile/profile.page'),
                                data: {
                                        title: 'Profile'
                                }
                        },
                        {
                                path: '',
                                redirectTo: '/user/recent-chats',
                                pathMatch: 'full'
                        }
                ]
        },
        {
                path: 'chat/:userID',
                loadComponent: () => import('./chat/chat.page')
        }
];