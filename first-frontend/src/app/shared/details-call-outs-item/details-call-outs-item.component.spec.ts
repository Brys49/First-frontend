import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCallOutsItemComponent } from './details-call-outs-item.component';

describe('DetailsCallOutsItemComponent', () => {
  let component: DetailsCallOutsItemComponent;
  let fixture: ComponentFixture<DetailsCallOutsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCallOutsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCallOutsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
