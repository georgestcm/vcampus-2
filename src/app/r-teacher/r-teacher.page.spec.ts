import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RTeacherPage } from './r-teacher.page';

describe('RTeacherPage', () => {
  let component: RTeacherPage;
  let fixture: ComponentFixture<RTeacherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTeacherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
