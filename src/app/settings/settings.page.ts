import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // adjust path

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
    private apiService: ApiService
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
 console.log("currentUser",currentUser);
  if (!currentUser) return;

  try {
    const url = await this.apiService.uploadProfileImage(file, currentUser.uid);

    // ✅ Update Firestore with new photoURL
    const docRef = doc(this.firestore, 'admins', currentUser.uid);
    await updateDoc(docRef, { photoURL: url });

    // ✅ Update local user object so UI refreshes immediately
    this.user.photoURL = url;

    alert('✅ Profile photo updated successfully!');
  } catch (error) {
    console.error('Error uploading photo:', error);
    alert('❌ Failed to upload photo');
  }
}


  goTologout() {
   
      this.router.navigate(['/signin']);
   
  }
}
