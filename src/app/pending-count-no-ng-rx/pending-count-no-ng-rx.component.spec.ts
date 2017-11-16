import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCountNoNgRxComponent } from './pending-count-no-ng-rx.component';

describe('PendingCountNoNgRxComponent', () => {
  let component: PendingCountNoNgRxComponent;
  let fixture: ComponentFixture<PendingCountNoNgRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCountNoNgRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCountNoNgRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
