import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, HostBinding, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { User } from "src/app/interface";

@Component({
        standalone: true,
        selector: 'user-item',
        template: `
        <ion-item lines="none" button *ngFor="let user of users; trackBy:track_users">
                        <ion-avatar slot="start">
                                <img [alt]="(user?.userFirstName + ' ' + user?.userLastName) | titlecase"
                                        [src]="'https://ionicframework.com/docs/img/demos/avatar.svg'" />
                        </ion-avatar>
                        <ion-label routerLink='/chat/3643432'>
                                <div class="ion-float-left max-width">
                                        <h2 class="title">{{(user?.userFirstName + ' ' + user?.userLastName) | titlecase}}</h2>
                                        <p class="description">{{'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.'}}</p>
                                </div>
                                <div class="ion-float-right">
                                        <p class="time">{{user?.chats[0]?.time}}</p>
                                        <ion-badge class="ion-float-right count" *ngIf="user.unread>0">{{user.unread}}</ion-badge>
                                </div>
                        </ion-label>
                </ion-item>`,
        styles: [`
        ion-item {
                --min-height: 5rem;
                ion-label h2,
                p {
                        color: #ffffff;
                        text-overflow: ellipsis;
                        overflow-x: hidden;
                        font-style: normal;
                }
                ion-label h2.title {
                        width: 80%;
                        text-overflow: ellipsis;
                        overflow-x: hidden;
                        font-weight: 500;
                        font-size: 18px;
                }
                ion-label p.description {
                        font-weight: 400;
                        font-size: 14px;
                        color: #c3c3c3;
                }
                ion-avatar {
                        width: 45px;
                        height: 45px;
                }
                .max-width {
                        width: 75%;
                }
                ion-label p.time {
                        font-size: 12px;
                        color: #c3c3c3;
                }
                ion-badge.count {
                        border-radius: 50%;
                        --padding-bottom: 3.7px;
                        --padding-top: 4px;
                        --padding-end: 6px;
                        --padding-start: 6px;
                        font-size: 10px;
                        color: #ffffff;
                }
        }`],
        imports: [IonicModule, CommonModule, RouterModule],
        animations: [
                trigger('UsersItem', [
                        transition(':enter', [
                                query('ion-item', style({ transform: 'scale(0.8) translateX(150px) translateZ(50px)', opacity: 0 }), { optional: true }),
                                query('ion-item', [stagger(100, [animate('250ms ease-in', style('*'))])], { optional: true }),
                        ])
                ])
        ]
})
export class SharedUserPageComponent {

        @HostBinding('@UsersItem')
        @Input() users: User[];

        track_users = (index: number, user: User) => user?.userID;
}