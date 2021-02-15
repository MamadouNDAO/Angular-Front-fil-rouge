import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../Service/auth.service';
import {TokenService} from '../Service/token.service';
import {Router} from '@angular/router';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  private role: any;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private service: TokenService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    this.isLoading = true;
    const val = this.signin.value;
    this.authService.connect(val).subscribe(
      response => {
       // console.log(response);
        this.service.saveToken('token', response.token);
        this.role = this.service.getRole(response.token);

        if (this.role == 'ROLE_ADMIN') {
          this.router.navigate(['admin']);
        }
      },
      error => {
        this.isLoading = false;

      }
    );
  }
}
