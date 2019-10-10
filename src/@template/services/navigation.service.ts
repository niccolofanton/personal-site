import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavigationSettings } from 'src/app/shared/files/type';
import { defaultNavigation, defaultTitle } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NavigationService implements OnInit, OnDestroy {

  // used to configure navigation settings
  public navigationSettings$: BehaviorSubject<NavigationSettings>;
  // used to change toolbar title
  public title$: BehaviorSubject<string>;

  private _unsub: Subject<void>;

  constructor(
    // private _cd: ChangeDetectorRef
  ) {
    // set to default value
    this.navigationSettings$ = new BehaviorSubject(defaultNavigation);
    this.title$ = new BehaviorSubject(defaultTitle);
    this._unsub = new Subject();
  }

  ngOnInit(): void {
    // this.navigationSettings$
    //   .pipe(takeUntil(this._unsub))
    //   .subscribe(() => this._cd.detectChanges());
  }

  ngOnDestroy(): void {
    this._unsub.complete();
    this._unsub.next();
  }

}
