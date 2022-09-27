import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInitiateTrainingComponent } from './form-initiate-training.component';

describe('FormInitiateTrainingComponent', () => {
  let component: FormInitiateTrainingComponent;
  let fixture: ComponentFixture<FormInitiateTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInitiateTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInitiateTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
