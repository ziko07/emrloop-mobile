import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Logo} from '../../../models/logo.model';

import {ClientService} from '../../../services/client.service';
import {LogoService} from '../../../services/logo.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-add-logo',
    templateUrl: './add-logo.component.html',
    styleUrls: ['../logos.component.scss', './add-logo.component.scss'],
})
export class AddLogoComponent implements OnInit {
    logo = new Logo();
    clients = [];

    constructor(public clientService: ClientService,
                public logoService: LogoService,
                public helperService: HelperService,
                public router: Router) {
    }

    ngOnInit() {
        this.getAllClients();
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

    loadImageFromDevice(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.logo.base64_file = reader.result;
        };
    }

    onCreateLogo() {
        this.helperService.showLoader();
        this.logoService.createLogo(this.logo).subscribe(
            resp => {
                this.logoService.listLogo(resp.logo);
                this.helperService.showSuccessToast(resp.message);
                this.helperService.dismissLoader();
                this.router.navigateByUrl('/logos');
                console.log(resp);
            }, err => {
                console.log(err);
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                this.helperService.dismissLoader();
            }
        );
    }
}
