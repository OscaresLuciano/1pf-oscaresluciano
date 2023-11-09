import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    ){}

  emailControl = new FormControl('',[
    Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.email
  ]);
  passwordControl = new FormControl('',[
    Validators.required, Validators.minLength(4), Validators.maxLength(20)
  ]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  formularioValido = this.loginForm.value 
    
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.authService.login(this.loginForm.getRawValue());
    }    
  }
}
