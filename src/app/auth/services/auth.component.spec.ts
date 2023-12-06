import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./auth.service";
import { Usuario } from "src/app/core/models";
import { environment } from "src/environments/environment.local";
import { MockProvider } from "ng-mocks";
import { Router } from "@angular/router";
import { provideMockStore } from '@ngrx/store/testing';
import { State } from "src/app/store/auth/auth.reducer";
import { selectAuthUser } from "src/app/store/auth/auth.selectors";
import { fakeAsync, tick } from '@angular/core/testing';

xdescribe('AuthService', () => {

    let authService: AuthService;
    let httpController: HttpTestingController;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                MockProvider(Router),
                provideMockStore<State>({
                    initialState: {
                        authUser: null
                    },
                    selectors: [
                        {
                            selector: selectAuthUser,
                            value: null
                        }
                    ]
                })
            ]
        }).compileComponents().then(() => {
            authService = TestBed.inject(AuthService);
            httpController = TestBed.inject(HttpTestingController);
        });

    }));

    it('AuthService should be defined', () => {
        expect(authService).toBeTruthy();
    });

    it('should stablish an authenticated user at login', waitForAsync(async () => {
        
        const USER_MOCK: Usuario = {
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

        const req = httpController.expectOne({
            method: 'GET',
            url: `${environment.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
        });

        req.flush([USER_MOCK]); // Simulate HTTP response

        await new Promise<void>(resolve => {
            authService.authUser$.subscribe({
                next: (authUser) => {
                    expect(authUser).toBeTruthy();
                    expect(authUser).toEqual(USER_MOCK);
                    resolve();
                }
            });
        });

    }));

    // ... (otros tests)
});




