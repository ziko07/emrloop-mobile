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
    this.userService.getSingleUser(this.id).subscribe(
        resp => {
          console.log(resp);
          this.name = resp.name;
          this.email = resp.email;
        },
        err => {
          console.log(err);
        }
    );
  }
}
