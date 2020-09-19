import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Client} from '../../../models/client.model';

import {ClientService} from '../../../services/client.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['../clients.component.scss', '../add-client/add-client.component.scss'],
})
export class EditClientComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                public clientService: ClientService,
                public helperService: HelperService,
                public router: Router) {
    }

    id: string;
    client = new Client();

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loadClient();
        console.log(this.id);
    }

    loadClient() {
        this.clientService.getSingleClient(this.id).subscribe(
            resp => {
                this.client = resp;
                console.log(this.client);
            }, err => {
                console.log(err);
            }
        );
    }

    onEditClient() {
        if (!this.client.name) {
            this.helperService.showDangerToast('Input client name to update!');
            return;
        }
        this.helperService.showLoader();
        this.clientService.editClient(this.client.id, this.client.name).subscribe(
            resp => {
                console.log(resp);
                this.clientService.listClient(resp.client, 'update');
                this.helperService.dismissLoader();
                this.helperService.showUpdateToast(resp.message);
                this.router.navigateByUrl('/clients');

            }, err => {
                console.log(err);
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
    }
}
