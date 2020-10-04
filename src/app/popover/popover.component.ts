import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import { PopoverController } from '@ionic/angular';

import {LogoService} from '../../services/logo.service';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

    constructor(public helperService: HelperService,
                public logoService: LogoService,
                public popOverController: PopoverController,
                public router: Router) {
    }

    @Input() i;
    @Input() logoId;
    @Input() logos;
    public popover;

    ngOnInit() {
    }


    public showPopOver(ev, i, logoId): void {
        this.popover = this.popOverController.create({
            component: PopoverComponent,
            componentProps: {
                logos: this.logos,
                i,
                logoId
            },
            cssClass: 'popover-content',
            event: ev,
            translucent: true
        }).then((popOverData) => {
            popOverData.present();
        });
    }

    public dismissPopOver() {
        this.popOverController.dismiss();
    }

    onChangeRoute(logoId) {
        const optionsElement = document.querySelector('.options');
        optionsElement.classList.add('d-none');
        this.dismissPopOver();
        this.router.navigateByUrl('logos/' + logoId + '/edit');
    }

    deleteLogo(id, logoID) {
        this.dismissPopOver();
        if (confirm('Are you sure to delete this logo?')) {
            this.logos.splice(id, 1);
            this.helperService.showLoader();
            this.logoService.deleteLogo(logoID).subscribe(
                resp => {
                    console.log(resp);
                    this.helperService.dismissLoader();
                    if (resp.status === 'ok') {
                        this.helperService.showUpdateToast(resp.message);
                    } else {
                        this.helperService.showDangerToast(resp.message);
                    }
                }, err => {
                    console.log(err);
                    this.helperService.dismissLoader();
                    this.helperService.showDangerToast('Something went wrong. Try again later.');
                }
            );
            console.log(id, logoID);
        }
    }
}
