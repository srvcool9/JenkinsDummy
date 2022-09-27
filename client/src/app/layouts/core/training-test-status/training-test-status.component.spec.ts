import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTestStatusComponent } from './training-test-status.component';

describe('TrainingTestStatusComponent', () => {
  let component: TrainingTestStatusComponent;
  let fixture: ComponentFixture<TrainingTestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
