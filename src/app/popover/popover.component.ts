import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import { PopoverController } from '@ionic/angular';

import {LogoService} from '../../services/logo.service';
import {HelperService} from '../../services/helper.service';
import {UserService} from '../../services/user.service';
import {ClientService} from '../../services/client.service';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(public helperService: HelperService,
                public logoService: LogoService,
                public userService: UserService,
                public clientService: ClientService,
                public popOverController: PopoverController,
                public router: Router) {
    }

    @Input() i;
    @Input() id;
    @Input() list;
    @Input() text;
    @Input() email;
    @Input() user;

    public popover;

    ngOnInit() {
        console.log(this.user);
    }

    public showPopOver(ev): void {
        this.popover = this.popOverController.create({
            component: PopoverComponent,
            componentProps: {
                list: this.list,
                i: this.i,
                id: this.id,
                email: this.email,
                user: this.user
            },
            cssClass: 'popover-content',
            event: ev,
            translucent: true
        }).then((popOverData) => {
            popOverData.present();
        });
    }

    public dismissPopOver() {
        this.popOverController.dismiss();
    }

    onConfirmUser() {
        if (confirm('Are you sure to confirm this user?')) {
            this.userService.confirmUser(this.user.id).subscribe(
                resp => {
                    if (resp.status === 'ok') {
                        this.user.confirmed = true;
                        this.helperService.showSuccessToast(resp.message);
                    }
                    console.log(resp);
                }, err => {
                    console.log(err);
                }
            );
        }
    }

    onChangeRoute() {
        const optionsElement = document.querySelector('.options');
        optionsElement.classList.add('d-none');
        this.dismissPopOver();
        if (this.text === 'user') {
            this.router.navigateByUrl('/users/' + this.id + '/change');
        } else if (this.text === 'client') {
            this.router.navigateByUrl('/clients/' + this.id + '/edit');
        } else {
            this.router.navigateByUrl('logos/' + this.id + '/edit');
        }
    }

    delete(i, id) {
        this.dismissPopOver();
        this.list.splice(i, 1);
        if (this.text === 'user') {
            if (confirm('Are you sure to delete this user?')) {
                this.helperService.showLoader();
                this.userService.deleteUser(this.email).subscribe(
                    resp => {
                        console.log(resp);
                        this.helperService.dismissLoader();
                        if (resp.status === 'ok') {
                            this.helperService.showSuccessToast(resp.message);
                        } else {
                            this.helperService.showDangerToast(resp.message);
                        }
                    },
                    err => {
                        this.helperService.dismissLoader();
                        this.helperService.showDangerToast('Something went wrong. Try again later.');
                    }
                );
            }
        } else if (this.text === 'client') {
            if (confirm('Are you sure to delete this client?')) {
                this.helperService.showLoader();
                this.clientService.deleteClient(id).subscribe(
                    resp => {
                        this.helperService.dismissLoader();
                        if (resp.status === 'ok') {
                            this.helperService.showUpdateToast(resp.message);
                        } else {
                            this.helperService.showDangerToast(resp.message);
                        }
                        console.log(resp);
                    },
                    err => {
                        console.log(err);
                        this.helperService.showDangerToast('Something went wrong. Try again later.');
                        this.helperService.dismissLoader();
                    }
                );
            }
        } else {
            if (confirm('Are you sure to delete this logo?')) {
                this.helperService.showLoader();
                this.logoService.deleteLogo(id).subscribe(
                    resp => {
                        console.log(resp);
                        this.helperService.dismissLoader();
                        if (resp.status === 'ok') {
                            this.helperService.showUpdateToast(resp.message);
                        } else {
                            this.helperService.showDangerToast(resp.message);
                        }
                    }, err => {
                        console.log(err);
                        this.helperService.dismissLoader();
                        this.helperService.showDangerToast('Something went wrong. Try again later.');
                    }
                );
                console.log(i, id);
            }
        }
    }
}
