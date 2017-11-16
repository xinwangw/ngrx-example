import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongrxComponent } from './nongrx.component';

describe('NongrxComponent', () => {
  let component: NongrxComponent;
  let fixture: ComponentFixture<NongrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
