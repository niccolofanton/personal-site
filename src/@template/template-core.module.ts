import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SnackbarLoadingComponent } from './components/snackbar-loading/snackbar-loading.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [MainComponent, SnackbarLoadingComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ComponentsModule
  ],
  exports: [MainComponent, SnackbarLoadingComponent],
  entryComponents: [SnackbarLoadingComponent]
})
export class TemplateCoreModule { }


