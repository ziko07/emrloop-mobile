import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {GroupService} from '../../services/group.service';
import {MessageService} from '../../services/message.service';
import {HelperService} from '../../services/helper.service';

import {Message} from '../../models/message.model';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['../new-loop/new-loop.component.scss'],
})
export class NewMessageComponent implements OnInit {
  message = new Message();

  constructor(public router: Router,
              public groupService: GroupService,
              public messageService: MessageService,
              public helperService: HelperService) { }

  ngOnInit() {}
  onSendMessage2() {
    console.log('gdgdgdgd', this.message);
  }
  onSendMessage() {
    this.helperService.showLoader();
    this.messageService.sendMessage(this.message).subscribe(
        resp => {
          console.log('Resp');
          this.helperService.dismissLoader();
          if (resp.status === 'ok') {
            this.helperService.showSuccessToast(resp.message);
            this.router.navigateByUrl('/inbox');
          } else {
            this.helperService.showDangerToast(resp.message);
          }
          console.log(resp);
        }, err => {
          console.log('Err');
          this.helperService.dismissLoader();
          this.helperService.showDangerToast('Something is wrong. Please try again later.');
        }
    );
    this.message.recipient = '';
    this.message.title = '';
    this.message.content = '';
  }
}
