import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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

  constructor(private firestore: Firestore) {}

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile() {
    if (!this.file) {
      alert('Please select a file first.');
      return;
    }

    try {
      // Save file name as metadata in Firestore (not uploading to Storage)
      const questionsRef = collection(this.firestore, 'questions');
      await addDoc(questionsRef, {
        type: this.selectedSegment,
        fileName: this.file.name,
        createdAt: new Date()
      });

      alert('File metadata saved to Firestore!');
      this.file = null;

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    }
  }

  async uploadQuestion() {
    if (!this.questionText.trim()) {
      alert('Please enter question text.');
      return;
    }

    try {
      const questionsRef = collection(this.firestore, 'questions');
      await addDoc(questionsRef, {
        type: this.selectedSegment,
        questionText: this.questionText,
        createdAt: new Date()
      });

      alert('Question saved successfully!');
      this.questionText = '';

    } catch (error) {
      console.error('Error saving question:', error);
      alert('Save failed.');
    }
  }

  async uploadQuiz() {
    // Validate required fields
    if (!this.quizQuestion.question.trim() ||
        !this.quizQuestion.option1.trim() ||
        !this.quizQuestion.option2.trim() ||
        !this.quizQuestion.option3.trim() ||
        !this.quizQuestion.option4.trim() ||
        !this.quizQuestion.answer.trim()) {
      alert('Please fill all quiz fields.');
      return;
    }

    try {
      const questionsRef = collection(this.firestore, 'questions');
      await addDoc(questionsRef, {
        type: 'quiz',
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

      alert('Quiz uploaded successfully!');

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
      console.error('Error uploading quiz:', error);
      alert('Quiz upload failed.');
    }
  }





}
