import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrpCompetenceComponent } from './add-grp-competence.component';

describe('AddGrpCompetenceComponent', () => {
  let component: AddGrpCompetenceComponent;
  let fixture: ComponentFixture<AddGrpCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrpCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrpCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
