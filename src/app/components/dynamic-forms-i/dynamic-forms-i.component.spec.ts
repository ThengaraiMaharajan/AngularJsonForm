import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsIComponent } from './dynamic-forms-i.component';

describe('DynamicFormsIComponent', () => {
  let component: DynamicFormsIComponent;
  let fixture: ComponentFixture<DynamicFormsIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormsIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormsIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
