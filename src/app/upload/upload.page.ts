import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UploadPage {
  selectedSegment = 'image';
  questionText: string = '';
  file: File | null = null;
  selectedSubject: string = '';



  quizQuestion = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    explanationHeading: '',
    explanationDetails: ''
  };

  constructor(private firestore: Firestore, private toastController: ToastController,private route: ActivatedRoute) {}

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.selectedSubject = params['subject'] || '';
    console.log('Selected Subject:', this.selectedSubject);
  });
}


  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  
  // ✅ Upload File Metadata
  async uploadFile() {
    if (!this.file) {
      this.showToast('⚠️ Please select a file first.', 'warning');
      return;
    }

    try {
      const questionsRef = collection(this.firestore, 'questions');
    await addDoc(questionsRef, {
  subject: this.selectedSubject,   // ✅ ADD THIS
  type: this.selectedSegment,
  fileName: this.file.name,
  createdAt: new Date()
});


      this.showToast('✅ File metadata saved to Firestore!', 'success');
      this.file = null;

    } catch (error) {
      this.showToast('❌ Upload failed. Try again.', 'danger');
    }
  }

  // ✅ Upload Simple Question
  async uploadQuestion() {
    if (!this.questionText.trim()) {
      this.showToast('⚠️ Please enter question text.', 'warning');
      return;
    }

    try {
      const questionsRef = collection(this.firestore, 'questions');
      await addDoc(questionsRef, {
        subject: this.selectedSubject,
        type: this.selectedSegment,
        questionText: this.questionText,
        createdAt: new Date()
      });

      this.showToast('✅ Question saved successfully!', 'success');
      this.questionText = '';

    } catch (error) {
      this.showToast('❌ Save failed. Please try again.', 'danger');
    }
  }

  // ✅ Upload Quiz
  async uploadQuiz() {
    if (
      !this.quizQuestion.question.trim() ||
      !this.quizQuestion.option1.trim() ||
      !this.quizQuestion.option2.trim() ||
      !this.quizQuestion.option3.trim() ||
      !this.quizQuestion.option4.trim() ||
      !this.quizQuestion.answer.trim()
    ) {
      this.showToast('⚠️ Please fill all quiz fields.', 'warning');
      return;
    }

    try {
      const questionsRef = collection(this.firestore, 'questions');
      await addDoc(questionsRef, {
        type: 'quiz',
        subject: this.selectedSubject,
        question: this.quizQuestion.question,
        options: [
          this.quizQuestion.option1,
          this.quizQuestion.option2,
          this.quizQuestion.option3,
          this.quizQuestion.option4
        ],
        answer: this.quizQuestion.answer,
        explanation: {
          heading: this.quizQuestion.explanationHeading,
          details: this.quizQuestion.explanationDetails
        },
        createdAt: new Date()
      });

      this.showToast('🎉 Quiz uploaded successfully!', 'success');

      // Reset quiz fields
      this.quizQuestion = {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
        explanationHeading: '',
        explanationDetails: ''
      };

    } catch (error) {
      this.showToast('❌ Quiz upload failed.', 'danger');
    }
  }

  // ✅ Reusable Toast Function
  private async showToast(message: string, color: string = 'primary') {
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
