import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceShowComponent } from './place-show.component';

describe('PlaceShowComponent', () => {
  let component: PlaceShowComponent;
  let fixture: ComponentFixture<PlaceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
