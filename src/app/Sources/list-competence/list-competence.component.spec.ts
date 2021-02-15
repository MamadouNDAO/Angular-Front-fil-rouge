import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompetenceComponent } from './list-competence.component';

describe('ListCompetenceComponent', () => {
  let component: ListCompetenceComponent;
  let fixture: ComponentFixture<ListCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
