import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
  selector: 'lgblog-wildcard',
})
export class WildcardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigateByUrl('/not-found', {skipLocationChange: true});
  }

}
