import {Component, OnInit} from '@angular/core';

import {GroupService} from '../../services/group.service';
import {HelperService} from '../../services/helper.service';
import {UserService} from '../../services/user.service';

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
                public userService: UserService) {
    }

    groups = [];
    group = new Group();
    group_name: string;

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
        this.loadData(event);
        this.getInfo();
        this.getGroup();
    }

    getGroup() {
        this.groupService.getGroup().subscribe(
            resp => {
                this.groups.push(resp);
            }, err => {}
        );
    }

    getAllGroups() {
        this.groupService.getGroups(this.page).subscribe(
            resp => {
                if (resp.groups.length < 1) {
                    this.checked = true;
                    this.helperService.showUpdateToast('All data successfully loaded!');
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
                this.clients = resp[0].clients;
                this.emails = resp[0].emails;
                this.helperService.dismissLoader();
            },
            err => {
                this.helperService.dismissLoader();
            }
        );
    }

    onJoinGroup() {
        this.helperService.showLoader();
        this.group_name = this.group.join_group_name;
        console.log(this.group_name);
        this.groupService.joinGroup(this.group_name).subscribe(
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
        this.group.join_group_name = '';
    }

    onAddUserToGroup() {
        this.helperService.showLoader();
        this.group_name = this.group.add_user_group_name;
        this.email_name = this.email.email;
        console.log(this.group_name, this.email_name);
        this.groupService.addUserToGroup(this.group_name, this.email_name).subscribe(
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
    }

    onLeaveGroup() {
        this.helperService.showLoader();
        this.group_name = this.group.leave_user_group_name;
        console.log(this.group_name);
        this.groupService.leaveGroup(this.group_name).subscribe(
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
        this.group.leave_user_group_name = '';
    }

    onCreateGroup() {
        this.helperService.showLoader();
        this.groupService.createGroup(this.group.create_group_name, this.client_id).subscribe(
            resp => {
                console.log(resp);
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.group = resp.group;
                    this.group.client_name = resp.client_name;
                    this.groupService.listGroup(this.group);
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
    }
}
