import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController, IonRouterOutlet, Platform} from '@ionic/angular';

import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {AuthService} from '../../services/auth.service';
import {MessageService} from '../../services/message.service';

import {DetailsComponent} from '../details/details.component';

@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.page.html',
    styleUrls: ['inbox.page.scss'],
})
export class InboxPage {
    list: any;
    type: string;

    constructor(
        private modalController: ModalController,
        public homeService: HomeService,
        public messageService: MessageService,
        public router: Router,
        public spinnerDialog: LoaderService,
        private helperService: HelperService,
        public authService: AuthService,
        private platform: Platform,
        private routerOutlet: IonRouterOutlet
    ) {
    }

    ngOnInit() {
        this.onReceiveMessage();
        this.loadInbox('init');
        this.getUserType();
        this.doRefresh(event);
    }

    doRefresh(event): void {
        setTimeout(() => {
            this.loadInbox('refresh');
            event.target.complete();
        }, 2000);
    }

    onReceiveMessage(): void {
        this.messageService.getMessage().subscribe(
            resp => {
                this.list.unshift(resp);
            }
        );
    }

    getUserType(): void {
        this.authService.getUserType().subscribe(
            resp => {
                this.type = resp.user_type;
                console.log(this.type);
            }
        );
    }

    public loadInbox(action) {
        if (action === 'init') {
            this.spinnerDialog.show('', 'Loading inbox...');
            this.homeService.list().subscribe(resp => {
                this.spinnerDialog.hide();
                this.list = resp;
                console.log(resp);
                // for (let l of this.list)
                //  console.log(l, this.list.l);
            }, err => {
                this.spinnerDialog.hide();
                this.helperService.showDangerToast('Unable to load inbox');
            });
        } else {
            this.homeService.list().subscribe(resp => {
                this.list = resp;
            });
        }
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
