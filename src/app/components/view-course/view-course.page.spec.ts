import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCoursePage } from './view-course.page';

describe('ViewCoursePage', () => {
  let component: ViewCoursePage;
  let fixture: ComponentFixture<ViewCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
