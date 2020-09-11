import { Component, OnInit } from '@angular/core';
import  { LogoService } from '../../services/logo.service';
import { HelperService } from '../../services/helper.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss'],
})
export class LogosComponent implements OnInit {

  constructor(
      public logoService: LogoService,
      public helperService: HelperService,
      public clientService: ClientService) {
  }

  logos = [];
  clients = [];

  ngOnInit() {
    this.getAllLogos();
    this.getAllClients();
  }

  getAllLogos() {
    this.logoService.getLogos().subscribe(
        resp => {
          console.log(resp);
        }, err => {
          console.log(err);
        }
    );
  }

  getAllClients() {
    this.clientService.getClients().subscribe(
        resp => {
          this.clients = resp;
          console.log('Client list');
          console.log(resp);
        },
        err => {
          console.log(err);
        }
    );
  }

  deleteLogo(id) {
    if (confirm('Are you sure?')) {
      this.logos.splice(id, 1);
      console.log(this.logos, id);
    }
  }
}
