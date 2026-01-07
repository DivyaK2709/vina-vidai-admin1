import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subjects: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController   // ✅ Inject ToastController
  ) {}
  
  ngOnInit() {
    this.http.get<any[]>('assets/subjects.json').subscribe({
      next: (data) => {
        this.subjects = data;
        this.presentToast('Subjects loaded successfully!', 'success');
      },
      error: (err) => {
        this.presentToast('Failed to load subjects.', 'danger');
        console.error('Error loading subjects:', err);
      },
    });
  }
   
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
      cssClass: 'custom-toast', // optional for styling
    });
    await toast.present();
  }

  openUploadPage(subjectName: string) {
    this.router.navigate(['/upload'], { queryParams: { subject: subjectName } });
    this.presentToast(`Navigating to ${subjectName} upload page`, 'medium');
  }
}
