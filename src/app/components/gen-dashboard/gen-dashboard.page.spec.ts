import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenDashboardPage } from './gen-dashboard.page';

describe('GenDashboardPage', () => {
  let component: GenDashboardPage;
  let fixture: ComponentFixture<GenDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
