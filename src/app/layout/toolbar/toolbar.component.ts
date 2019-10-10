import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavigationSettings } from 'src/app/shared/files/type';
import { NavigationService } from 'src/@template/services/navigation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  // ! ---- important stuff
  // emit side menu open
  @Output() openSideMenu: EventEmitter<any> = new EventEmitter();

  // navigation settings
  public get navigationSettings$(): BehaviorSubject<NavigationSettings> { return this._navigationService.navigationSettings$; }

  // toolbar title
  public get title$(): BehaviorSubject<string> { return this._navigationService.title$; }

  private _unsubscribeAll: Subject<void> = null;

  constructor(
    private _navigationService: NavigationService
  ) {
    moment.locale('it');
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
