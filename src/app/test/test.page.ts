import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage {}
