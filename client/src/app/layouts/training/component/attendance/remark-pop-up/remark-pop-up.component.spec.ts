import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkPopUpComponent } from './remark-pop-up.component';

describe('RemarkPopUpComponent', () => {
  let component: RemarkPopUpComponent;
  let fixture: ComponentFixture<RemarkPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
