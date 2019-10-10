import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from '../services/navigation.service';
import { BehaviorSubject } from 'rxjs';
import { NavigationSettings } from 'src/app/shared/files/type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public get navigationSettings$(): BehaviorSubject<NavigationSettings> { return this._navigationService.navigationSettings$; }

  constructor(
    private _navigationService: NavigationService
  ) { }

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
