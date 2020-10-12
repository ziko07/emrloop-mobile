import {LoadingController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    constructor(public loadingCtrl: LoadingController) {

    }

    async show(title, text, callback = false) {
        const loader = await this.loadingCtrl.create({
            cssClass: 'custom-loader',
            spinner: 'lines',
            message: text,
            mode: 'md',
            backdropDismiss: true
        });
        loader.present();
    }

    hide() {
        setTimeout(() => {
            this.dismissLoader();
        }, 1000);
    }

    async dismissLoader() {
        let topLoader = await this.loadingCtrl.getTop();
        while (topLoader) {
            if (!(await topLoader.dismiss())) {
                break;
            }
            topLoader = await this.loadingCtrl.getTop();
        }
    }
}
