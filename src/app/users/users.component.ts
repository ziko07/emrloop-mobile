import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {HelperService} from '../../services/helper.service';
import {AuthService} from '../../services/auth.service';

import {User} from '../../models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    constructor(
        private router: Router,
        public userService: UserService,
        public helperService: HelperService,
        public authService: AuthService) {
    }

    user = new User();
    users = [];
    page = 0;
    checked = false;

    ngOnInit() {
        this.loadData(event);
        this.getCurrentUserType();
        this.getUser();
    }

    loadData(event) {
        if (this.checked) {
            event.target.complete();
            return;
        }
        setTimeout(() => {
            ++this.page;
            this.getAllUsers();
            if (this.users.length > 0) {
                event.target.complete();
                return;
            }
        }, 500);
    }

    getCurrentUserType() {
        this.authService.getUserType().subscribe(
            resp => {
                if (resp.user_type !== 'admin') {
                    this.router.navigateByUrl('/home');
                }
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    getUser() {
        this.userService.getUser().subscribe(resp => {
            if (resp.action === 'new' && this.checked) {
                console.log(resp);
                const user = resp.user.user;
                user.type = resp.user.user_type;
                console.log(user);
                this.users.push(user);
            } else if (resp.action === 'update') {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id === resp.user.user.id) {
                        this.users[i].type = resp.user.user_type;
                        console.log('Changed ', this.users[i]);
                        break;
                    }
                }
            } else if (resp.action === 'group') {
                console.log(resp);
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].email === resp.user) {
                        ++this.users[i].group_number;
                        console.log('triggered!', this.users[i]);
                        break;
                    }
                }
            }
        }, err => {
        });
    }

    getAllUsers() {
        if (this.page === 1) {
            this.helperService.showLoader();
        }
        this.userService.getUsers(this.page).subscribe(
            resp => {
                if (this.page === 1) {
                    this.helperService.dismissLoader();
                }
                if (resp.users.length < 1) {
                    this.checked = true;
                    this.helperService.showUpdateToast('All data successfully loaded!');
                    return;
                }
                this.users = this.users.concat(resp.users);
                console.log(resp, resp.users, this.page);
            },
            err => {
                if (this.page === 1) {
                    this.helperService.dismissLoader();
                }
                console.log(err);
            }
        );
    }

    onConfirmUser(user) {
        console.log(user);
        this.userService.confirmUser(user.id).subscribe(
            resp => {
                if (resp.status === 'ok') {
                    user.confirmed = true;
                    this.helperService.showSuccessToast(resp.message);
                }
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    onDeleteUser(id, email) {
        if (confirm('Are you sure?')) {
            this.helperService.showLoader();
            this.userService.deleteUser(email).subscribe(
                resp => {
                    console.log(resp);
                    this.helperService.dismissLoader();
                    if (resp.status === 'ok') {
                        this.helperService.showSuccessToast(resp.message);
                    } else {
                        this.helperService.showDangerToast(resp.message);
                    }
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
