import { Component, OnInit } from '@angular/core';

import {GroupService} from '../../services/group.service';

import {Message} from '../../models/message.model';

@Component({
  selector: 'app-new-loop',
  templateUrl: './new-loop.component.html',
  styleUrls: ['./new-loop.component.scss'],
})
export class NewLoopComponent implements OnInit {
  groups = [];
  message = new Message();

  constructor(public groupService: GroupService) { }

  ngOnInit() {
    this.onGetAllGroups();
  }

  onGetAllGroups(): void {
    this.groupService.getAllInfo().subscribe(
        resp => {
          this.groups = resp[0].groups;
          console.log(this.groups)
        }
    );
  }
}
