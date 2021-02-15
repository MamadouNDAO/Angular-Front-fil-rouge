import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompetenceComponent } from './manage-competence.component';

describe('ManageCompetenceComponent', () => {
  let component: ManageCompetenceComponent;
  let fixture: ComponentFixture<ManageCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
