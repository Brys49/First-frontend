import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadInputComponent } from './file-upload-input/file-upload-input.component';


@NgModule({
  declarations: [
    FileUploadInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
    exports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadInputComponent,
    ]
})
export class SharedModule { }
