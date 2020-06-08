import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminMessagePage } from './admin-message.page'

describe('AdminMessagePage', () => {
  let component: AdminMessagePage;
  let fixture: ComponentFixture<AdminMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
