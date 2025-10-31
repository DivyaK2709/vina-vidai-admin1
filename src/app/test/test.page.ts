import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage implements OnInit, OnDestroy {
  questions: any[] = [];
  currentIndex = 0;
  selectedOption: string = '';
  correctAnswer: string = '';
  showAnswer: boolean = false;
  timer: number = 15; // default time per question
  interval: any;

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.http.get<any>('assets/testconfig.json').subscribe(data => {
      this.questions = data.questions;
      this.startTimer(); // start timer when questions load
    });
  }

  startTimer() {
    this.timer = 15;
    this.showAnswer = false;
    this.correctAnswer = '';

    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.showCorrectAnswer();
        setTimeout(() => this.nextQuestion(), 3000);
      }
    }, 1000);
  }

  selectOption(option: string) {
    if (this.showAnswer) return;
    this.selectedOption = option;
    clearInterval(this.interval);
    this.showCorrectAnswer();
    setTimeout(() => this.nextQuestion(), 3000);
  }

  showCorrectAnswer() {
    const currentQ = this.questions[this.currentIndex];
    this.correctAnswer = currentQ.correct;
    this.showAnswer = true;
  }

  async nextQuestion() {
    this.showAnswer = false;
    this.selectedOption = '';
    this.correctAnswer = '';

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.startTimer();
    } else {
      await this.presentToast('🎉 Quiz completed successfully!', 'success');
      // Here you can navigate to results page if needed
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // ✅ Reusable Toast Function
  private async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}
