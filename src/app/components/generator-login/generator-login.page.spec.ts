import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneratorLoginPage } from './generator-login.page';

describe('GeneratorLoginPage', () => {
  let component: GeneratorLoginPage;
  let fixture: ComponentFixture<GeneratorLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
