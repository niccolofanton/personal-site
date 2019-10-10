import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from 'src/app/layout/toolbar/toolbar.component';
import { SideMenuComponent } from 'src/app/layout/side-menu/side-menu.component';

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, SideMenuComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [ToolbarComponent, SideMenuComponent]
})
export class LayoutModule { }
