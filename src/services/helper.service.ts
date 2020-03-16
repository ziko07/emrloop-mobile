import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;

    constructor(public toastController: ToastController) {
    }

    public showToast(message, type = 'danger') {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 4000,
            animated: true,
            color: type,
            cssClass: 'my-custom-class'
        }).then((toastData) => {
            toastData.present();
        });
    }
}
