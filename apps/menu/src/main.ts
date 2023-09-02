import { InjectionToken, enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
      enableProdMode();
}

export const API_TOKEN = new InjectionToken('apiToken');

bootstrapApplication(AppComponent, {
      providers: [
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            { provide: API_TOKEN, useValue: '/product-rent-agency/api' },
            importProvidersFrom(IonicModule.forRoot({})),
            provideRouter(routes),
      ],
});
