import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
        standalone: true,
        selector: 'forgot-auth',
        templateUrl: 'forgot.page.html',
        imports: [IonicModule, CommonModule]
})
export default class ForgotPageComponent { }