import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  user = {
    name: 'Your Name',
    email: 'your-email@email.com',
    profileImage: '', // Replace with actual image URL if available
  };

  testHistory = [
    { testName: 'Math Practice Test 1', score: 85, date: '2025-07-01' },
    { testName: 'Physics Mock Test', score: 92, date: '2025-06-28' },
    { testName: 'Chemistry Revision Test', score: 78, date: '2025-06-25' },
    { testName: 'Biology Weekly Test', score: 88, date: '2025-06-20' },
  ];

  constructor(private toastController: ToastController) {}

  // ✅ Toast Helper Method
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  // ✅ Example function: simulate user feedback
  async updateProfile() {
    // e.g., after saving data to Firebase or local storage
    await this.presentToast('✅ Profile updated successfully!', 'success');
  }

  async viewTestDetails(testName: string) {
    await this.presentToast(`📘 Viewing details for ${testName}`, 'medium');
  }
}
