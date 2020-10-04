import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ClientService} from '../../services/client.service';
import {HelperService} from '../../services/helper.service';
import {AuthService} from '../../services/auth.service';

import {Client} from '../../models/client.model';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    constructor(public clientService: ClientService,
                public helperService: HelperService,
                private router: Router,
                public authService: AuthService) {
    }

    client = new Client();
    clients = [];
    page = 0;
    checked = false;

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
            if (resp.action === 'new' && this.checked) {
                this.clients.push(resp.client);
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

    onDeleteClient(id, clientId) {
        if (confirm('Are you sure?')) {
            this.clients.splice(id, 1);
            console.log(id + ',' + clientId);
            this.helperService.showLoader();
            this.clientService.deleteClient(clientId).subscribe(
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
    }
}
