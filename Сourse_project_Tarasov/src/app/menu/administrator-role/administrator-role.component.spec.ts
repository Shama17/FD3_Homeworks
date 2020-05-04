import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorRoleComponent } from './administrator-role.component';

describe('AdministratorRoleComponent', () => {
  let component: AdministratorRoleComponent;
  let fixture: ComponentFixture<AdministratorRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
