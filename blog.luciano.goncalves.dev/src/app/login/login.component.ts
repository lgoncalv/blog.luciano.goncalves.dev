import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lgblog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private return: string;
  private subscriptions: Subscription[] = [];
  loginForm: FormGroup;
  loginFailed = false;

  get emailFormControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordFormControl(): AbstractControl {
    return this.loginForm.get('password');  
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.subscriptions.push(this.route.queryParams
      .subscribe(params => this.return = params['return'] || ''));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  login(): void {
    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value, success => {
      if (success) {
        this.router.navigateByUrl(this.return);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
