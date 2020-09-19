import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';

import {UserService} from '../../../services/user.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-change-user-type',
    templateUrl: './change-user-type.component.html',
    styleUrls: ['./change-user-type.component.scss'],
})
export class ChangeUserTypeComponent implements OnInit {
    user = new User();
    id: any;
    userType: any;

    constructor(private route: ActivatedRoute,
                public router: Router,
                public userService: UserService,
                public helperService: HelperService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
    }

    onChangeUserType() {
        this.helperService.showLoader();
        console.log(this.userType, this.id);
        this.userService.changeUserType(this.id, this.userType).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp);
                this.userService.listUser(resp, 'update');
                this.helperService.showUpdateToast(resp.message);
                this.router.navigateByUrl('/users');
            }, err => {
                this.helperService.dismissLoader();
                console.log(err);
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
    }
}
