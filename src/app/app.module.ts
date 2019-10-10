import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TemplateCoreModule } from 'src/@template/template-core.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule, MatIconModule, MatButtonModule } from '@angular/material';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentsModule } from './shared/components/components.module';
import { ApiService } from './shared/services/api.service';
import { HomepageComponent } from './homepage/homepage.component';
import { FaceComponent } from './homepage/face/face.component';
import { FlexLayoutModule } from '@angular/flex-layout';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FaceComponent
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }
    ),
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    TemplateCoreModule,
    HttpClientModule,
    MatSnackBarModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
