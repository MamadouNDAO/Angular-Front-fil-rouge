import {Component, OnInit, ViewChild} from '@angular/core';
import {ListCompetenceComponent} from '../list-competence/list-competence.component';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ListGrpCompetenceComponent} from '../list-grp-competence/list-grp-competence.component';

@Component({
  selector: 'app-manage-competence',
  templateUrl: './manage-competence.component.html',
  styleUrls: ['./manage-competence.component.css']
})
export class ManageCompetenceComponent implements OnInit {

  constructor() { }
   @ViewChild(ListCompetenceComponent) private mysecondComponent!: ListCompetenceComponent;
   @ViewChild(ListGrpCompetenceComponent) private myotherComponent!: ListGrpCompetenceComponent;

  ngOnInit(): void {
  }

  onClick() {
    this.mysecondComponent.refresh();
    this.myotherComponent.refresh();
  }
}
