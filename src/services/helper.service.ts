import {Injectable} from '@angular/core';

import {ToastController, LoadingController, PopoverController, AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;
    public loader;
    public popover;
    public alert;

    constructor(public toastController: ToastController,
                public loadingController: LoadingController,
                public popoverController: PopoverController,
                public alertController: AlertController) {
    }

    public showExitConfirm() {
        this.alert = this.alertController.create({
            header: 'Confirm!',
            message: 'Do you want to close the app?',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Exit',
                    cssClass: 'alert-btn',
                    handler: () => {
                        navigator['app'].exitApp();
                    }
                },
                {
                    text: 'Stay',
                    role: 'cancel',
                    cssClass: 'alert-btn',
                    handler: () => {
                        console.log('Application exit prevented!');
                    }
                }]
        }).then((alertData) => {
            alertData.present();
        });
    }

    public showMessageAlert(message) {
        this.toast = this.toastController.create({
            message,
            position: 'top',
            duration: 500,
            animated: true,
            color: 'dark',
            cssClass: 'alert-toast'
        }).then((toastData) => {
            toastData.present();
        });
    }

    public showAlertToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 1000,
            animated: true,
            color: 'dark',
            cssClass: 'custom-toast'
        }).then((toastData) => {
            toastData.present();
        });
    }

    public showSuccessToast(message) {
        this.toast = this.toastController.create({
            message,
            position: 'bottom',
            duration: 1000,
            animated: true,
            color: 'success',
            cssClass: 'custom-toast'
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
            cssClass: 'custom-toast'
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
            cssClass: 'custom-toast'
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

    // public showPopOver(i, logoId): void {
    //     this.popover = this.popoverController.create({
    //         component: PopoverComponent,
    //         componentProps: {
    //             i,
    //             logoId
    //         }
    //     }).then((popOverData) => {
    //         popOverData.present();
    //     });
    // }

    // public dismissPopOver() {
    //     this.popoverController.dismiss();
    // }
}
