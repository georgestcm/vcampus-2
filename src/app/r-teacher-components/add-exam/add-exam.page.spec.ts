import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExamPage } from './add-exam.page';

describe('AddExamPage', () => {
  let component: AddExamPage;
  let fixture: ComponentFixture<AddExamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
