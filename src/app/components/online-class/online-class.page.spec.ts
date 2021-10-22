import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineClassPage } from './online-class.page';

describe('OnlineClassPage', () => {
  let component: OnlineClassPage;
  let fixture: ComponentFixture<OnlineClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
