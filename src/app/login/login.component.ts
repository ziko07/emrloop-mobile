import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Platform} from '@ionic/angular';

import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../app.component.scss'],
})
export class LoginComponent implements OnInit {
    form: any;
    userDetails: any;
    disableLogin = false;
    errorMessage: any;
    buttonText: any = 'Login';
    token: any = 'Init';
    osType: string;

    constructor(private router: Router,
                private helperService: HelperService,
                public spinnerDialog: LoaderService,
                public authProvider: AuthService,
                private fcm: FCM,
                private platform: Platform
    ) {
        this.form = {login: '', password: ''};
    }

    ngOnInit() {
        this.getOsType();
        const data = window.localStorage.getItem('credential');
        const credential = data ? JSON.parse(data) : {};
        this.form.password = credential.password;
        this.form.login = credential.login;
        if (credential.login) {
            this.form.save_password = true;
        }
    }

    getOsType(): void {
        if (this.platform.is('ios')) {
            this.osType = 'ios';
        } else if (this.platform.is('android')) {
            this.osType = 'android';
        }
        console.log(this.platform.platforms(), this.osType);
    }

    onPushNotification(): void {
        this.authProvider.push(this.token, this.osType).subscribe(
            resp => {
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    getToken(): void {
        this.fcm.getToken().then(token => {
            this.token = token;
            console.log('Token done with ', this.token);
            this.onPushNotification();
        }).catch((error) => {
                console.log(error);
            }
        );
    }

    signin() {
        if (this.validateRegister(this.form)) {
            this.disableLogin = true;
            this.buttonText = 'Login...';
            this.userDetails = {
                login: this.form.login,
                password: this.form.password
            };
            this.helperService.showLoader();
            this.authProvider.login(this.userDetails).subscribe(resp => {
                this.helperService.dismissLoader();
                console.log(resp);
                if (resp.status === 200) {
                    setTimeout(() => {
                        this.getToken();
                    }, 5000);
                    window.location.href = '/';
                }
            }, err => {
                console.log(err);
                this.helperService.dismissLoader();
                this.disableLogin = false;
                if (err.status === 401) {
                    this.helperService.showDangerToast('Invalid username or password!');
                } else {
                    this.helperService.showDangerToast('Server encountered an issue! Please try after again.');
                }
            });
        } else {
            this.helperService.showDangerToast('Something went wrong. Try again later.');
        }
    }

    validateRegister(form) {
        if (this.form.login == undefined || this.form.login == '') {
            this.errorMessage = 'Enter email';
            return false;
        }
        if (this.form.password == undefined || this.form.password == '') {
            this.errorMessage = 'Enter password';
            return false;
        }
        return true;
    }
}
