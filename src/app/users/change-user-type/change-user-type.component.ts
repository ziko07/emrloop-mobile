import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';

import {UserService} from '../../../services/user.service';
import {HelperService} from '../../../services/helper.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-change-user-type',
    templateUrl: './change-user-type.component.html',
    styleUrls: ['./change-user-type.component.scss'],
})
export class ChangeUserTypeComponent implements OnInit {
    user = new User();
    users = [];
    id: any;
    userType: string;

    constructor(private route: ActivatedRoute,
                public router: Router,
                public userService: UserService,
                public helperService: HelperService,
                public authService: AuthService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.onGetSingleUserType();
    }

    onGetSingleUserType() {
        this.userService.getSingleUserType(this.id).subscribe(
            resp => {
                this.userType = resp.user_type;
                console.log(resp);
            }, err => {
                console.log(err);
            }
        )
    }


    onChangeUserType() {
        this.helperService.showLoader();
        console.log(this.userType, this.id);
        this.userService.changeUserType(this.id, this.userType).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp);
                if (resp.status === 'ok') {
                    this.userService.listUser(resp, 'update');
                    this.helperService.showUpdateToast(resp.message);
                    this.router.navigateByUrl('/users');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                this.helperService.dismissLoader();
                console.log(err);
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
    }
}
