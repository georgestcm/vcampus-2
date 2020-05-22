import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherListPage } from './teacher-list.page';

describe('TeacherListPage', () => {
  let component: TeacherListPage;
  let fixture: ComponentFixture<TeacherListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
