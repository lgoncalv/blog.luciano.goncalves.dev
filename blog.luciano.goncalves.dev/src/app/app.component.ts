import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lgblog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loadingSubscription = loadingService.isLoading().subscribe(isLoading => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
