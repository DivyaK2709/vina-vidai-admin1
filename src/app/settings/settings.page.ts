import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // adjust path if needed

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: any = {};
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const docRef = doc(this.firestore, 'admins', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.user = docSnap.data();
      }
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      await this.presentToast('⚠️ No user found. Please sign in again.', 'warning');
      return;
    }

    try {
      await this.presentToast('📤 Uploading your profile photo...', 'medium');

      const url = await this.apiService.uploadProfileImage(file, currentUser.uid);

      const docRef = doc(this.firestore, 'admins', currentUser.uid);
      await updateDoc(docRef, { photoURL: url });

      this.user.photoURL = url;
      await this.presentToast('✅ Profile photo updated successfully!', 'success');
    } catch (error) {
      await this.presentToast('❌ Failed to upload photo. Try again.', 'danger');
    }
  }

  async goTologout() {
    await signOut(this.auth);
    await this.presentToast('👋 Logged out successfully.', 'primary');
    this.router.navigate(['/signin']);
  }

  // ✅ Reusable Toast Function
  private async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
      cssClass: 'custom-toast',
    });
    await toast.present();
  }
}
