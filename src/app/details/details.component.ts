import { Component, OnInit, Input } from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  task ;
  constructor(public homeService: HomeService, public router: ActivatedRoute, public spinnerDialog: LoaderService, private helperService: HelperService) { }

  ngOnInit() {
   let message_id = this.router.snapshot.paramMap.get('message_id');
    this.loadItem(message_id);
  }

  public loadItem(message_id) {
    this.spinnerDialog.show('', 'Loading email...');
    this.homeService.task(message_id).subscribe(resp => {
      this.spinnerDialog.hide();
      this.task = resp;
      console.log(this.task);
    }, err => {
      this.spinnerDialog.hide();
      this.helperService.showToast('Unable to load emails');
    });
  }

}
