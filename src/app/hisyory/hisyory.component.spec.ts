import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HisyoryComponent } from './hisyory.component';

describe('HisyoryComponent', () => {
  let component: HisyoryComponent;
  let fixture: ComponentFixture<HisyoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisyoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HisyoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
