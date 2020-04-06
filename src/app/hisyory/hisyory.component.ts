import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../services/helper.service';
import {LoaderService} from '../../services/loader.service';
import {HomeService} from '../../services/home.service';
import {DetailsComponent} from '../details/details.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hisyory',
  templateUrl: './hisyory.component.html',
  styleUrls: ['./hisyory.component.scss'],
})
export class HistoryComponent implements OnInit {
  list ;
  constructor(public homeService: HomeService, public router: Router
              , public spinnerDialog: LoaderService, private helperService: HelperService) { }

  ngOnInit() {
    this.loadTodo();
  }

  public loadTodo() {
    this.spinnerDialog.show('', 'Loading email...');
    this.homeService.all().subscribe(resp => {
      this.spinnerDialog.hide();
      this.list = resp;
    }, err => {
      this.spinnerDialog.hide();
      this.helperService.showToast('Unable to load emails');
    });
  }

  public details(id) {
    this.router.navigateByUrl('message/' + id);
  }
}
