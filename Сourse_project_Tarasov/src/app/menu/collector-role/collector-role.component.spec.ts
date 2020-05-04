import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorRoleComponent } from './collector-role.component';

describe('CollectorRoleComponent', () => {
  let component: CollectorRoleComponent;
  let fixture: ComponentFixture<CollectorRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
