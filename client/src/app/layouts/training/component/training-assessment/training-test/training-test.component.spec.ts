import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTestComponent } from './training-test.component';

describe('TrainingTestComponent', () => {
  let component: TrainingTestComponent;
  let fixture: ComponentFixture<TrainingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
