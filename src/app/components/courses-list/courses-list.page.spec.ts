import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursesListPage } from './courses-list.page';

describe('CoursesListPage', () => {
  let component: CoursesListPage;
  let fixture: ComponentFixture<CoursesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
