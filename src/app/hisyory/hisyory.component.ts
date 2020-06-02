import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {DetailsComponent} from '../details/details.component';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-hisyory',
    templateUrl: './hisyory.component.html',
    styleUrls: ['./hisyory.component.scss'],
})
export class HistoryComponent implements OnInit {
    list: any;

    constructor(public homeService: HomeService, public router: Router,
                public spinnerDialog: LoaderService, private helperService: HelperService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.loadTodo();
    }

    async openModal(index) {
        const modal = await this.modalController.create({
            component: DetailsComponent,
            componentProps: {
                list: this.list,
                slide: index,
                read : true
            }
        });
        return await modal.present();
    }

    public loadTodo() {
        this.spinnerDialog.show('', 'Loading ToDO...');
        this.homeService.all().subscribe(resp => {
            this.spinnerDialog.hide();
            this.list = resp;
            console.log(this.list);
        }, err => {
            this.spinnerDialog.hide();
            // this.helperService.showToast('Unable to load emails');
        });
    }

    public details(id) {
        this.router.navigateByUrl('message/' + id);
    }
}
