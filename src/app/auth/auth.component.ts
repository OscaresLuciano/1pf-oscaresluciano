import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  
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

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  login(): void {
    if(this.formularioValido){
      this.authService.login({
        ...(this.loginForm.value as any)
      })
    }

    this.router.navigate(['dashboard','alumnos']);
  }
}
