import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @Input() id: any;
  item: any;
  form: any;
  constructor(private modalController: ModalController, public homeService: HomeService, public router: ActivatedRoute,
              public spinnerDialog: LoaderService,
              private helperService: HelperService) {
    this.form = {answer: 'a'};
  }

  ngOnInit() {
    this.loadDelivery(this.id);
  }

  loadDelivery(id) {
    this.spinnerDialog.show('', 'Loading quiz');
    this.homeService.task(id).subscribe(resp => {
      this.spinnerDialog.hide();
      this.item = resp;
      this.form.answer = this.item.status.correct;
      console.log(resp);
      this.helperService.showSuccessToast('Acknowledgement Successfully Received');
    }, err => {
      this.spinnerDialog.hide();
      this.helperService.showDangerToast('error');
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  logForm() {
    console.log(this.form);
    this.spinnerDialog.show('', 'Sending Acknowledgement');
    this.homeService.acknowledgementSent(this.id, {answer: this.form.answer}).subscribe(resp => {
      this.spinnerDialog.hide();
      this.modalController.dismiss(true);
      this.helperService.showSuccessToast('Acknowledgement Successfully Received');
    }, err => {
      this.spinnerDialog.hide();
      // this.helperService.showToast('Unable to load emails');
    });
  }
}
