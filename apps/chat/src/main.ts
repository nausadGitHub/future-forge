import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule } from '@ionic/angular';
import { root_routes } from './app/app-routes.module';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './app/state/effects/login-register.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthenticationService } from './app/auth/authentication.service';
import { RootService } from './app/root.service';
import { auth_reducer_signin$, auth_reducer_signup$, AUTH_SIGNIN_FEATURE_KEY, AUTH_SIGNUP_FEATURE_KEY } from './app/state/reducers/login-register.reducer';
import { USERS_RECENT_CHATS_FEATURE_KEY, users_recent_chats_reducer$, USERS_RECENT_CHATS_SEARCH_KEY, users_recent_chats_search_reducer$ } from './app/state/reducers/users.reducer';
import { UsersEffects } from './app/state/effects/users.effects';
import { EffectsModule } from '@ngrx/effects';

if (environment.production) {
      enableProdMode();
}

bootstrapApplication(AppComponent, {
      providers: [
            provideRouter(root_routes,
                  withRouterConfig({ paramsInheritanceStrategy: 'always' })),
            importProvidersFrom(
                  BrowserModule,
                  HttpClientModule,
                  BrowserAnimationsModule,
                  StoreModule.forRoot(),
                  EffectsModule.forRoot(),
                  StoreModule.forFeature(AUTH_SIGNIN_FEATURE_KEY, auth_reducer_signin$),
                  StoreModule.forFeature(AUTH_SIGNUP_FEATURE_KEY, auth_reducer_signup$),
                  StoreModule.forFeature(USERS_RECENT_CHATS_FEATURE_KEY, users_recent_chats_reducer$),
                  StoreModule.forFeature(USERS_RECENT_CHATS_SEARCH_KEY, users_recent_chats_search_reducer$),
                  EffectsModule.forFeature([AuthEffects, UsersEffects]),
                  !environment.production ? StoreDevtoolsModule.instrument() : [],
                  IonicModule.forRoot({
                        mode: 'md',
                        rippleEffect: true
                  }),
            ),
            AuthenticationService,
            RootService
      ]
}).catch(err => console.error(err));
