import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Logo} from '../../../models/logo.model';

import {ClientService} from '../../../services/client.service';
import {LogoService} from '../../../services/logo.service';
import {HelperService} from '../../../services/helper.service';
import {GroupService} from '../../../services/group.service';

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
                public groupService: GroupService,
                public router: Router) {
    }

    ngOnInit() {
        this.getAllClients();
    }

    getAllClients() {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.clients = resp[0].clients;
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
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.logoService.listLogo(resp.logo);
                    this.helperService.showSuccessToast(resp.message);
                    this.router.navigateByUrl('/logos');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                console.log(err);
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                this.helperService.dismissLoader();
            }
        );
    }
}
