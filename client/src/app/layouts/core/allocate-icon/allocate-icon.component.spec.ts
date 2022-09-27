import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateIconComponent } from './allocate-icon.component';

describe('AllocateIconComponent', () => {
  let component: AllocateIconComponent;
  let fixture: ComponentFixture<AllocateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
