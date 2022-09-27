import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateTrainingComponent } from './initiate-training.component';

describe('InitiateTrainingComponent', () => {
  let component: InitiateTrainingComponent;
  let fixture: ComponentFixture<InitiateTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
