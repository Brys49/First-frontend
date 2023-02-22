import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTrainingsComponent } from './member-trainings.component';

describe('MemberTrainingsComponent', () => {
  let component: MemberTrainingsComponent;
  let fixture: ComponentFixture<MemberTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
