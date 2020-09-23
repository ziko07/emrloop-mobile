import {Component, OnInit} from '@angular/core';

import {LogoService} from '../../services/logo.service';
import {HelperService} from '../../services/helper.service';
import {ClientService} from '../../services/client.service';
import {GroupService} from '../../services/group.service';

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
        public clientService: ClientService,
        public groupService: GroupService) {
    }

    logo = new Logo();
    logos = [];
    clients = [];
    page = 1;
    checked = false;

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
        this.loadData(event);
        this.getLogo();
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

    deleteLogo(id, logoID) {
        if (confirm('Are you sure?')) {
            this.logos.splice(id, 1);
            this.helperService.showLoader();
            this.logoService.deleteLogo(logoID).subscribe(
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
            console.log(id, logoID);
        }
    }
}
