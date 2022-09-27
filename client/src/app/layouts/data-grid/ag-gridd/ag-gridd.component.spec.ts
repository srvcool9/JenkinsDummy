import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGriddComponent } from './ag-gridd.component';

describe('AgGriddComponent', () => {
  let component: AgGriddComponent;
  let fixture: ComponentFixture<AgGriddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGriddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGriddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
