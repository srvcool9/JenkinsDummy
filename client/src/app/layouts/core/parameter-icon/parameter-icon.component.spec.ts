import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterIconComponent } from './parameter-icon.component';

describe('ParameterIconComponent', () => {
  let component: ParameterIconComponent;
  let fixture: ComponentFixture<ParameterIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
