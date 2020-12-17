import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTrueQuestionModalComponent } from './all-true-question-modal.component';

describe('AllTrueQuestionModalComponent', () => {
  let component: AllTrueQuestionModalComponent;
  let fixture: ComponentFixture<AllTrueQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTrueQuestionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTrueQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
