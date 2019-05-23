import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListApplicationComponent } from './edit-list-application.component';

describe('EditListApplicationComponent', () => {
  let component: EditListApplicationComponent;
  let fixture: ComponentFixture<EditListApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
