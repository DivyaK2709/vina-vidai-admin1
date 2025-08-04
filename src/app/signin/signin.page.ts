import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebaseauth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service'; // ✅ Import LanguageService

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  emailOrUsername: string = '';
  password: string = '';
  fullName: string = '';
  showLanguageMenu = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firestore: Firestore,
    private languageService: LanguageService // ✅ Inject LanguageService
  ) {}

  async onSignIn() {
    try {
      const userCredential = await this.firebaseService.signInWithUsernameOrEmail(
        this.emailOrUsername,
        this.password,
        'admins'
      );

      console.log("Signin successful", this.emailOrUsername, this.password, this.fullName);

      const uid = userCredential.user.uid;
      const adminDocRef = doc(this.firestore, 'admins', uid);
      await setDoc(adminDocRef, { fullName: this.fullName }, { merge: true });

      console.log("uid", uid);
      console.log('✅ Admin sign in successful!');
      this.router.navigate(['/tabs']);

    } catch (error: any) {
      console.error('Admin signin error:', error);
      console.log(`❌ Admin sign in failed: ${error.message}`);
    }
  }

  goToSignup() {
    this.router.navigate(['login']);
  }

  toggleLanguageMenu() {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  selectLanguage(lang: string) {
    console.log('Language selected:', lang);
    this.languageService.setLanguage(lang); // ✅ Use LanguageService method
    this.showLanguageMenu = false;
  }
}
