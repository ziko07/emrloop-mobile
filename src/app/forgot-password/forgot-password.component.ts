import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../app.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = '';

  constructor(public authProvider: AuthService) { }

  ngOnInit() {}

  resetPassword() {
    this.authProvider.resetPassword(this.userEmail).subscribe (resp => {
      console.log(resp);
    },
    err => {
      console.log(err.statusText);
    })
  }
}
