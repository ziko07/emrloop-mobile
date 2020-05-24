import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {DetailsComponent} from '../details/details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   list ;
  constructor(private modalController: ModalController, public homeService: HomeService,  public router: Router, public spinnerDialog: LoaderService, private helperService: HelperService) {}

  ngOnInit() {
     this.loadTodo();
  }

  public loadTodo() {
    this.spinnerDialog.show('', 'Loading email...');
    this.homeService.list().subscribe(resp => {
      this.spinnerDialog.hide();
      this.list = resp;
    }, err => {
      this.spinnerDialog.hide();
      this.helperService.showToast('Unable to load emails');
    });
  }

  public details(id) {
      this.router.navigateByUrl('message/' + id);
  }

  async openModal(index) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        list: this.list,
        slide: index
      }
    });
    return await modal.present();
  }

}
