import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {GroupeComp, ListGrpCompetenceComponent} from '../list-grp-competence.component';

@Component({
  selector: 'app-detail-grp-comp',
  templateUrl: './detail-grp-comp.component.html',
  styleUrls: ['./detail-grp-comp.component.scss']
})
export class DetailGrpCompComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;
  ndongo: GroupeComp[] = [];
  val: GroupeComp[] = [];
  constructor(private router: Router, private test: ListGrpCompetenceComponent) { }
  ngOnInit(): void {
    this.items = [
      {label: 'Niveau 1', icon: 'pi pi-fw pi-home'},
      {label: 'Niveau 2', icon: 'pi pi-fw pi-calendar'},
      {label: 'Niveau 3', icon: 'pi pi-fw pi-pencil'},
    ];





  }

  BackToComp() {
    this.router.navigate(['admin/competences']);
  }
}
