import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebaseauth.service';
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

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  async onSignIn() {
    try {
      await this.firebaseService.signInWithUsernameOrEmail(this.emailOrUsername, this.password, 'admins');


      alert('✅ Admin sign in successful!');
      this.router.navigate(['/home']); // Navigate to admin dashboard
    } catch (error: any) {
      console.error('Admin signin error:', error);
      console.log(`❌ Admin sign in failed: ${error.message}`);
    }
  }

  goToSignup() {
    this.router.navigate(['login']);
  }
}
