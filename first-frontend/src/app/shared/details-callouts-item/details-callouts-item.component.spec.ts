import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCalloutsItemComponent } from './details-callouts-item.component';

describe('DetailsCalloutsItemComponent', () => {
  let component: DetailsCalloutsItemComponent;
  let fixture: ComponentFixture<DetailsCalloutsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsCalloutsItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsCalloutsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
