import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaviconService {
  private faviconElement;

  constructor() { 
    this.faviconElement = document.querySelectorAll('link[ rel ~= \'icon\' i]')[0];
  }

  update(dirty: boolean = false) {
    if (dirty) {
      this.faviconElement.setAttribute('href', 'favicon-n.ico');
    } else {
      this.faviconElement.setAttribute('href', 'favicon.ico');
    }
  }
}
