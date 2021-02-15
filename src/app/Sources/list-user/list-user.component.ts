import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PageEvent} from '@angular/material/paginator';
import {ConfirmationService} from 'primeng/api';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MsgComponent} from '../../Dialog/msg/msg.component';

export interface User {
  id: number;
  prenom: string;
  nom: string;
  avatar: any;
  isDeleted: boolean;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  apiHost: string = environment.apiHost;
  users: User[] = [];
  page = 0;
  lines!: number;
  displayedColumns: string[] = ['id', 'prenom', 'nom', 'action', 'button'];
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRow();
    this.getUsers(1);
  }
  getPaginator(event: PageEvent){
    this.page = event.pageIndex + 1;
    console.log(event);
    this.getUsers(this.page);
  }
  getUsers(pageNumber: any){
    this.httpClient.get<any>(this.apiHost + 'admin/users?isDeleted=false&page=' + pageNumber).subscribe(
      response => {
        this.users = response;
      }
    );
  }
  getRow(){
    this.httpClient.get<any>(this.apiHost + 'admin/totalusers').subscribe(
      response => {
        this.lines = response;
      }
    );
  }
  onDelete(row: any) {
    this.confirmationService.confirm({
      message: 'Etes_vous sûr de vouloir supprimer l utilisateur?',
      accept: () => {
      this.httpClient.delete(this.apiHost + 'admin/users/' + row).subscribe(
        response => {

          this._snackBar.openFromComponent(MsgComponent, {
            duration: 4 * 1000,
          });

        });
    }
    })
  }

  newUser() {
    this.router.navigate(['admin/add-user']);
  }
}
