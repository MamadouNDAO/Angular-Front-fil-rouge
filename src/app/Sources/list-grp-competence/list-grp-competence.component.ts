import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../list-user/list-user.component';
import {Router} from '@angular/router';

export interface GroupeComp {
  id: number;
  libelle: string;
  descriptif: string;
  competences: any;
}
@Component({
  selector: 'app-list-grp-competence',
  templateUrl: './list-grp-competence.component.html',
  styleUrls: ['./list-grp-competence.component.css']
})
export class ListGrpCompetenceComponent implements OnInit {
  apiHost: string = environment.apiHost;
  GrpComp: GroupeComp[] = [];
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  this.getGrpComp();

  }
  getGrpComp(){
    this.httpClient.get<any>(this.apiHost + 'admin/groupe_competences/competences?isDeleted=false').subscribe(
      response => {
        this.GrpComp = response;
        return response;
      }
    )
  }

  goToDetail(grp: any) {
    this.router.navigate(['admin/competences/detail']);

  }
  refresh(){
    this.getGrpComp();
  }

}
