import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from "src/app/shared/shared.module";
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
    let loginComponent: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, SharedModule],
            providers: [provideMockStore({})]
        });
        const fixture = TestBed.createComponent(LoginComponent);
        loginComponent = fixture.componentInstance;
    });

    it('should create a login component', () => {
        expect(loginComponent).toBeTruthy();
    })

    it('should show all form fields as "touched" if invalid', () => {
        loginComponent.loginForm.patchValue({
            email: 'foo@example.com',
            password: '',
        })
      loginComponent.login();
      expect(loginComponent.emailControl.touched).toBeTrue();
      expect(loginComponent.passwordControl.touched).toBeTrue();
    })

    it('should call login method from auth service if form is valid', () => {
        loginComponent.loginForm.patchValue({
            email: 'test@mail.com',
            password: '1111'
        })
        const spyOnAuthServiceLogin = spyOn((loginComponent as any).authService, 'login');
        loginComponent.login();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    })

})