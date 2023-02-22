import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicParametersInputComponent } from './dynamic-parameters-input.component';

describe('DynamicParametersInputComponent', () => {
  let component: DynamicParametersInputComponent;
  let fixture: ComponentFixture<DynamicParametersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicParametersInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicParametersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
