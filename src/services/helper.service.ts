import {Injectable} from '@angular/core';
import {ToastController, LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;
    public loader;

    constructor(public toastController: ToastController,
                public loadingController: LoadingController) {
    }

    public showSuccessToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 1000,
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
            duration: 1000,
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
            duration: 1000,
            animated: true,
            color: 'danger',
            cssClass: 'my-custom-class'
        }).then((toastData) => {
            toastData.present();
        });
    }

    public showLoader() {
        this.loader = this.loadingController.create({
            animated: true,
            message: 'Please wait...',
        }).then((loadData) => {
            loadData.present();
        });
    }

    public dismissLoader() {
        this.loadingController.dismiss();
    }
}
