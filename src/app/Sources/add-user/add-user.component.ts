import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  url = "../assets/images/profil.png"
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  onselectfile(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any)=>{
        this.url = event.target.result;
      }
    }
  }
}
