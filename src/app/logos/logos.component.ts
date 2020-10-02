import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { ActionSheetController, PopoverController } from '@ionic/angular';

import {LogoService} from '../../services/logo.service';
import {HelperService} from '../../services/helper.service';
import {ClientService} from '../../services/client.service';
import {GroupService} from '../../services/group.service';
import {AuthService} from '../../services/auth.service';

import {Logo} from '../../models/logo.model';
import {PopoverComponent} from '../popover/popover.component';

@Component({
    selector: 'app-logos',
    templateUrl: './logos.component.html',
    styleUrls: ['./logos.component.scss'],
})
export class LogosComponent implements OnInit {
    constructor(
        private router: Router,
        public authService: AuthService,
        public logoService: LogoService,
        public helperService: HelperService,
        public clientService: ClientService,
        public groupService: GroupService,
        public actionSheetController: ActionSheetController,
        public popOverController: PopoverController) {
    }

    logo = new Logo();
    logos = [];
    clients = [];
    page = 1;
    checked = false;
    isVisible = false;

    public actionSheet;
    public popover;

    public showPopOver(ev, i, logoId): void {
        this.popover = this.popOverController.create({
            component: PopoverComponent,
            componentProps: {
                logos: this.logos,
                i,
                logoId
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

    // public showActionSheet(logos, i, id): void {
    //     this.actionSheet = this.actionSheetController.create({
    //         header: 'Logo options',
    //         cssClass: 'options',
    //         buttons: [{
    //             text: 'Update',
    //             icon: 'pencil',
    //             handler: () => {
    //                 this.router.navigateByUrl('/logos/' + id + '/edit');
    //             }
    //         }, {
    //             text: 'Delete',
    //             role: 'destructive',
    //             icon: 'trash',
    //             handler: () => {
    //                 this.deleteLogo(i, id);
    //             }
    //         }, {
    //             text: 'Cancel',
    //             icon: 'close',
    //             role: 'cancel',
    //             handler: () => {
    //                 console.log('Cancel clicked');
    //             }
    //         }]
    //     }).then((actionSheetData) => {
    //         actionSheetData.present();
    //     });
    // }

    loadData(event) {
        if (this.checked) {
            event.target.complete();
            return;
        }
        setTimeout(() => {
            this.getAllLogos();
            if (this.clients.length > 0) {
                event.target.complete();
                return;
            }
        }, 500);
    }

    ngOnInit() {
        this.getCurrentUserType();
        this.loadData(event);
        this.getLogo();
        this.getAllClients();
    }

    // showOptions(e): void {
    //     this.showActionSheet(logos, i, id);
    //     const singleLogo = document.getElementById('show_option_' + i);
    //     if (singleLogo.classList.contains('bg-shadow')) {
    //         singleLogo.classList.remove('bg-shadow');
    //     } else {
    //         singleLogo.classList.add('bg-shadow');
    //     }
    // }

    getCurrentUserType() {
        this.authService.getUserType().subscribe(
            resp => {
                if (resp.user_type !== 'admin') {
                    this.router.navigateByUrl('/inbox');
                }
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    getLogo() {
        this.logoService.getLogo().subscribe(
            resp => {
                if (resp.action === 'new' && this.checked) {
                    this.logos.push(resp.logo);
                } else {
                    for (let i = 0; i < this.logos.length; i++) {
                        if (this.logos[i].id === resp.logo.id) {
                            this.logos[i] = resp.logo;
                            break;
                        }
                    }
                }
            }, err => {
            });
    }

    getAllLogos() {
        this.logoService.getLogos(this.page).subscribe(
            resp => {
                if (resp.length < 1) {
                    this.checked = true;
                    this.helperService.showUpdateToast('All data successfully loaded!');
                    return;
                }
                this.logos = this.logos.concat(resp);
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
        ++this.page;
    }

    getAllClients() {
        this.helperService.showLoader();
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.helperService.dismissLoader();
                this.clients = resp[0].clients;
                console.log(this.clients);
            },
            err => {
                this.helperService.dismissLoader();
                console.log(err);
            }
        );
    }
}
