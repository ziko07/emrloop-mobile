import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  userDetails: any;
  errorLoginMessage: any;
  disableLogin = false;
  errorMessage: any;
  buttonText: any = 'Login';
  userProfile: any = null;
  toggle_password = false;
  constructor(private helperService: HelperService, public spinnerDialog: LoaderService) {
    this.form = {email: '', password: ''};
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
    let data = window.localStorage.getItem('credential');
    let credential = data ? JSON.parse(data) : {};
    this.form.password = credential.password;
    this.form.username = credential.username;
    if(credential.username) {
      this.form.save_password = true;
    }
  }


  signin() {
    if (this.validateRegister(this.form)) {
      this.disableLogin = true;
      this.buttonText = 'Login...';
      this.userDetails = {
        login: this.form.email,
        password: this.form.password
      };
      this.spinnerDialog.show('iNwe', 'Login...', false);
      console.log("OK");
      this.spinnerDialog.hide();
    }
    else {
      this.helperService.showToast(this.errorMessage);
    }
  }

  validateRegister(form) {
    if (this.form.username == undefined || this.form.username == '') {
      this.errorMessage = "Enter username or email";
      return false;
    }
    if (this.form.password == undefined || this.form.password == '') {
      this.errorMessage = "Enter password";
      return false;
    }
    return true;
  }

}
