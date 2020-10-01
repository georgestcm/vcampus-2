import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateCourseCodePage } from './generate-course-code.page';

describe('GenerateCourseCodePage', () => {
  let component: GenerateCourseCodePage;
  let fixture: ComponentFixture<GenerateCourseCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCourseCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateCourseCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
