import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
        selector: 'user-skeleton',
        standalone: true,
        template: `
        <ion-item lines="none">
                        <ion-thumbnail slot="start">
                                <ion-skeleton-text [animated]="true"></ion-skeleton-text>
                        </ion-thumbnail>
                        <ion-label>
                                <div class="ion-float-left max-width-left">
                                        <h2 class="title">
                                                <ion-skeleton-text [animated]="true"
                                                        style="width: 80%;"></ion-skeleton-text>
                                        </h2>
                                        <p>
                                                <ion-skeleton-text [animated]="true"
                                                        style="width: 90%;"></ion-skeleton-text>
                                        </p>
                                </div>
                                <div class="ion-float-right max-width-right">
                                        <p>
                                                <ion-skeleton-text [animated]="true"
                                                        style="width: 100%;"></ion-skeleton-text>
                                        </p>
                                        <p>
                                                <ion-skeleton-text [animated]="true"
                                                        style="width: 60%;float: right;"></ion-skeleton-text>
                                        </p>
                                </div>
                        </ion-label>
                </ion-item>`,
        styles: [`
        ion-skeleton-text {
                --border-radius: 9999px;
                --background: rgb(255, 255, 255);
                --background-rgb: 255, 255, 255;
        }
        ion-item {
                --min-height: 5rem;
                ion-label h2.title {
                        width: 80%;
                        height: 16px;
                }
                ion-avatar {
                        width: 40px;
                        height: 40px;
                }
                .max-width-left {
                        width: 75%;
                        h2,
                        p {
                                margin: .8rem 0;
                        }
                }
                .max-width-right {
                        width: 25%;
                        h2,
                        p {
                                margin: .8rem 0;
                        }
                }
        }
        
        ion-thumbnail {
                width: 60px;
                height: 60px;
        }`],
        imports: [IonicModule]
})
export class UserSkeletonPageComponent { }