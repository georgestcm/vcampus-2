import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FillTheBlanksQuestionModalComponent } from './fill-the-blanks-question-modal.component';

describe('FillTheBlanksQuestionModalComponent', () => {
  let component: FillTheBlanksQuestionModalComponent;
  let fixture: ComponentFixture<FillTheBlanksQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillTheBlanksQuestionModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FillTheBlanksQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
