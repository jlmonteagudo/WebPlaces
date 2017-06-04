import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasListComponent } from './areas-list.component';

describe('AreasListComponent', () => {
  let component: AreasListComponent;
  let fixture: ComponentFixture<AreasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
