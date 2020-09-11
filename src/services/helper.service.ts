import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;

    constructor(public toastController: ToastController) {
    }

    public showSuccessToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 4000,
            animated: true,
            color: 'success',
            cssClass: 'my-custom-class'
        }).then((toastData) => {
            toastData.present();
        });
    }
    public showUpdateToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 4000,
            animated: true,
            color: 'tertiary',
            cssClass: 'my-custom-class'
        }).then((toastData) => {
            toastData.present();
        });
    }
    public showDangerToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 4000,
            animated: true,
            color: 'danger',
            cssClass: 'my-custom-class'
        }).then((toastData) => {
            toastData.present();
        });
    }
}
