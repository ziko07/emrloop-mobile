import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {QuizComponent} from '../quiz/quiz.component';

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
    @Input() read: any;
    activeItem: any;
    current_slider = 0;
    slideOpts = {
        speed: 300,
        loop: false,
        initialSlide: this.slide
    };

    constructor(
        private modalController: ModalController,
        public homeService: HomeService,
        public router: ActivatedRoute,
        public spinnerDialog: LoaderService,
        private helperService: HelperService) {
    }

    ngOnInit() {
        console.log(this.list);
    }


    closeModal() {
        this.modalController.dismiss(true);
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

    sentAcknowledgement(id) {
        this.spinnerDialog.show('', 'Sending Acknowledgement');
        this.homeService.acknowledgementSent(id, {}).subscribe(resp => {
            this.spinnerDialog.hide();
            this.helperService.showSuccessToast('Acknowledgement Successfully Received');
        }, err => {
            this.spinnerDialog.hide();
            // this.helperService.showToast('Unable to load emails');
        });
    }

    async openQuizeModal(item_id) {
        const modal = await this.modalController.create({
            component: QuizComponent,
            componentProps: {
                id: item_id
            }
        });
        return await modal.present();
    }
}
