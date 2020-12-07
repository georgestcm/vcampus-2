import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrueFalseQuestionModalComponent } from './true-false-question-modal.component';

describe('TrueFalseQuestionModalComponent', () => {
  let component: TrueFalseQuestionModalComponent;
  let fixture: ComponentFixture<TrueFalseQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueFalseQuestionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
