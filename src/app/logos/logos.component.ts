import {Component, OnInit} from '@angular/core';

import {LogoService} from '../../services/logo.service';
import {HelperService} from '../../services/helper.service';
import {ClientService} from '../../services/client.service';

import {Logo} from '../../models/logo.model';

@Component({
    selector: 'app-logos',
    templateUrl: './logos.component.html',
    styleUrls: ['./logos.component.scss'],
})
export class LogosComponent implements OnInit {
    constructor(
        public logoService: LogoService,
        public helperService: HelperService,
        public clientService: ClientService) {
    }

    logo = new Logo();
    logos = [];
    clients = [];

    ngOnInit() {
        this.getLogo();
        this.getAllLogos();
        this.getAllClients();
    }

    getLogo() {
        this.logoService.getLogo().subscribe(resp => {
            if (resp.action === 'new') {
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
        this.helperService.showLoader();
        this.logoService.getLogos().subscribe(
            resp => {
                this.helperService.dismissLoader();
                this.logos = resp;
                for (const logo of this.logos) {
                    if ((logo.client)) {
                        console.log(logo.client.name);
                    }
                }
                console.log(resp);
            }, err => {
                this.helperService.dismissLoader();
                console.log(err);
            }
        );
    }

    getAllClients() {
        this.clientService.getClients().subscribe(
            resp => {
                this.clients = resp;
                console.log('Client list');
                console.log(resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    deleteLogo(id, logoID) {
        if (confirm('Are you sure?')) {
            this.logos.splice(id, 1);
            this.helperService.showLoader();
            this.logoService.deleteLogo(logoID).subscribe(
                resp => {
                    console.log(resp);
                    this.helperService.dismissLoader();
                    this.helperService.showUpdateToast('Logo Successfully Deleted!');
                }, err => {
                    console.log(err);
                    this.helperService.dismissLoader();
                    this.helperService.showDangerToast('Something went wrong. Try again later.');
                }
            );
            console.log(id, logoID);
        }
    }
}
