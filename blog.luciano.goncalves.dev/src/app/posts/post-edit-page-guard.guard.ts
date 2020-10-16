import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PostEditPageComponent } from './container/post-edit-page/post-edit-page.component';

@Injectable({
  providedIn: 'root'
})
export class PostEditPageGuardGuard implements CanDeactivate<PostEditPageComponent> {
  canDeactivate(component: PostEditPageComponent, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (component.isFormDirty) {
        return confirm('Navigate away and lose all changes on post?');
      }
      return true;
  }
}
