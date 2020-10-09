import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'lgblog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public LOGO = require("./assets/GitHub-Mark-Light-32px.png");

  get user(): Observable<firebase.User> {
    return this.authService.user$
  }
  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout(()=> {
      this.router.navigateByUrl('');
    });
  }

  drafts() {
    this.router.navigateByUrl('\drafts');
  }
}
