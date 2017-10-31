import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRefreshComponent } from './list-refresh.component';

describe('ListRefreshComponent', () => {
  let component: ListRefreshComponent;
  let fixture: ComponentFixture<ListRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
