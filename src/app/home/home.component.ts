import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
    name: string;
    type: string;
    user: any;

    constructor(public authService: AuthService,
                public helperService: HelperService) {
    }

    ngOnInit() {
        this.helperService.showLoader();
        setTimeout(() => {
            this.helperService.dismissLoader();
        }, 2000);
        this.onGetProfile();
        this.getUserInfo();
    }

    onGetProfile() {
        console.log('onGetProfile');
        this.authService.getProfile().subscribe(
            resp => {
                this.name = resp.name;
            }, err => {
            }
        );
    }

    getUserInfo() {
        this.helperService.showLoader();
        this.authService.getCurrentUser().subscribe(
            resp => {
                this.helperService.dismissLoader();
                this.name = resp.profile.name;
                this.type = resp.profile.type;
                console.log(resp);
            }, err => {
                this.helperService.dismissLoader();
                console.log(err);
            }
        );
    }
}
