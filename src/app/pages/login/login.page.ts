import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController   // ✅ Inject ToastController
  ) {}

  // ✅ Toast helper method
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',  // can be 'middle' if you prefer
      color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      await this.presentToast('❌ Passwords do not match!', 'danger');
      return;
    }

    try {
      await this.firebaseService.signUp(this.email, this.password, this.username, 'admins');
      await this.presentToast('✅ Admin signed up successfully!', 'success');
      this.router.navigate(['signin']);
    } catch (error: any) {
      await this.presentToast('⚠️ Signup failed. Please try again.', 'warning');
      console.error('Admin signup error:', error);
    }
  }

  async goToSignin() {
    this.router.navigate(['signin']);
    await this.presentToast('🔑 Redirecting to Sign In page...', 'medium');
  }
}
