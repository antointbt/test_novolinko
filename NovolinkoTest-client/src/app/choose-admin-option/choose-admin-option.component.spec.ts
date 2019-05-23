import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAdminOptionComponent } from './choose-admin-option.component';

describe('ChooseAdminOptionComponent', () => {
  let component: ChooseAdminOptionComponent;
  let fixture: ComponentFixture<ChooseAdminOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAdminOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAdminOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
