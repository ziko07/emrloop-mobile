import { Component, OnInit, Input } from '@angular/core';
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
  imageType = ['png', 'jpeg', 'gif', 'jpg', ''];
  task = {id: '',
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
  } ;
  @Input() list = '';
  constructor(private modalController: ModalController, public homeService: HomeService, public router: ActivatedRoute, public spinnerDialog: LoaderService, private helperService: HelperService) { }

  ngOnInit() {
   // let message_id = this.router.snapshot.paramMap.get('message_id');
    this.loadItem();
  }

  public loadItem() {
   console.log(this.list);
    this.spinnerDialog.show('', 'Loading email...');
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


  public check_attachment_type(file) {
    let file_url = file.split('?')[0];
    let ext = file_url.split('.').pop();
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.log(ext);
    console.log(this.imageType.includes(ext));
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    if (this.imageType.includes(ext)) {
      return "<img src='" + file + "'/>";
    } else if (file.startsWith('!')) {
      return'test2';
    }
  }

}
