import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxDisabledComponent } from './checkbox-disabled.component';

describe('CheckboxDisabledComponent', () => {
  let component: CheckboxDisabledComponent;
  let fixture: ComponentFixture<CheckboxDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
