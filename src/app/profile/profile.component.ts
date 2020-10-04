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
    name: string;
    nickname: string;
    password: string;
    password_confirmation: string;
    form = new Form();
    page = 0;
    length = 0;
    checked = false;

    loadData(event) {
        if (this.checked) {
            event.target.complete();
            return;
        }
        setTimeout(() => {
            ++this.page;
            this.getAllUserGroups();
            if (this.groups.length > 0) {
                event.target.complete();
                return;
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
                this.form.name = resp.profile.name;
                this.name = resp.profile.name;
                this.form.nickname = resp.profile.nickname;
                this.nickname = resp.profile.nickname;
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
                    this.checked = true;
                    this.helperService.showUpdateToast('User group list is successfully loaded!');
                    return;
                }
                this.groups = this.groups.concat(resp.my_groups);
                this.length = resp.group_size;
                console.log(resp);
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
            this.form.image = reader.result;
        };
    }

    onUpdateProfile() {
        if (!this.form.current_password) {
            this.helperService.showDangerToast('Input current password to update profile.');
            return;
        }
        if (this.password && this.password_confirmation) {
            if (this.password.length < 8 || this.password_confirmation.length < 8) {
                this.helperService.showDangerToast('Password should have at least 8 characters.');
                this.password = '';
                this.password_confirmation = '';
                this.form.current_password = '';
                return;
            }
            if (this.password !== this.password_confirmation) {
                this.helperService.showDangerToast("Passwords don't match.");
                this.password = '';
                this.password_confirmation = '';
                this.form.current_password = '';
                return;
            }
            if (this.password === this.form.current_password) {
                this.helperService.showUpdateToast('New password is same to current password.');
                this.password = '';
                this.password_confirmation = '';
                this.form.current_password = '';
                return;
            }
            this.form.password = this.password;
            this.form.password_confirmation = this.password_confirmation;
        }
        if (this.name) {
            this.form.name = this.name;
        }
        if (this.nickname) {
            this.form.nickname = this.nickname;
        }
        this.helperService.showLoader();
        const formData = {};
        for (const key in this.form) {
            if (this.form[key]) {
                formData[key] = this.form[key];
            }
        }
        this.authProvider.updateProfile(this.type, formData).subscribe(
            resp => {
                console.log(resp);
                console.log(this.form);
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
        this.password = '';
        this.password_confirmation = '';
        this.form.password = '';
        this.form.password_confirmation = '';
        this.form.current_password = '';
        this.form.image = '';
    }
}
