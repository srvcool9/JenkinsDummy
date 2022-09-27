import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelfAssessmentComponent } from './form-self-assessment.component';

describe('FormSelfAssessmentComponent', () => {
  let component: FormSelfAssessmentComponent;
  let fixture: ComponentFixture<FormSelfAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSelfAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelfAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
