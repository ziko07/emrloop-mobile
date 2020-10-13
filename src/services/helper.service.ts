import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {ToastController, LoadingController, PopoverController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    public toast;
    public loader;
    public popover;

    constructor(public toastController: ToastController,
                public loadingController: LoadingController,
                public popoverController: PopoverController,
                public router: Router) {
    }

    public showMessageAlert() {
        this.toast = this.toastController.create({
            position: 'top',
            duration: 100000,
            animated: true,
            color: 'secondary',
            cssClass: 'custom-toast',
            buttons: [
                {
                    text: '1 new message received!',
                    side: 'start',
                    handler: () => {
                        this.router.navigateByUrl('/inbox');
                    }
                }
            ]
        }).then((toastData) => {
            toastData.present();
        });
    }

    public showAlert(message) {
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
