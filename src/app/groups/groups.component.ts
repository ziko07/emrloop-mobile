import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  groupList = [
    {
      groupName: 'FirstUserGroup',
      clientName: 'Kaizenloop'
    },
    {
      groupName: 'Calyx',
      clientName: ''
    },
    {
      groupName: 'AdminGroup',
      clientName: 'Kaizenloop'
    },
    {
      groupName: 'Test Group 1',
      clientName: 'Kaizenloop'
    },
    {
      groupName: 'Straightline Admins',
      clientName: 'Straightline'
    },
    {
      groupName: 'Allstate Full Group',
      clientName: 'Straightline'
    }
  ]
}