import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCourseViewPage } from './student-course-view.page';

describe('StudentCourseViewPage', () => {
  let component: StudentCourseViewPage;
  let fixture: ComponentFixture<StudentCourseViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
