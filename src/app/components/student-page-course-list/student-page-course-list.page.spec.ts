import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentPageCourseListPage } from './student-page-course-list.page';

describe('StudentPageCourseListPage', () => {
  let component: StudentPageCourseListPage;
  let fixture: ComponentFixture<StudentPageCourseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPageCourseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPageCourseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
