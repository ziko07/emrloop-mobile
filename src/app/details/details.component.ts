import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    @ViewChild('tabSlider', {static: false}) slider: any;
    readySlider = false;
    task = {
        id: '',
        sender_name: '',
        recipient_name: '',
        content: '',
        created_at: '',
        title: '',
        attachment: {url: ''},
        receipt_type: '',
        content_type: '',
        remaining_minute: '',
        total_minute: '',
        client_id: '',
        status: ''
    };
    @Input() list: any;
    @Input() slide: any;
    activeItem: any;
    current_slider = 0;
    slideOpts = {
        speed: 300,
        loop: false,
        initialSlide: this.slide
    };

    constructor(private modalController: ModalController, public homeService: HomeService, public router: ActivatedRoute, public spinnerDialog: LoaderService, private helperService: HelperService) {
    }

    ngOnInit() {
        // let message_id = this.router.snapshot.paramMap.get('message_id');
        this.loadItem();
    }

    public loadItem() {
        // this.spinnerDialog.show('', 'Loading email...');
        // this.homeService.task(message_id).subscribe(resp => {
        //   this.spinnerDialog.hide();
        //   this.task = resp;
        //   console.log(this.task.attachment.url);
        // }, err => {
        //   this.spinnerDialog.hide();
        //   this.helperService.showToast('Unable to load emails');
        // });
    }

    closeModal() {
        this.modalController.dismiss();
    }

    public slideNewTab(event) {
        this.slider.getActiveIndex().then(index => {
            this.current_slider = index;
            this.activeItem = this.list[this.current_slider];
        });
    }

    ionViewDidEnter() {
        this.slider.slideTo(this.slide);
        this.current_slider = this.slide;
        this.slider.update();
        this.activeItem = this.list[this.current_slider];
        setTimeout(() => {
            this.readySlider = true;
        }, 100);
    }
}
