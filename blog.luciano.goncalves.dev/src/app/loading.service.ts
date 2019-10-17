import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = new Subject<boolean>();
  constructor() { }

  isLoading(): Observable<boolean>{
    return this.loading.asObservable();
  }

  setIsLoading(value: boolean): void {
    this.loading.next(value);
  }
}
