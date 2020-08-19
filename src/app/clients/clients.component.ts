import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  clients = [
    {
      name: 'Kaizenloop',
      token: '82076687c5b4a96a32ba'
    },
    {
      name: 'Straightline',
      token: '678693491ae6eae418f4'
    }
  ]

  deleteClient(id) {
    if (confirm('Are you sure?')) {
      this.clients.splice(id,1);
      console.log(this.clients,id);
    }
  }
}
