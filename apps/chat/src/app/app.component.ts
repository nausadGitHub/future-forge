import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Component({
      selector: 'app-root',
      standalone: true,
      template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
      styles: [],
      imports: [IonicModule],
      providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class AppComponent {
      environmentInjector = inject(EnvironmentInjector);
}
