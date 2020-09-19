import {Component, OnInit} from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss', '../app.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    userEmail = '';

    constructor(public authProvider: AuthService,
                public helperService: HelperService) {
    }

    ngOnInit() {
    }

    resetPassword() {
        this.helperService.showLoader();
        this.authProvider.resetPassword(this.userEmail).subscribe(
            resp => {
                this.helperService.dismissLoader();
                this.helperService.showSuccessToast(`An email has been sent to your mail containing instructions for resetting your password.`);
                console.log(this.userEmail);
                console.log(resp);
            },
            err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                console.log(this.userEmail);
                console.log(err);
            });
    }
}
