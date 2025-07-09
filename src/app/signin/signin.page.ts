import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebaseauth.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore'; // import Firestore

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  emailOrUsername: string = '';
  password: string = '';
  fullName: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firestore: Firestore // inject Firestore
  ) {}

  async onSignIn() {
    try {
      const userCredential = await this.firebaseService.signInWithUsernameOrEmail(this.emailOrUsername, this.password, 'admins');
      console.log("Signin successful", this.emailOrUsername, this.password, this.fullName);

      const uid = userCredential.user.uid;

    
      const adminDocRef = doc(this.firestore, 'admins', uid);
      await updateDoc(adminDocRef, { fullName: this.fullName });
      console.log("uid",uid);
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
}
