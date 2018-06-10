import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private _authService: AuthService) {
    
   }

   ngOnInit(): void {
     this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required
    ])
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

   login(){
     this._authService.login(this.email.value, this.password.value);
   }  
}
