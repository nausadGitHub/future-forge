import { CommonModule } from "@angular/common";
import { Component, EnvironmentInjector, inject, NgZone } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { filter, map } from "rxjs";

import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from "@capacitor/core";

@Component({
      selector: 'auth-root',
      standalone: true,
      template: `
        <ion-header class="ion-no-border">
        <ion-toolbar class="header-auth">
                <ion-title>{{(router | async) === '/login' ? 'Sign In' : (router | async) === '/register' ? 'Register' : (router | async) === '/forgot-password' ? 'Forgot Password' : 'Reset Password'}}</ion-title>
                <ion-buttons slot="end">
                        <ion-button shape="round" fill="clear">
                                <p class="ion-text-capitalize">Skip</p>
                        </ion-button>
                </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content class="ion-no-padding">
                <ion-router-outlet id="auth"></ion-router-outlet>
        </ion-content>
        `,
      styles: [
            `.header-auth {
                        --min-height: 5rem;
                        --background: var(--ion-color-primary)
                }
                .header-auth ion-title, ion-buttons {
                        font-weight: 400;
                        font-size: 18px;
                        height: 18px;
                        color: var(--ion-button-color);
                }`
      ],
      imports: [IonicModule, CommonModule]
})
export default class AuthRootPageComponent {

      ngzone = inject(NgZone);

      changeStatus = (url: string) => {
            this.ngzone.run(() => {
                  if (Capacitor.getPlatform() !== 'web') StatusBar.setBackgroundColor({ color: url?.startsWith('/user') || url?.startsWith('/chat') ? '#1C2D35' : '#89A619' });
            });
      };

      environmentInjector = inject(EnvironmentInjector);

      router = inject(Router).events.pipe(filter(event => event instanceof NavigationEnd), map(config => {
            this.changeStatus((config as NavigationEnd)?.url);
            return (config as NavigationEnd)?.url;
      }));
}