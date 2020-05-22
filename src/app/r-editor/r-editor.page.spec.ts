import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { REditorPage } from './r-editor.page';

describe('REditorPage', () => {
  let component: REditorPage;
  let fixture: ComponentFixture<REditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ REditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(REditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
