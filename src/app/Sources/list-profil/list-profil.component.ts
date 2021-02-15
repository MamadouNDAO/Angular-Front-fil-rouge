import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../list-user/list-user.component';
import {HttpClient} from '@angular/common/http';

export interface Profil {
  id: number;
  libelle: string;
}
@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css']
})
export class ListProfilComponent implements OnInit {

  apiHost: string = environment.apiHost;
  profils: Profil[] = [];
  page = 0;
  link= 'admin/profils?isDeleted=false&page=';
  displayedColumns: string[] = ['id', 'libelle', 'edite', 'delete', 'detail'];
  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.getProfil(1);
  }

  getProfil(pageNumber: number){
    this.httpClient.get<any>(this.apiHost + this.link + pageNumber).subscribe(
      response => {
        this.profils = response;
        console.log(this.profils);
      }
    )
  }

}
