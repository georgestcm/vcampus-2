import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersandgroupPage } from './usersandgroup.page';

describe('UsersandgroupPage', () => {
  let component: UsersandgroupPage;
  let fixture: ComponentFixture<UsersandgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersandgroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersandgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
