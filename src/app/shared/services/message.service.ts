import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({ providedIn: 'root' })
export class MessageService {

  private _ref = null;

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  public showLoading(): void {
    if (!this._ref) {
      this._ref = this._dialog.open(LoadingComponent, { disableClose: true });
    }
  }

  public closeLoading(): void {
    if (this._ref) {
      this._ref.close();
      this._ref = null;
    }
  }

  /**  (types: show, error, warning, success, info)*/
  /**
   * show a snack-bar
   * @param {string} title 
   * @param {string} text 
   * @param {string} [type='instanceof'] show, error, warning, success, info
   * @param {string} [action=null] close button text
   */
  public displayToast(title: string, text: string, type: string = 'info', action: string = null): void {

    const localConfig: MatSnackBarConfig = { horizontalPosition: 'right' };

    if (!action) { localConfig.duration = 3500; }

    switch (type) {
      case 'show':
        this._snackBar.open(`${title}: ${text.toLowerCase()}`, action, localConfig);
        break;
      case 'error':
        this._snackBar.open(`❌ ${title}: ${text.toLowerCase()}`, action, localConfig);
        break;
      case 'warning':
        this._snackBar.open(`⚠️ ${title}: ${text.toLowerCase()}`, action, localConfig);
        break;
      case 'success':
        this._snackBar.open(`✅ ${title}: ${text.toLowerCase()}`, action, localConfig);
        break;
      case 'info':
        this._snackBar.open(`ℹ️ ${title}: ${text.toLowerCase()}`, action, localConfig);
        break;
    }

  }

  /**
   * display comunication with server error
   * @param {string} text 
   * @param {string} title 
   */
  public displayError(text: string = 'Problem communicating with server', title: string = 'Error'): void {
    this.displayToast(title, text, 'error');
  }

  /**
   * display warning
   * @param {string} text 
   * @param {string} title 
   */
  public displayWarning(text: string = 'Something went wrong', title: string = 'Warning'): void {
    this.displayToast(title, text, 'warning');
  }

  /**
   * display success message
   * @param {string} text 
   * @param {string} title 
   */
  public displaySuccess(text: string = 'Operation complete', title: string = 'Success'): void {
    this.displayToast(title, text, 'success');
  }

}
