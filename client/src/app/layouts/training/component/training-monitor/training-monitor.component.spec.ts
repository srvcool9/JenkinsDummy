import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMonitorComponent } from './training-monitor.component';

describe('TrainingMonitorComponent', () => {
  let component: TrainingMonitorComponent;
  let fixture: ComponentFixture<TrainingMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
