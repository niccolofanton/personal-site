import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public translate: TranslateService
  ) {

    // load languages
    translate.addLangs(['en', 'it']);
    // set default languages
    translate.setDefaultLang('en');
    // get browser language
    const browserLang = translate.getBrowserLang();
    // use supported language or english by default
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');

  }

}
