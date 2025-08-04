// src/app/services/language.service.ts

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ta']);
    this.translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang && ['en', 'ta'].includes(browserLang) ? browserLang : 'en');
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('appLanguage', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}
