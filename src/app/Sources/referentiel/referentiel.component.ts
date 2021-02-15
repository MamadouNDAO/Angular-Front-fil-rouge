import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {IInfiniteScrollEvent} from 'ngx-infinite-scroll';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import {GroupeComp} from '../list-grp-competence/list-grp-competence.component';
import Swal from 'sweetalert2'
import {ConfirmationService} from 'primeng/api';

export interface Referentiel {
  id: number;
  libelle: string;
  groupeCompetences: any;
  critereEvaluation: string;
  critereAdmission: string;
  programme: any;
}

class RequestOptions {
  constructor(param: { headers: Headers }) {

  }

}

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.css']
})
export class ReferentielComponent implements OnInit {
  apiHost: string = environment.apiHost;
  referentiel: Referentiel[] = [];
  Nextref: Referentiel[] = [];
  link = 'admin/referenciels?pagination=true&isDeleted=false&page=';
  isAdd = false;
  notEmptyRef = true;
  notscrolly = true;
  page: number = 1;
  GrpComp: GroupeComp[] = [];
  visible = true;
  nameoffile: string = "";
  selectable = true;
  removable = true;
  addRef!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  refCtrl = new FormControl();
  filteredGrpComp: Observable<any>;
  grpComp: string[] = [];
  allGrpComps: string[] = [];
  downloadLink: any;
  filePdf: any;
  @ViewChild('countryInput') countryInput!: ElementRef;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  constructor(private httpClient: HttpClient,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) {
    this.filteredGrpComp = this.refCtrl.valueChanges.pipe(
      startWith(null),
      map((country: string | null) => country ? this._filter(country) : this.allGrpComps.slice()));
  }

  remove(country: string): void {
    const index = this.grpComp.indexOf(country);

    if (index >= 0) {
      this.grpComp.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.grpComp.push(event.option.viewValue);
    this.countryInput.nativeElement.value = '';
    this.addRef.patchValue({
      groupes: this.grpComp
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGrpComps.filter(country => country.toLowerCase().indexOf(filterValue) === 0);
  }
  initForm(){
    this.addRef = this.fb.group({
      libelle: ["", Validators.required],
      presentation: ["", Validators.required],
      groupes: ["", Validators.required],
      critereEvaluation: ["", Validators.required],
      critereAdmission: ["", Validators.required],
      programme: ["", Validators.required]
    })
  }
  // @ts-ignore
  onselectfile(event) {

    if (event.target.files instanceof FileList) {
      const reader = new FileReader();
      const file = event.target!.files[0]!;
      this.addRef.controls.programme.setValue(file);
      //this.nameoffile = file.name;
      // reader.readAsDataURL(file);
      // reader.onload = (event:any) => {
      //   this.addRef.patchValue({
      //     programme: event.target.result
      //   })
      //
      // }
    }
  }

  getGrpComp(){
    this.httpClient.get<any>(this.apiHost + 'admin/groupe_competences?isDeleted=false&pagination=false').subscribe(
      response => {
        this.GrpComp = response;
        for(let i of this.GrpComp){
          this.allGrpComps.push(i.libelle)
        }
        // return response;
      }
    )
  }

  ngOnInit(): void {
    this.getReferentiel();
  }

  //Charger la première page contenant les 8 premiers référentiels
  getReferentiel(){
    this.httpClient.get<any>(this.apiHost + this.link +1 ).subscribe(
      response => {

        this.referentiel = response;
      }
    )
  }

  //Charger les pages suivantes en scrollant
  onScroll() {
    console.log('test');
    if(this.notscrolly && this.notEmptyRef) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextRef();
    }
  }

  //Fonction permettant de charger les pages suivantes
  pdfSrc: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  loadNextRef() {
    this.page++
    this.httpClient.get<any>(this.apiHost + this.link + this.page)
      .subscribe(
        response => {
          this.spinner.hide();
          this.Nextref = response;
          if(this.Nextref.length === 0) {
            this.notEmptyRef = false;
          }
          this.referentiel = this.referentiel.concat(this.Nextref);
          this.notscrolly = true;
        }
      )
  }

  runAdd() {
    this.isAdd = true;
    this.getGrpComp();
    this.initForm();
  }
  saveRef(){
    const formData = new FormData();
    const groupes = this.addRef.controls.groupes.value;
    console.log(this.addRef.controls.groupes.value);
    formData.append('libelle', this.addRef.controls.libelle.value);
    formData.append('presentation', this.addRef.controls.presentation.value);
    formData.append('groupes', groupes);
    formData.append('critereEvaluation', this.addRef.controls.critereEvaluation.value);
    formData.append('critereAdmission', this.addRef.controls.critereAdmission.value);
    formData.append('programme', this.addRef.controls.programme.value);
    this.httpClient.post<any>(this.apiHost + 'admin/referenciels', formData).subscribe(
      response => {
        //console.log(response)
        //this.getReferentiel();

        //this.isAdd = false;
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
        location.reload();
      }
    )
  }

  onDelete(id: any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpClient.delete<any>(this.apiHost + 'admin/referenciels/' + id).subscribe(
          response => {
            //this.getReferentiel();
            location.reload();

          });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

      }
    })

  }

  detail(ref: any){

    //this.pdfSrc = 'data:application/pdf;base64' + ref.programme;
    this.pdfSrc = atob(ref.programme);
    console.log(this.pdfSrc);
    this.downloadLink = document.createElement("a");
    const fileName = "sample.pdf";
    this.downloadLink.data = this.pdfSrc;
    this.downloadLink.name = fileName;

    this.visible = false;
   // console.log(this.downloadLink.data);
  }
}
