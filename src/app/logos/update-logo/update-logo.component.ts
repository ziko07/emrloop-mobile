import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {LogoService} from '../../../services/logo.service';
import {HelperService} from '../../../services/helper.service';
import {ClientService} from '../../../services/client.service';
import {GroupService} from '../../../services/group.service';

import {Logo} from '../../../models/logo.model';

@Component({
    selector: 'app-edit-logo',
    templateUrl: './update-logo.component.html',
    styleUrls: ['../logos.component.scss', '../add-logo/add-logo.component.scss'],
})
export class UpdateLogoComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                public router: Router,
                public logoService: LogoService,
                public helperService: HelperService,
                public clientService: ClientService,
                public groupService: GroupService) {
    }

    id: string;
    logo = new Logo();
    logos = [];
    clients = [];

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loadClientLogo();
        this.getAllClients();
        console.log(this.id);
    }

    getAllClients() {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.clients = resp[0].clients;
                console.log(this.clients);
            },
            err => {
                console.log(err);
            }
        );
    }

    loadClientLogo() {
        this.logoService.getSingleClientLogo(this.id).subscribe(
            resp => {
                console.log(resp);
                this.logo.image_type = resp.image_type;
                this.logo.client_id = resp.client.id;
                console.log(this.logo);
            }, err => {
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

    onUpdateLogo() {
        this.helperService.showLoader();
        this.logoService.updateLogo(this.id, this.logo).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.logoService.listLogo(resp.logo, 'update');
                    this.helperService.showUpdateToast(resp.message);
                    this.router.navigateByUrl('/logos');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                console.log(err);
                this.helperService.showUpdateToast('Something went wrong. Try again later.');
                this.helperService.dismissLoader();
            }
        );
    }
}
