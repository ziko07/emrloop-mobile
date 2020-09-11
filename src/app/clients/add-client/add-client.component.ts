import {Component, OnInit, Output, EventEmitter} from '@angular/core';

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
    name: string;

    @Output() clientAdded = new EventEmitter();

    constructor(public clientService: ClientService, public helperService: HelperService) {
    }

    ngOnInit() {
    }

    onAddClient() {
        this.name = this.client.name;
        this.clientService.addClient(this.name).subscribe(
            resp => {
                this.clientService.listClient(resp.client);
                this.helperService.showSuccessToast(resp.message);
                console.log(resp);
            },
            err => {
                this.helperService.showDangerToast(err.message);
                console.log(err);
            }
        );
    }
}
