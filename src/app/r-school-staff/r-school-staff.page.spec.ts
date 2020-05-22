import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RSchoolStaffPage } from './r-school-staff.page';

describe('RSchoolStaffPage', () => {
  let component: RSchoolStaffPage;
  let fixture: ComponentFixture<RSchoolStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RSchoolStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RSchoolStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
