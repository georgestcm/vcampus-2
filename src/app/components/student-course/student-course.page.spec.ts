import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCoursePage } from './student-course.page';

describe('StudentCoursePage', () => {
  let component: StudentCoursePage;
  let fixture: ComponentFixture<StudentCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
