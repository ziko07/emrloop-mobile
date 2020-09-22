import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {Client} from '../../../models/client.model';

import {ClientService} from '../../../services/client.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['../clients.component.scss', './add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
    client = new Client();

    @Output() clientAdded = new EventEmitter();

    constructor(public clientService: ClientService,
                public helperService: HelperService,
                public router: Router) {
    }

    ngOnInit() {
    }

    onAddClient() {
        if (!this.client.name) {
            this.helperService.showDangerToast('Input client name to add!');
            return;
        }
        this.helperService.showLoader();
        this.clientService.addClient(this.client.name).subscribe(
            resp => {
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.clientService.listClient(resp.client);
                    this.helperService.showSuccessToast(resp.message);
                    this.router.navigateByUrl('/clients');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
                console.log(resp);
            },
            err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                console.log(err);
            }
        );
    }
}
