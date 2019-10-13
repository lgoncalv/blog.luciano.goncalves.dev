import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'lgblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    console.log(`moment: ${moment()}`);
    console.log(`unix: ${moment().unix()}`);
    console.log(`offset: ${moment().utcOffset()}`);
    console.log(`seconds: ${moment().seconds()}`);
    console.log(`milliseconds: ${moment().milliseconds()}`);
  }
}
