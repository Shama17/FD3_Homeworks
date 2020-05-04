import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashUnitTableComponent } from './cash-unit-table.component';

describe('CashUnitTableComponent', () => {
  let component: CashUnitTableComponent;
  let fixture: ComponentFixture<CashUnitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashUnitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashUnitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
