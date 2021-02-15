import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GroupeComp, ListGrpCompetenceComponent} from '../list-grp-competence/list-grp-competence.component';
import {CompetenceService} from '../../Service/competence.service';
import {ConfirmationService} from 'primeng/api';
import {MsgComponent} from '../../Dialog/msg/msg.component';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {NavigationEnd, Router} from '@angular/router';
import Swal from 'sweetalert2'

export interface Comp {
  id: number;
  libelle: string;
  descriptif: string;
  niveau: any;
}
export interface Niveau {
  id: number;
  libelle: string;
  critereEvaluation: string;
  groupeAction: string;
  numero: any;
}


@Component({
  selector: 'app-list-competence',
  templateUrl: './list-competence.component.html',
  styleUrls: ['./list-competence.component.css']
})
export class ListCompetenceComponent implements OnInit {
  apiHost: string = environment.apiHost;
  competences: Comp[] = [];
  Nextcomp: Comp[] = [];
  niveaux: Niveau[] = [];
  isChecked = false;
  isEdite = false;
  isActive: boolean = true;
  grps: GroupeComp[] = [];
  public competence!: number ;
  public compEditing: Comp[] = [];
  public toEdit: Comp[] = [];
  isAdd: boolean = false;
  addcomp!: FormGroup;
  updatecomp!: FormGroup;
  notEmptyComp = true;
  notscrolly = true;
  page: number = 1;
  link = 'admin/competences?isDeleted=false&page=';
  mySubscription: any;
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  constructor(private httpClient: HttpClient,
              private compService: CompetenceService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router) {
  }



  ngOnInit(): void {
    this.getComp();
    this.listGrpComp();
  }

  initForm(){
    this.addcomp = this.fb.group({
      libelle: ["", Validators.required],
      descriptif: ["", Validators.required],
      groupe: ["", Validators.required],
      niveau: this.fb.array([this.addNiveau(1), this.addNiveau(2), this.addNiveau(3)])
    })
  }
  addNiveau(num: number): FormGroup{
    return this.fb.group({
      libelle: 'Niveau ' + num,
      critereEvaluation: ["", Validators.required],
      groupeAction: ["", Validators.required]
    })
  }

  get _niveaux(): FormArray{
    return this.addcomp.get('niveau') as FormArray
  }


  //Modication d'une compétence
  initFormUpdate(){

    this.updatecomp = this.fb.group({
      libelle: ["", Validators.required],
      descriptif: ["", Validators.required],
      niveau: this.fb.array([this.upNiveau(1), this.upNiveau(2), this.upNiveau(3)])
    })
  }
  upNiveau(num: number): FormGroup{
    for(let i of this.niveaux) {
      var myid = i.id;
    }

    // @ts-ignore
    var ids = myid;
    return this.fb.group({
      id: ids,
      libelle: 'Niveau ' + num,
      critereEvaluation: ["", Validators.required],
      groupeAction: ["", Validators.required]
    })
  }

  OnUpdateComp() {
     let val = this.updatecomp.value;
    this.httpClient.put<any>(this.apiHost + 'admin/competences/' + this.competence, val).subscribe(
      response => {
        this.page = 1;
        this.getComp();
        this.isEdite = false;
        this.isActive = true;
        Swal.fire({
          icon: 'success',
          title: 'Compétence modifiée avec succés!',
          showConfirmButton: false,
          timer: 1900,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    )
  }

  //Récupérer les 8 premiers compétences
  getComp(){
    this.httpClient.get<any>(this.apiHost + this.link + this.page).subscribe(
      response => {
        this.competences = response;
      }
    )
  }

  showComp(competence: any) {
    this.niveaux = competence.niveau;
    this.isChecked = true;
    this.competence = competence.id;
    this.compEditing.pop();
    this.compEditing.push(competence);
    this.toEdit = [];
    this.toEdit = competence;

  }
  listGrpComp(){
    this.compService.checkGrpComp().subscribe(
      response => {
        this.grps = response;

      }
    )
  }

  monGrp(grp: any) {
    this.competences = grp.competences;
    this.isChecked = false;
  }

  reloadComp() {
    this.getComp();
    this.isChecked = false;
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Etes_vous sûr de vouloir supprimer cette compétence?',
      accept: () => {
        this.httpClient.delete<any>(this.apiHost + 'admin/competences/' + this.competence).subscribe(
          response => {
            this.getComp();
            this.listGrpComp();
            this.isChecked = false;
          });
      }
    })
  }

  edit() {
    // console.log(this.compEditing);
    this.initFormUpdate();
    for(let fafa of this.compEditing){
      this.updatecomp.patchValue({
        libelle: fafa.libelle,
        descriptif: fafa.descriptif,
        niveau: fafa.niveau,
      });

    }

    this.isEdite = true;
    this.isChecked = false;
    this.isActive = false;
  }

  newComp() {
    this.initForm();
    this.isAdd = true;
    this.isChecked = false;
    this.isActive = false;
  }

  BackToComp() {
    this.isActive = true;
    this.isAdd = false;
    this.isEdite = false;
  }

  saveComp(){
    let val = this.addcomp.value;

    this.compService.postComp(val).subscribe(
      response => {
        // window.location.reload();
        console.log(response);
        this.getComp();
        this.isAdd = false;
        this.isActive = true;
        Swal.fire({
          icon: 'success',
          title: 'Compétence créée avec succés!',
          showConfirmButton: false,
          timer: 1900,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    )
  }



  //Charger les pages suivantes en scrollant
  onScroll() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end == total) {
      this.loadNextComp();
    }
  }

  //Fonction permettant de charger les pages suivantes
  loadNextComp() {
    this.page++
    this.httpClient.get<any>(this.apiHost + this.link + this.page)
      .subscribe(
        response => {
          this.spinner.hide();
          this.Nextcomp = response;
          if(this.Nextcomp.length === 0) {
            this.notEmptyComp = false;
          }
          this.competences = this.competences.concat(this.Nextcomp);
          this.notscrolly = true;
        }
      )
  }

  onGetGroup() {
    console.log('tom');
  }

  refresh(){
    this.getComp();
  }
}
