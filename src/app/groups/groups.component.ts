import {Component, OnInit} from '@angular/core';

import {GroupService} from '../../services/group.service';
import {HelperService} from '../../services/helper.service';

import {Group} from '../../models/group.model';
import {Email} from '../../models/email.model';
import {Client} from '../../models/client.model';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

    constructor(public groupService: GroupService, public helperService: HelperService) {
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

    ngOnInit() {
        this.getInfo();
    }

    getInfo() {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.groups = resp[0].groups;
                this.clients = resp[0].clients;
                this.emails = resp[0].emails;
                console.log(this.groups);
                console.log(resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    onJoinGroup() {
        this.group_name = this.group.group_name;
        console.log(this.group_name);
        this.groupService.joinGroup(this.group_name).subscribe(
            resp => {
                this.helperService.showSuccessToast(resp.message);
            }, err => {
                this.helperService.showDangerToast(err.message);
            }
        );
        this.group.group_name = '';
    }

    onAddUserToGroup() {
        this.group_name = this.group.group_name;
        this.email_name = this.email.email;
        console.log(this.group_name, this.email_name);
        this.groupService.addUserToGroup(this.group_name, this.email_name).subscribe(
            resp => {
                this.helperService.showSuccessToast(resp.message);
            }, err => {
                this.helperService.showDangerToast(err.message);
            }
        );
    }

    onLeaveGroup() {
        this.group_name = this.group.group_name;
        console.log(this.group_name);
        this.groupService.leaveGroup(this.group_name).subscribe(
            resp => {
                console.log(resp);
                this.helperService.showSuccessToast(resp.message);
            }, err => {
                this.helperService.showDangerToast(err.message);
            }
        );
        this.group.group_name = '';
    }

    onCreateGroup() {
        this.group_name = this.group.group_name;
        this.client_id = this.client.id;
        console.log(this.group_name, this.client_id);
        this.groupService.createGroup(this.group_name, this.client_id).subscribe(
            resp => {
                console.log(resp);
                this.helperService.showSuccessToast(resp.message);
            }, err => {
                console.log(err);
                this.helperService.showDangerToast(err.message);
            }
        );
        this.group.group_name = '';
    }
}
