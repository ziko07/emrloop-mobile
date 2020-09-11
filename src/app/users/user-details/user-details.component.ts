import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  users = [];

  id: any;
  name: string;
  email: string;

  constructor(private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSingleUserInfo();
  }

  getSingleUserInfo() {
    this.userService.getUsers().subscribe(
        resp => {
          this.users = resp;
          for (const user of this.users) {
            if (user.id == this.id) {
              this.name = user.name;
              this.email = user.email;
              break;
            }
          }
        },
        err => {
          console.log(err);
        }
    );
  }
}
