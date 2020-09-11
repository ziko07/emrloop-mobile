import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ChangeUserTypeComponent } from './change-user-type/change-user-type.component';

import { UserService } from '../../services/user.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor(
      private modalController: ModalController,
      public userService: UserService,
      public helperService: HelperService) {
  }

  users = [];

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
        resp => {
          console.log('User list');
          this.users = resp;
          console.log(resp);
        },
        err => {
          console.log(err);
          console.log('err');
        }
    );
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: ChangeUserTypeComponent
    });
    return await modal.present();
  }

  onDeleteUser(id, email) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(email).subscribe(
          resp => {
            console.log('Resp');
            console.log(resp);
            console.log(this.users, id);
            this.helperService.showSuccessToast(resp.message);
          },
          err => {
            console.log('Err');
            console.log(err);
            console.log(this.users, id);
            this.helperService.showDangerToast(err.message);
          }
      );
      this.users.splice(id, 1);
    }
  }
}
