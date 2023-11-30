import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, IonRouterOutlet, Platform } from '@ionic/angular';

import { HelperService } from '../../services/helper.service';
import { LoaderService } from '../../services/loader.service';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

import { DetailsComponent } from '../details/details.component';

@Component({
    selector: 'app-inbox',
    templateUrl: 'inbox.page.html',
    styleUrls: ['inbox.page.scss'],
})
export class InboxPage {
    list: any;
    filteredItems: any;
    type: string;
    selectedSegment = 'read';
    fileType: string | null;
    videoFileTypes = ['mov', 'mp4', 'avi', 'wmv', 'flv', 'egp'];
    documentFileTypes = ['jpeg', 'pdf', 'png', 'pptx'];

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
        // this.loadInbox('init');
        this.readInbox();
        this.getUserType();
        // this.doRefresh(event);
    }


    doRefresh(event): void {
        setTimeout(() => {
            this.segmentChanged();
            event.target.complete();
        }, 2000);
    }

    segmentChanged() {
        if (this.selectedSegment === 'unread') {
            this.unreadInbox();
        } else if (this.selectedSegment === 'read') {
            this.readInbox();
        }
    }

    downloadAttachment(url: string, attachmentType: string) {
        if (url && attachmentType) {
          const downloadUrl = `${url}`;
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.target = '_blank'; 
          link.download = `attachment.${attachmentType.toLowerCase()}`;
          link.click();
        }
      }

    onReceiveMessage(): void {
        this.messageService.getMessage().subscribe(
            resp => {
                this.list.unshift(resp);
                // this.segmentChanged()
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

    // public loadInbox(action) {
    //     if (action === 'init') {
    //         this.spinnerDialog.show('', 'Loading inbox...');
    //         this.homeService.list().subscribe(resp => {
    //             this.spinnerDialog.hide();
    //             this.list = resp;
    //             console.log(resp);
    //             // for (let l of this.list)
    //             //  console.log(l, this.list.l);
    //         }, err => {
    //             this.spinnerDialog.hide();
    //             this.helperService.showDangerToast('Unable to load inbox');
    //         });
    //     } else {
    //         this.homeService.list().subscribe(resp => {
    //             this.list = resp;
    //         });
    //     }
    // }

    public unreadInbox() {
        this.spinnerDialog.show('', 'Loading inbox...');
        this.homeService.list().subscribe(resp => {
            this.list = [];
            this.list = resp;
            this.spinnerDialog.hide();

        }, err => {
            this.spinnerDialog.hide();
            this.helperService.showDangerToast('Unable to load inbox');
        });
    }

    public readInbox() {
        this.spinnerDialog.show('', 'Loading inbox...');
        this.homeService.all().subscribe(resp => {
            this.list = [];
            this.list = resp;
        }, err => {
            this.spinnerDialog.hide();
            this.helperService.showDangerToast('Unable to load inbox');
        });
        this.spinnerDialog.hide();
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
