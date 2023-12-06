import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    ){}

  emailValue = "";
  
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
    
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.authService.login(this.loginForm.getRawValue());
    }    
  }
}
