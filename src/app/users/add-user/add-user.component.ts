import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {User} from '../../../models/user.model';

import {UserService} from '../../../services/user.service';
import {ClientService} from '../../../services/client.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['../users.component.scss', './add-user.component.scss'],
})

export class AddUserComponent implements OnInit {
    user = new User();
    clients = [];

    constructor(public userService: UserService,
                public clientService: ClientService,
                public helperService: HelperService,
                public router: Router) {
    }

    onAddUser() {
        this.helperService.showLoader();
        this.userService.addUser(this.user).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                this.helperService.showSuccessToast(resp.message);
                this.userService.listUser(resp);
                this.router.navigateByUrl('/users');
            }, err => {
                console.log('Err');
                console.log(err);
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
    }

    getAllClients() {
        this.clientService.getClients().subscribe(
            resp => {
                this.clients = resp;
                console.log('Client list on Add user page');
                console.log(resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnInit() {
        this.getAllClients();
    }
}
