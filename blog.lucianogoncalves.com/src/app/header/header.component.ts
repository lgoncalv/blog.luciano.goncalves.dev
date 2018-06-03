import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public BITBUCKET_LOGO = require("./assets/BitbucketLogo.png");
  constructor() { }

  ngOnInit() {
  }

}
