import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadInputComponent } from './file-upload-input/file-upload-input.component';
import { DynamicParametersInputComponent } from './dynamic-parameters-input/dynamic-parameters-input.component';


@NgModule({
  declarations: [
    FileUploadInputComponent,
    DynamicParametersInputComponent
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
    DynamicParametersInputComponent
  ]
})
export class SharedModule {
}
