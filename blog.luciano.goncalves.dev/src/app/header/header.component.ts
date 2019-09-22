import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'lgblog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public BITBUCKET_LOGO = require("./assets/BitbucketLogo.png");
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
}
