import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.getUsersName();
  }

  getUsersName() {
    this.authService.getCurrentUser().subscribe(
        resp => {
          this.name = resp.profile.name;
          console.log(resp);
        }, err => {
          console.log(err);
        }
    );
  }

}
