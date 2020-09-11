import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../../services/user.service';
import {HelperService} from '../../../services/helper.service';

@Component({
    selector: 'app-change-user-type',
    templateUrl: './change-user-type.component.html',
    styleUrls: ['./change-user-type.component.scss'],
})
export class ChangeUserTypeComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                public userService: UserService,
                public helperService: HelperService) {
    }

    id: any;
    userType: any;

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log('User id: ' + this.id);
    }

    onChangeUserType() {
        console.log(this.userType);
        this.userService.changeUserType(this.id, this.userType).subscribe(
            resp => {
                console.log(resp);
                this.helperService.showSuccessToast(resp.message);
            }, err => {
                console.log(err);
                this.helperService.showDangerToast(err.message);
            }
        );
    }
}
