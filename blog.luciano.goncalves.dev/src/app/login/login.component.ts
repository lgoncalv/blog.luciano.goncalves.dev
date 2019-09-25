import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lgblog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;

  get emailFormControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordFormControl(): AbstractControl {
    return this.loginForm.get('password');  
  }

  constructor(private router: Router, 
    private fb: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value, sucess => {
      if (sucess) {
        this.router.navigateByUrl('');
      } else {
        this.loginFailed = true;
      }
    });
  }
}
