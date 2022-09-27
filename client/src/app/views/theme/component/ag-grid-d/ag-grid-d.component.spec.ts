import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridDComponent } from './ag-grid-d.component';

describe('AgGridDComponent', () => {
  let component: AgGridDComponent;
  let fixture: ComponentFixture<AgGridDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
