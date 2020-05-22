import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSchoolStaffPage } from './add-school-staff.page';

describe('AddSchoolStaffPage', () => {
  let component: AddSchoolStaffPage;
  let fixture: ComponentFixture<AddSchoolStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchoolStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSchoolStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
