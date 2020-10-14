import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

    constructor(private router: Router,
                private helperService: HelperService,
                public spinnerDialog: LoaderService,
                public authProvider: AuthService
    ) {
        this.form = {login: '', password: ''};
    }

    ngOnInit() {
        const data = window.localStorage.getItem('credential');
        const credential = data ? JSON.parse(data) : {};
        this.form.password = credential.password;
        this.form.login = credential.login;
        if (credential.login) {
            this.form.save_password = true;
        }
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
                if (resp.status === 200) {
                    window.location.href = '/';
                    this.helperService.dismissLoader();
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
