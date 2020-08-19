import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeUserTypeComponent } from './change-user-type/change-user-type.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor(private modalController: ModalController) { 
  }

  ngOnInit() {}

  async showModal() {
    const modal = await this.modalController.create({
      component: ChangeUserTypeComponent
    });
    return await modal.present();
  }

  users = [
    {
      id: 0,
      userType: 'Admin',
      profile: 'Stephen Tokarz',
      email: 'stokarz@kaizenloop.com',
      groupNumbers: 1
    },
    {
      id: 1,
      userType: 'PowerUser',
      profile: 'Josh Shuck',
      email: 'jshuck@straightlineglobal.com',
      groupNumbers: 0
    },
    {
      id: 2,
      userType: 'Admin',
      profile: 'Varun Kaushal',
      email: 'vkaushal@admin.com',
      groupNumbers: 0
    },
    {
      id: 3,
      userType: 'User',
      profile: 'Varun Kaushal',
      email: 'vkaushal@kaizenloop.com',
      groupNumbers: 1
    }
  ]

  deleteUser(id) {
    if (confirm('Are you sure?')) {
      this.users.splice(id,1);
      console.log(this.users,id);
    }
  }
}