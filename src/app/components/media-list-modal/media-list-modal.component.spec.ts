import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaListModalComponent } from './media-list-modal.component';

describe('MediaListModalComponent', () => {
  let component: MediaListModalComponent;
  let fixture: ComponentFixture<MediaListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaListModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
