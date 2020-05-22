import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RSchoolPage } from './r-school.page';

describe('RSchoolPage', () => {
  let component: RSchoolPage;
  let fixture: ComponentFixture<RSchoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RSchoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RSchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
