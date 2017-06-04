import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPicturesComponent } from './area-pictures.component';

describe('AreaPicturesComponent', () => {
  let component: AreaPicturesComponent;
  let fixture: ComponentFixture<AreaPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
