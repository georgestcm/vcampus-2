import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeGeneratorListsPage } from './code-generator-lists.page';

describe('CodeGeneratorListsPage', () => {
  let component: CodeGeneratorListsPage;
  let fixture: ComponentFixture<CodeGeneratorListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeGeneratorListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeGeneratorListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
