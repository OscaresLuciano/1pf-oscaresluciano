import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./auth.service";
import { Usuario } from "src/app/core/models";
import { environment } from "src/environments/environment.local";
import { MockProvider } from "ng-mocks";
import { Router } from "@angular/router";

fdescribe('AuthService', () => {

    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MockProvider(Router)]
        });
        
        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);

    });

    it('AuthService should be defined', () => {
        expect(authService).toBeTruthy();
    });
    
    it('should stablish an authenticated user at login', () => {
        
        const USER_MOCK : Usuario = {
            id: 123,
            email: 'fakemail@mail.com',
            name: 'fakeName',
            lastName: 'fakeLastName',
            password: '132456789',
            token: 'askjlfa7g6aasjkhf67as89d',
            role: 'Administrador',
        }
        
        authService.login({
            email: USER_MOCK.email,
            password: USER_MOCK.password,
        });

        httpController
        .expectOne({
            method: 'GET',
            url: `${environment.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
        })
        .flush([USER_MOCK]);

        authService.authUser$.subscribe({
            next: (authUser) => {
                console.log(authUser);
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(USER_MOCK);
            }
        });

    })
});