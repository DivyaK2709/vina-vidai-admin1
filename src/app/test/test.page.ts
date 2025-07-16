import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/testconfig.json').subscribe(data => {
      this.questions = data.questions;
      this.startTimer(); // start timer when questions load
    });
  }

  startTimer() {
    this.timer = 15; // reset timer for each question
    this.showAnswer = false; // hide previous answer
    this.correctAnswer = ''; // reset correct answer
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.showCorrectAnswer();
        setTimeout(() => this.nextQuestion(), 3000); // wait 3 sec before next
      }
    }, 1000);
  }

  selectOption(option: string) {
    if (this.showAnswer) return; // prevent re-selection after answer shown
    this.selectedOption = option;
    clearInterval(this.interval);
    this.showCorrectAnswer();
    setTimeout(() => this.nextQuestion(), 3000); // wait 3 sec before next
  }

  showCorrectAnswer() {
    const currentQ = this.questions[this.currentIndex];
    this.correctAnswer = currentQ.correct;
    this.showAnswer = true;
  }

  nextQuestion() {
    this.showAnswer = false;
    this.selectedOption = '';
    this.correctAnswer = '';
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.startTimer(); // start timer for next question
    } else {
      console.log('Quiz finished');
      console.log('Quiz completed!');
      // Navigate to results page if needed
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
