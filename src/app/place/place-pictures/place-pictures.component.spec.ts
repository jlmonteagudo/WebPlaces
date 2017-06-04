import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePicturesComponent } from './place-pictures.component';

describe('PlacePicturesComponent', () => {
  let component: PlacePicturesComponent;
  let fixture: ComponentFixture<PlacePicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
