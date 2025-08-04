import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ta']); // ✅ Supported languages
    translate.setDefaultLang('en'); // ✅ Default language

    const browserLang = translate.getBrowserLang();
const selectedLang = browserLang && browserLang.match(/en|ta/) ? browserLang : 'en';
translate.use(selectedLang);


  }
}
