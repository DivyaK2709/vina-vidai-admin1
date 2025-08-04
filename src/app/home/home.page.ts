import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@Component({
  selector: 'app-home',
  standalone: true, // ✅ if you are using standalone components
  imports: [IonicModule, CommonModule, TranslateModule],
// ✅ import IonicModule and CommonModule
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subjects: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('assets/subjects.json').subscribe(data => {
      this.subjects = data;
    });
  }

  openUploadPage(subjectName: string) {
    console.log('Navigating to upload page with subject:', subjectName);
    this.router.navigate(['/upload'], { queryParams: { subject: subjectName } });
  }
}


