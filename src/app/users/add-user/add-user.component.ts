import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../users.component.scss', './add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  email:string = '';
  client:string = '';
  admin:string = '';
  username:string = '';
  password:string = '';
  confirm_password:string = '';

  @Output() userCreated = new EventEmitter();

  onAddUser() {
    let user = {
      email: this.email,
      client: this.client,
      admin: this.admin,
      username: this.username,
      password: this.password,
      confirm_password: this.confirm_password
    }
    this.userCreated.emit(user);
  }

  constructor() { }

  ngOnInit() {}
}