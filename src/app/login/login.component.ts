import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {AuthService} from '../../services/auth.service';

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
  constructor(private router: Router, private helperService: HelperService,
              public spinnerDialog: LoaderService, public authProvider: AuthService) {
    this.form = {email: '', password: ''};
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
    let data = window.localStorage.getItem('credential');
    let credential = data ? JSON.parse(data) : {};
    this.form.password = credential.password;
    this.form.email = credential.email;
    if(credential.email) {
      this.form.save_password = true;
    }
  }


  signin() {
    if (this.validateRegister(this.form)) {
      this.disableLogin = true;
      this.buttonText = 'Login...';
      this.userDetails = {
        email: this.form.email,
        password: this.form.password
      };
      this.spinnerDialog.show('iNwe', 'Login...', false);
      this.authProvider.login(this.userDetails).subscribe(resp => {
        this.spinnerDialog.hide();
        console.log('<<<<<<<<<<<<');
        console.log(resp);
        console.log(resp.headers);
        console.log(resp.headers.get('access-token'));
        console.log(resp.headers.get('uid'));
        console.log(resp.headers);
        console.log(resp.headers.get('Transfer-Encoding'));
        // console.log(resp.headers._headersMap);
        console.log('<<<<<<<<<<<<');
        // window.localStorage.setItem('auth', JSON.stringify(resp.auth));
        this.router.navigateByUrl('/');
      });
    }
    else {
      this.helperService.showToast(this.errorMessage);
    }
  }

  validateRegister(form) {
    if (this.form.email == undefined || this.form.email == '') {
      this.errorMessage = "Enter email";
      return false;
    }
    if (this.form.password == undefined || this.form.password == '') {
      this.errorMessage = "Enter password";
      return false;
    }
    return true;
  }

}
