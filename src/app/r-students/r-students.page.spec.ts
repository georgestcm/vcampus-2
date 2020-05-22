import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RStudentsPage } from './r-students.page';

describe('RStudentsPage', () => {
  let component: RStudentsPage;
  let fixture: ComponentFixture<RStudentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RStudentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
