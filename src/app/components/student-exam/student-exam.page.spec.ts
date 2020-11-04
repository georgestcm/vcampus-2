import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentExamPage } from './student-exam.page';

describe('StudentExamPage', () => {
  let component: StudentExamPage;
  let fixture: ComponentFixture<StudentExamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
