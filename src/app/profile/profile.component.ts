import {Component, OnInit} from '@angular/core';

import {HelperService} from '../../services/helper.service';
import {AuthService} from '../../services/auth.service';

import {Form} from '../../models/form.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../clients/clients.component.scss', './profile.component.scss', '../users/users.component.scss'],
})
export class ProfileComponent implements OnInit {

    constructor(public helperService: HelperService,
                public authProvider: AuthService) {
    }

    groups = [];
    email: string;
    type: string;
    password: string;
    password_confirmation: string;
    form = new Form();
    page = 1;
    length: number;

    loadData(event) {
        setTimeout(() => {
            this.getAllUserGroups();
            if (this.groups.length > 1) {
                event.target.complete();
            }
        }, 500);
    }

    ngOnInit() {
        this.getCurrentUserType();
        this.loadData(event);
        this.onGetCurrentUser();
    }

    onGetCurrentUser() {
        this.helperService.showLoader();
        this.authProvider.getCurrentUser().subscribe(
            resp => {
                this.helperService.dismissLoader();
                this.form = resp.profile;
                this.email = resp.profile.email;
                console.log(resp.profile);
            }, err => {
                this.helperService.dismissLoader();
                console.log(err);
            }
        );
    }

    getCurrentUserType() {
        this.authProvider.getUserType().subscribe(
            resp => {
                this.type = resp.user_type;
                console.log(this.type);
            }, err => {
                console.log(err);
            }
        );
    }

    getAllUserGroups() {
        this.authProvider.getUserGroups(this.page).subscribe(
            resp => {
                if (resp.my_groups.length < 1) {
                    this.helperService.showUpdateToast('All data successfully loaded!');
                    return;
                }
                this.groups = this.groups.concat(resp.my_groups);
                this.length = resp.group_size;
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
        ++this.page;
    }

    loadImageFromDevice(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.form.image = reader.result;
        };
    }

    onUpdateProfile() {
        if (!this.form.current_password) {
            this.helperService.showDangerToast('Input current password to update profile.');
            return;
        }
        if (this.password && this.password_confirmation) {
            this.form.password = this.password;
            this.form.password_confirmation = this.password_confirmation;
        }
        this.helperService.showLoader();
        this.authProvider.updateProfile(this.type, this.form).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.authProvider.listProfile(resp.user);
                    this.helperService.showSuccessToast(resp.message);
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                console.log(this.form);
            }
        );
        this.form.current_password = '';
    }
}
