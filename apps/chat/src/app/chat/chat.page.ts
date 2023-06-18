import { CommonModule } from "@angular/common";
import { Component, EnvironmentInjector, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
        selector: 'chat-room',
        standalone: true,
        templateUrl: 'chat.page.html',
        styleUrls: ['chat.page.scss'],
        imports: [IonicModule, CommonModule]
})
export default class ChatRoomPageComponent {

        environmentInjector = inject(EnvironmentInjector);

}