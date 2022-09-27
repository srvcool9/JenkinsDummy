import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchTrainingComponent } from './launch-training.component';

describe('LaunchTrainingComponent', () => {
  let component: LaunchTrainingComponent;
  let fixture: ComponentFixture<LaunchTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
