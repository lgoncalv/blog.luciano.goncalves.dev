import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DragAndDropDirective } from './shared/drag-and-drop.directive';
import { MatIconModule, MatTooltipModule, MatProgressBarModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    UploadComponent,
    DragAndDropDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  exports: [
    UploadComponent
  ]
})
export class ImageUploadModule { }
