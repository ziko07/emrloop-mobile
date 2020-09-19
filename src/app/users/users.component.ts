import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {ChangeUserTypeComponent} from './change-user-type/change-user-type.component';

import {UserService} from '../../services/user.service';
import {HelperService} from '../../services/helper.service';

import {User} from '../../models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

    constructor(
        private modalController: ModalController,
        public userService: UserService,
        public helperService: HelperService) {
    }

    users = [];
    user = new User();

    ngOnInit() {
        this.getUser();
        this.getAllUsers();
    }

    getUser() {
        this.userService.getUser().subscribe(resp => {
            if (resp.action === 'new') {
                console.log(resp);
                const user = resp.user.user;
                user.type = resp.user.user_type;
                console.log(user);
                this.users.push(user);
            } else {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id === resp.user.user.id) {
                        this.users[i].type = resp.user.user_type;
                        console.log('Changed ' , this.users[i]);
                        break;
                    }
                }
            }
        }, err => {
        });
    }

    getAllUsers() {
        this.userService.getUsers().subscribe(
            resp => {
                console.log('User list');
                this.users = resp;
                console.log(resp);
            },
            err => {
            }
        );
    }

    onDeleteUser(id, email) {
        if (confirm('Are you sure?')) {
            this.helperService.showLoader();
            this.userService.deleteUser(email).subscribe(
                resp => {
                    this.helperService.dismissLoader();
                    this.helperService.showSuccessToast(resp.message);
                },
                err => {
                    this.helperService.dismissLoader();
                    this.helperService.showDangerToast('Something went wrong. Try again later.');
                }
            );
            this.users.splice(id, 1);
        }
    }
}
