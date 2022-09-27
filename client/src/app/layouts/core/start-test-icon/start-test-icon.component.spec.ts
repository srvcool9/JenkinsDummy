import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTestIconComponent } from './start-test-icon.component';

describe('StartTestIconComponent', () => {
  let component: StartTestIconComponent;
  let fixture: ComponentFixture<StartTestIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTestIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTestIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
