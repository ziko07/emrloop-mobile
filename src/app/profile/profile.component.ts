import {Component, OnInit} from '@angular/core';

import {HelperService} from '../../services/helper.service';
import {AuthService} from '../../services/auth.service';

import {Form} from '../../models/form.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../clients/clients.component.scss', './profile.component.scss'],
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

    ngOnInit() {
        this.getCurrentUserType();
        this.getAllUserGroups();
        this.onGetCurrentUser();
    }

    onGetCurrentUser() {
        this.authProvider.getCurrentUser().subscribe(
            resp => {
                this.form = resp.profile;
                this.email = resp.profile.email;
                console.log(this.form);
            }, err => {
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
        this.authProvider.getUserGroups().subscribe(
            resp => {
                this.groups = resp;
                console.log(this.groups);
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
        if (this.password && this.password_confirmation) {
            this.form.password = this.password;
            this.form.password_confirmation = this.password_confirmation;
            console.log('yes');
        } else {
            console.log('no');
        }
        this.helperService.showLoader();
        this.authProvider.updateProfile(this.type, this.form).subscribe(
            resp => {
                console.log(resp);
                this.helperService.showSuccessToast(resp.message);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.authProvider.listProfile(resp.user);
                }
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                console.log(this.form);
            }
        );
    }
}
