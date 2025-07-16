import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // required for *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // required for ngModel
import { IonicModule } from '@ionic/angular'; // required for ion-* components

import { TestPageRoutingModule } from './test-routing.module';
import { TestPage } from './test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
