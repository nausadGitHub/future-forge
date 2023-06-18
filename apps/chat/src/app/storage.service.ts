import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

@Injectable({
        providedIn: 'root'
})
export class StorageService {

        netStatus: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

        onNetworkChange(): Observable<ConnectionStatus> {
                return this.netStatus.asObservable();
        }

        getCurrentNetworkStatus(): ConnectionStatus {
                return this.netStatus.getValue();
        }

        get_status = async () => {
                await Network.getStatus().then(c => c.connectionType)
        }

        get_user_status = async () => {
                if (['android', 'ios'].includes(Capacitor.getPlatform())) {
                        return [null, undefined, '']?.includes(await this.get_user_native());
                }
                return [null, undefined, '']?.includes(await this.get_user_web());
        }

        set_user_success = async (v: string) => {
                if (['android', 'ios'].includes(Capacitor.getPlatform())) {
                        return await this.set_user_native(v);
                }
                return await this.set_user_web(v);;
        };

        // User
        set_user_native = async (v: string) => {
                await Preferences?.set({ key: 'user', value: v });
        };

        get_user_native = async () => {
                return (await Preferences?.get({ key: 'user' }))?.value;
        };

        remove_user_native = async () => {
                await Preferences?.remove({ key: 'user' });
        };

        set_user_web = async (v: string) => {
                localStorage?.setItem('user', v);
        };

        get_user_web = async () => {
                return localStorage?.getItem('user');
        };

        remove_user_web = async () => {
                localStorage?.removeItem('user');
        };

        get_token_status = async () => {
                if (['android', 'ios'].includes(Capacitor.getPlatform())) {
                        return [null, undefined, '']?.includes(await this.get_token_native());
                }
                return [null, undefined, '']?.includes(await this.get_token_web());
        }

        set_token_success = async (v: string) => {
                if (['android', 'ios'].includes(Capacitor.getPlatform())) {
                        return await this.set_token_native(v);
                }
                return await this.set_token_web(v);;
        };

        // Token
        set_token_native = async (v: string) => {
                await Preferences?.set({ key: 'token', value: v });
        };

        get_token_native = async () => {
                return (await Preferences?.get({ key: 'token' }))?.value;
        };

        remove_token_native = async () => {
                await Preferences?.remove({ key: 'token' });
        };

        set_token_web = async (v: string) => {
                localStorage?.setItem('token', v);
        };

        get_token_web = async () => {
                return localStorage?.getItem('token');
        };

        remove_token_web = async () => {
                localStorage?.removeItem('token');
        };
}
