import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController, IonRouterOutlet, Platform} from '@ionic/angular';

import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {AuthService} from '../../services/auth.service';
import {MessageService} from '../../services/message.service';

import {DetailsComponent} from '../details/details.component';

import {Plugins} from '@capacitor/core';

const {App} = Plugins;

@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.page.html',
    styleUrls: ['inbox.page.scss'],
})
export class InboxPage {
    list = [];
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
        this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.routerOutlet.canGoBack()) {
                App.exitApp();
            }
        });
    }

    ngOnInit() {
        this.onReceiveMessage();
        this.loadInbox();
        this.getUserType();
    }

    onReceiveMessage(): void {
        this.messageService.getMessage().subscribe(
            resp => {
                this.list.push(resp.message.message);
                console.log(resp.message.message);
            }, err => {
                console.log(err);
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

    public loadInbox() {
        this.spinnerDialog.show('', 'Loading inbox...');
        this.homeService.list().subscribe(resp => {
            this.spinnerDialog.hide();
            this.list = resp;
            console.log(resp);
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
