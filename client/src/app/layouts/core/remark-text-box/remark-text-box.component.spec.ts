import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkTextBoxComponent } from './remark-text-box.component';

describe('RemarkTextBoxComponent', () => {
  let component: RemarkTextBoxComponent;
  let fixture: ComponentFixture<RemarkTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkTextBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
