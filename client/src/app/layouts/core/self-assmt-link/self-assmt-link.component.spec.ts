import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssmtLinkComponent } from './self-assmt-link.component';

describe('SelfAssmtLinkComponent', () => {
  let component: SelfAssmtLinkComponent;
  let fixture: ComponentFixture<SelfAssmtLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAssmtLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssmtLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
