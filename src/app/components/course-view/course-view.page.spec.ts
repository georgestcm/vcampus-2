import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CourseViewPage } from './course-view.page';

describe('CourseViewPage', () => {
  let component: CourseViewPage;
  let fixture: ComponentFixture<CourseViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
