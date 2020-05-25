import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamListPage } from './exam-list.page';

describe('ExamListPage', () => {
  let component: ExamListPage;
  let fixture: ComponentFixture<ExamListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
