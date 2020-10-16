import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ClientService} from '../../services/client.service';
import {HelperService} from '../../services/helper.service';
import {AuthService} from '../../services/auth.service';

import {Client} from '../../models/client.model';

import { PopoverController } from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    constructor(public clientService: ClientService,
                public helperService: HelperService,
                private router: Router,
                public authService: AuthService,
                public popOverController: PopoverController) {
    }

    client = new Client();
    clients = [];
    page = 0;
    checked = false;

    public popover;

    public showPopOver(ev, i, id): void {
        this.popover = this.popOverController.create({
            component: PopoverComponent,
            componentProps: {
                list: this.clients,
                i,
                id,
                text: 'client'
            },
            cssClass: 'custom-popover',
            event: ev,
            translucent: true
        }).then((popOverData) => {
            popOverData.present();
        });
    }

    loadData(event) {
        if (this.checked) {
            event.target.complete();
            return;
        }
        setTimeout(() => {
            ++this.page;
            this.getAllClients();
            if (this.clients.length > 0) {
                event.target.complete();
                return;
            }
        }, 500);
    }

    ngOnInit() {
        this.getCurrentUserType();
        this.getClient();
        this.loadData(event);
    }

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

    getClient() {
        this.clientService.getClient().subscribe(resp => {
            if (resp.action === 'new') {
                this.clients.unshift(resp.client);
            } else {
                for (let i = 0; i < this.clients.length; i++) {
                    if (this.clients[i].id === resp.client.id) {
                        this.clients[i] = resp.client;
                        break;
                    }
                }
            }
        }, err => {
        });
    }

    getAllClients() {
        if (this.page === 1) {
            this.helperService.showLoader();
        }
        this.clientService.getClients(this.page).subscribe(
            resp => {
                if (this.page === 1) {
                    this.helperService.dismissLoader();
                }
                if (resp.length < 1) {
                    this.checked = true;
                    this.helperService.showUpdateToast('Client list is successfully loaded!');
                    return;
                }
                this.clients = this.clients.concat(resp);
                console.log(resp);
            },
            err => {
                if (this.page === 1) {
                    this.helperService.dismissLoader();
                }
                console.log(err);
            }
        );
    }
}
