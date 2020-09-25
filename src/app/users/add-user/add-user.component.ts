import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {User} from '../../../models/user.model';

import {UserService} from '../../../services/user.service';
import {ClientService} from '../../../services/client.service';
import {HelperService} from '../../../services/helper.service';
import {GroupService} from '../../../services/group.service';

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
                public groupService: GroupService,
                public router: Router) {
    }

    onAddUser() {
        if (this.user.password !== this.user.password_confirmation) {
            this.helperService.showDangerToast("Passwords don't match");
            return;
        }
        if (this.user.password.length < 8 || this.user.password_confirmation.length < 8) {
            this.helperService.showDangerToast('Password should have at least 8 characters.');
            return;
        }
        this.helperService.showLoader();
        this.userService.addUser(this.user).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.helperService.showSuccessToast(resp.message);
                    this.userService.listUser(resp);
                    this.router.navigateByUrl('/users');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                console.log('Err');
                console.log(err);
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
    }

    getAllClients() {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.clients = resp[0].clients;
                console.log('Client list on Add user page');
                console.log(this.clients);
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
