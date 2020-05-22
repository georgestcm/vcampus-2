import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchoolRegisterPage } from './school-register.page';

describe('SchoolRegisterPage', () => {
  let component: SchoolRegisterPage;
  let fixture: ComponentFixture<SchoolRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
