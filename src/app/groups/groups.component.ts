import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {GroupService} from '../../services/group.service';
import {HelperService} from '../../services/helper.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

import {Group} from '../../models/group.model';
import {Email} from '../../models/email.model';
import {Client} from '../../models/client.model';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

    constructor(public groupService: GroupService,
                public helperService: HelperService,
                public userService: UserService,
                private router: Router,
                public authService: AuthService) {
    }

    allGroups = [];

    groups = [];
    group = new Group();
    group_id: number;

    emails = [];
    email = new Email();
    email_name: string;

    clients = [];
    client = new Client();
    user_uid: string;
    client_id: number;

    page = 1;
    checked = false;

    loadData(event) {
        if (this.checked) {
            event.target.complete();
            return;
        }
        setTimeout(() => {
            this.getAllGroups();
            if (this.groups.length > 0) {
                event.target.complete();
                return;
            }
        }, 500);
    }

    ngOnInit() {
        this.getCurrentUserType();
        this.loadData(event);
        this.getInfo();
    }

    getCurrentUserType() {
        this.authService.getUserType().subscribe(
            resp => {
                if (resp.user_type !== 'admin') {
                    this.router.navigateByUrl('/inbox');
                }
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    getAllGroups() {
        this.groupService.getGroups(this.page).subscribe(
            resp => {
                if (resp.groups.length < 1) {
                    this.checked = true;
                    this.helperService.showUpdateToast('Group list is successfully loaded!');
                    return;
                }
                this.groups = this.groups.concat(resp.groups);
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
        ++this.page;
    }

    getInfo() {
        this.helperService.showLoader();
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.allGroups = resp[0].groups;
                this.clients = resp[0].clients;
                this.emails = resp[0].emails;
                console.log(resp);
                this.helperService.dismissLoader();
                console.log(this.allGroups);
            },
            err => {
                this.helperService.dismissLoader();
            }
        );
    }

    onJoinGroup() {
        this.helperService.showLoader();
        this.group_id = this.group.join_group_id;
        console.log(this.group_id);
        this.groupService.joinGroup(this.group_id).subscribe(
            resp => {
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.helperService.showSuccessToast('You have been added to the selected group.');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
                console.log(resp);
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
                console.log(err);
            }
        );
        this.group.join_group_id = null;
    }

    onAddUserToGroup() {
        this.helperService.showLoader();
        this.group_id = this.group.add_user_group_id;
        this.email_name = this.email.email;
        console.log(this.group_id, this.email_name);
        this.groupService.addUserToGroup(this.group_id, this.email_name).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp);
                if (resp.status === 'ok') {
                    this.userService.listUser(this.email_name, 'group');
                    this.helperService.showSuccessToast(resp.message);
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
        this.group.add_user_group_id = null;
        this.email_name = null;
    }

    onLeaveGroup() {
        this.helperService.showLoader();
        this.group_id = this.group.leave_user_group_id;
        console.log(this.group_id);
        this.groupService.leaveGroup(this.group_id).subscribe(
            resp => {
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.helperService.showSuccessToast(resp.message);
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
        this.group.leave_user_group_id = null;
    }

    onCreateGroup() {
        this.helperService.showLoader();
        this.groupService.createGroup(this.group.create_group_name, this.client_id).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    const data = {
                        id: resp.group.id,
                        group_name: resp.group.group_name,
                        client_name: resp.client_name
                    };
                    this.groups.unshift(data);
                    this.allGroups.unshift(data);
                    this.helperService.showSuccessToast(resp.message);
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                console.log(err);
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something went wrong. Try again later.');
            }
        );
        this.group.create_group_name = '';
        this.client_id = null;
    }
}
