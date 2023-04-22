import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadInputComponent } from './file-upload-input/file-upload-input.component';
import { DynamicParametersInputComponent } from './dynamic-parameters-input/dynamic-parameters-input.component';
import { DetailsCallOutsItemComponent } from './details-call-outs-item/details-call-outs-item.component';


@NgModule({
  declarations: [
    FileUploadInputComponent,
    DynamicParametersInputComponent,
    DetailsCallOutsItemComponent
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
        DynamicParametersInputComponent,
        DetailsCallOutsItemComponent
    ]
})
export class SharedModule {
}
