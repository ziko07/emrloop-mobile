import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: [ '../clients.component.scss', './add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  name:string = '';

  constructor() { }

  ngOnInit() {}

  onAddClient() {
    console.log("clicked!");
  }
}