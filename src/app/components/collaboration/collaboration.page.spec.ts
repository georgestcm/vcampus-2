import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollaborationPage } from './collaboration.page';

describe('CollaborationPage', () => {
  let component: CollaborationPage;
  let fixture: ComponentFixture<CollaborationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaborationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
