import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailListComponent } from './member-detail-list.component';

describe('MemberDetailListComponent', () => {
  let component: MemberDetailListComponent;
  let fixture: ComponentFixture<MemberDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberDetailListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
