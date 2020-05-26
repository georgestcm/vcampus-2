import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExamModelPage } from './add-exam-model.page';

describe('AddExamModelPage', () => {
  let component: AddExamModelPage;
  let fixture: ComponentFixture<AddExamModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExamModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
