import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceNewComponent } from './place-new.component';

describe('PlaceNewComponent', () => {
  let component: PlaceNewComponent;
  let fixture: ComponentFixture<PlaceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
