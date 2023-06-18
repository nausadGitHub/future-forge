import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
        selector: 'profile-user',
        standalone: true,
        templateUrl: 'profile.page.html',
        styleUrls: ['profile.page.scss'],
        imports: [IonicModule]
})
export default class ProfilePageComponent { }