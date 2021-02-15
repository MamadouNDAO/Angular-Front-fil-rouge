import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGrpCompComponent } from './detail-grp-comp.component';

describe('DetailGrpCompComponent', () => {
  let component: DetailGrpCompComponent;
  let fixture: ComponentFixture<DetailGrpCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGrpCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGrpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
