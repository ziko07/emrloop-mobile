import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {GroupService} from '../../services/group.service';
import {MessageService} from '../../services/message.service';
import {HelperService} from '../../services/helper.service';

import {Message} from '../../models/message.model';

@Component({
  selector: 'app-new-loop',
  templateUrl: './new-loop.component.html',
  styleUrls: ['./new-loop.component.scss'],
})
export class NewLoopComponent implements OnInit {
  groups = [];
  message = new Message();

  constructor(public router: Router,
              public groupService: GroupService,
              public messageService: MessageService,
              public helperService: HelperService) { }

  ngOnInit() {
    this.onGetAllGroups();
  }

  onGetAllGroups(): void {
    this.groupService.getAllInfo().subscribe(
        resp => {
          this.groups = resp[0].groups;
          console.log(this.groups);
        }
    );
  }

  loadImageFromDevice(e): void {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.message.attachment = reader.result;
    };
  }

  onLaunchLoop(): void {
    console.log(this.message);
    this.helperService.showLoader();
    this.messageService.createNewLoop(this.message).subscribe(
        resp => {
          this.helperService.dismissLoader();
          console.log(resp);
          if (resp.status === 'ok') {
            this.helperService.showSuccessToast(resp.message);
            this.router.navigateByUrl('/inbox');
          } else {
            this.helperService.showDangerToast(resp.message);
          }
        }, err => {
          this.helperService.dismissLoader();
          this.helperService.showDangerToast('Something is wrong. Please try again later.');
          console.log(err);
        }
    );
    this.message.title = '';
    this.message.content = '';
  }
}
