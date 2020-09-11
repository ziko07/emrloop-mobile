import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { LoaderService } from '../../services/loader.service';
import { HomeService } from '../../services/home.service';
import { DetailsComponent } from '../details/details.component';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  list: any;

  constructor(
    private modalController: ModalController, 
    public homeService: HomeService,  
    public router: Router, 
    public spinnerDialog: LoaderService, 
    private helperService: HelperService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
  }

  ngOnInit() {
     this.loadInbox();
  }

  public loadInbox() {
    this.spinnerDialog.show('', 'Loading inbox...');
    this.homeService.list().subscribe(resp => {
      this.spinnerDialog.hide();
      this.list = resp;
    }, err => {
      this.spinnerDialog.hide();
      this.helperService.showDangerToast('Unable to load inbox');
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
        slide: index,
        read: false
      }
    });
    return await modal.present();
  }
}
