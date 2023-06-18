import { Component, EnvironmentInjector, inject } from "@angular/core";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { Store } from "@ngrx/store";

import * as UsersActionTypes from '../state/actions/users.actions';

@Component({
        selector: 'home-tabs',
        standalone: true,
        templateUrl: 'home-tabs.page.html',
        styleUrls: ['home-tabs.page.scss'],
        imports: [IonicModule]
})
export default class HomeTabPageComponent {

        store = inject(Store);
        actionSheetCtrl = inject(ActionSheetController);

        environmentInjector = inject(EnvironmentInjector);

        click_to_open_search = () => this.store.dispatch(UsersActionTypes.search_icon_clicked$({ query: '' }));

        showActions = async () => {
                const actionSheet = await this.actionSheetCtrl.create({
                        mode: 'ios',
                        header: 'Example header',
                        subHeader: 'Example subheader',
                        buttons: [
                                {
                                        text: 'Delete',
                                        role: 'destructive',
                                        data: {
                                                action: 'delete',
                                        },
                                },
                                {
                                        text: 'Share',
                                        data: {
                                                action: 'share',
                                        },
                                },
                                {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        data: {
                                                action: 'cancel',
                                        },
                                },
                        ],
                });

                await actionSheet.present();

                const result = await actionSheet.onDidDismiss();
        };

}