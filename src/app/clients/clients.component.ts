import {Component, OnInit} from '@angular/core';

import {ClientService} from '../../services/client.service';
import {HelperService} from '../../services/helper.service';

import {Client} from '../../models/client.model';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    constructor(public clientService: ClientService,
                public helperService: HelperService) {
    }

    client = new Client();
    clients = [];
    page = 1;

    loadData(event) {
        setTimeout(() => {
            this.getAllClients();
            if (this.clients.length > 1) {
                event.target.complete();
            }
        }, 500);
    }

    ngOnInit() {
        this.getClient();
        this.loadData(event);
    }

    getClient() {
        this.clientService.getClient().subscribe(resp => {
            if (resp.action === 'new') {
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
        this.helperService.showLoader();
        this.clientService.getClients(this.page).subscribe(
            resp => {
                this.helperService.dismissLoader();
                if (resp.length < 1) {
                    this.helperService.showUpdateToast('All data successfully loaded!');
                    return;
                }
                this.clients = this.clients.concat(resp);
                console.log(resp);
            },
            err => {
                this.helperService.dismissLoader();
                console.log(err);
            }
        );
        ++this.page;
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
