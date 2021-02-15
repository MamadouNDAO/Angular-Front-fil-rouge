import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../Service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  deconnect() {
    this.service.removeToken('token');
    this.router.navigate(['login']);
  }
}
