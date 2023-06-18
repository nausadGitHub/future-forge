import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
        standalone: true,
        selector: 'user-item-empty',
        template: `
        <ion-row class="fixed">
                <ion-col size="12">
                        <div class="ion-text-center pt-lg-5 spinner-div">
                                <ion-icon class="spinner" name="file-tray">
                                </ion-icon>
                                <p class="text-muted" style="padding:0;">No
                                        User Found.
                                </p>
                        </div>
                </ion-col>
        </ion-row>`,
        styles: [`.fixed {
                position: fixed;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -45%);
        
                ion-col {
                        .spinner-div {
        
                                p,
                                ion-icon {
                                        color: #ffffff;
                                }
        
                                ion-icon {
                                        font-size: 39px;
                                        line-height: 34px;
                                        height: 96px;
                                        width: 96px;
                                }
                        }
                }
        }`],
        imports: [IonicModule]
})
export class SharedUserEmptyPageComponent { }