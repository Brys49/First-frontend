import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-parameters-input',
  templateUrl: './dynamic-parameters-input.component.html',
  styleUrls: ['./dynamic-parameters-input.component.scss']
})
export class DynamicParametersInputComponent implements OnInit {
  @Input() public formGroup: FormGroup = new FormGroup<any>([]);
  @Input() public parametersData: Map<string, string> = new Map<string, string>();

  get parameters() {
    return this.formGroup.get('parameters') as FormArray;
  }

  constructor(private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    for (const pName of this.parametersData.keys()) {
      const pValue: string | undefined = this.parametersData.get(pName);
      this.addParameter(pName, pValue)
    }
  }

  public addParameter(name: string = "", value: string = ""): void {
    this.parameters.push(
      this.fb.group({
        pName: [name, [Validators.required]],
        pValue: [value, [Validators.required]],
      })
    )
  }

  public removeParameter(i: number): void {
    this.parameters.removeAt(i);
  }
}
