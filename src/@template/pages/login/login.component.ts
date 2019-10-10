import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { NavigationService } from 'src/@template/services/navigation.service';
import { defaultNavigation } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    public loginForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthenticationService,
        private _navigation: NavigationService,
        private _router: Router
    ) {
        this._navigation.navigationSettings$.next({ toolbar: false, sidemenu: false });
    }

    ngOnInit(): void {

        this._authService.logout();

        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

    }

    ngOnDestroy(): void {
        this._navigation.navigationSettings$.next(defaultNavigation);
    }

    public login(formValue): void {
        console.log(formValue);
        this._router.navigate(['sample']);
    }

}
