import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ClientService } from '../../../services/client.service';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../users.component.scss', './add-user.component.scss'],
})

export class AddUserComponent implements OnInit {
  user = new User();
  clients = [];
  userDetails: any;

  constructor(public userService: UserService, public clientService: ClientService, public helperService: HelperService) { }

  onAddUser() {
      this.userDetails = {
          email: this.user.email,
          client_id: this.user.client_id,
          type: this.user.type,
          username: this.user.username,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
          test_user: this.user.test_user
      };
      this.userService.addUser(this.userDetails).subscribe(
        resp => {
            this.helperService.showSuccessToast(resp.message);
            console.log('Resp');
            console.log(resp);
            console.log(this.userDetails);
        }, err => {
          this.helperService.showDangerToast(err.message);
          console.log('Err');
          console.log(err);
          console.log(this.userDetails);
        }
    );
  }

  getAllClients() {
      this.clientService.getClients().subscribe(
          resp => {
                this.clients = resp;
                console.log('Client list on Add user page');
                console.log(resp);
            },
            err => {
                console.log(err);
            }
        );
    }

  ngOnInit() {
      this.getAllClients();
  }
}
