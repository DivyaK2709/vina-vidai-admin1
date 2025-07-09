import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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
}

