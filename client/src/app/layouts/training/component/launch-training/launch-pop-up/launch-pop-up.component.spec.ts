import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPopUpComponent } from './launch-pop-up.component';

describe('LaunchPopUpComponent', () => {
  let component: LaunchPopUpComponent;
  let fixture: ComponentFixture<LaunchPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
