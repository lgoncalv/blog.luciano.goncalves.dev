import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
declare let ga: Function;

@Component({
  selector: 'lgblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService, 
  		private router: Router) {
    this.loadingSubscription = loadingService.isLoading().subscribe(isLoading => this.loading = isLoading);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
