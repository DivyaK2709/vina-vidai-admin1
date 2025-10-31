import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebaseauth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  emailOrUsername = '';
  password = '';
  fullName = '';
  showLanguageMenu = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firestore: Firestore,
    private languageService: LanguageService,
    private toastCtrl: ToastController
  ) {}

  async presentToast(message: string, color: string = 'medium') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  async onSignIn() {
    if (!this.emailOrUsername || !this.password) {
      this.presentToast('⚠️ Please enter username/email and password', 'warning');
      return;
    }

    try {
      const userCredential = await this.firebaseService.signInWithUsernameOrEmail(
        this.emailOrUsername,
        this.password,
        'admins'
      );

      const uid = userCredential.user.uid;
      const adminDocRef = doc(this.firestore, 'admins', uid);
      await setDoc(adminDocRef, { fullName: this.fullName }, { merge: true });

      await this.presentToast('✅ Sign-in successful!', 'success');
      this.router.navigate(['/tabs']);
    } catch (error: any) {
      console.error('Sign-in Error:', error);
      await this.presentToast(`❌ ${error.message}`, 'danger');
    }
  }

  goToSignup() {
    this.router.navigate(['login']);
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  selectLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.showLanguageMenu = false;
  }
}
