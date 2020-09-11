import { Component, OnInit } from '@angular/core';
import { Logo } from '../../../models/logo.model';
import { ClientService } from '../../../services/client.service';
import { LogoService } from '../../../services/logo.service';

@Component({
  selector: 'app-add-logo',
  templateUrl: './add-logo.component.html',
  styleUrls: ['../logos.component.scss', './add-logo.component.scss'],
})
export class AddLogoComponent implements OnInit {
  logo = new Logo();
  clients = [];
  logoDetails: any;

  constructor(public clientService: ClientService, public logoService: LogoService) { }

  ngOnInit() {
    this.getAllClients();
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

  onCreateLogo() {
      this.logoDetails = {
          client_id: this.logo.client_id,
          image_location: this.logo.image_location,
          image_type: this.logo.image_type
      };
      console.log(this.logoDetails);
      this.logoService.createLogo(this.logoDetails).subscribe (
          resp => {
              console.log(resp);
          }, err => {
              console.log(err);
          }
      );
  }
}
