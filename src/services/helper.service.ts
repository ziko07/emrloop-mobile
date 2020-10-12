import {Injectable} from '@angular/core';

import {ToastController, LoadingController, PopoverController} from '@ionic/angular';

import {PopoverComponent} from '../app/popover/popover.component';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;
    public loader;
    public popover;

    constructor(public toastController: ToastController,
                public loadingController: LoadingController,
                public popoverController: PopoverController) {
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

    public showPushLoader() {
        this.loader = this.loadingController.create({
            animated: true,
            message: 'Please wait ...',
            duration: 10000
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
