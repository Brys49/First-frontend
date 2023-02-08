import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FireTruck } from '../../../core/models/fire-truck.model';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent implements OnInit, OnChanges {
  private tempParamInputs: Map<string, string> = new Map;
  private tempParamInputsKeys: string[] = [];
  @Input() public equipmentId: number = 0;
  public equipment!: Equipment;
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];
  public editMode: boolean = false;
  public formGroup!: FormGroup;
  public paramInputs: Map<string, string> = new Map;
  public paramInputsKeys: string[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private fb: NonNullableFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getEquipment();
  }

  ngOnChanges(): void {
    this.getEquipment()
  }

  private getEquipment(): void {
    this.equipmentService.getEquipment(this.equipmentId).subscribe(equipment => this.equipment = equipment);

    if (this.equipment) {
      this.generateContent();
    }
  }

  private generateContent(): void {
    this.listContent.clear();
    this.listContent.set("Serial number", this.equipment.serialNumber);
    this.listContent.set("Storage location", this.equipment.storageLocation);
    for (let paramKey of this.equipment.parameters.keys()) {
      this.listContent.set(paramKey, this.equipment.parameters.get(paramKey));
    }
    this.listContentKeys = Array.from(this.listContent.keys());
  }

  public deleteEquipment(id: number): void {
    this.equipmentService.deleteEquipment(id);
    this.ngOnInit()
  }

  public edit(): void {
    if (this.editMode) {
      this.close();
      return;
    } else {
      this.editMode = true;
      this.tempParamInputs = new Map(this.paramInputs);
      this.tempParamInputsKeys = this.paramInputsKeys.slice();
    }

    this.formGroup = this.fb.group({
      serialNumber: [this.equipment.serialNumber, [Validators.required, Validators.maxLength(120)]],
      storageLocation: [this.equipment.storageLocation, [Validators.required, Validators.maxLength(120)]],
    });

    let parametersCounter = 0;
    this.paramInputs.clear();
    for (let paramKey of this.equipment.parameters.keys()) {
      const keyName = "paramKey" + parametersCounter;
      const valueName = "paramValue" + parametersCounter;
      parametersCounter += 1;
      this.formGroup.addControl(
        keyName, new FormControl(paramKey, [Validators.required, Validators.minLength(3)])
      );
      this.formGroup.addControl(
        valueName, new FormControl(this.equipment.parameters.get(paramKey), [Validators.required, Validators.minLength(1)])
      );

      this.paramInputs.set(keyName, valueName);
      this.paramInputsKeys = Array.from(this.paramInputs.keys());
    }
  }

  public addParameter(): void {
    let parametersCounter = this.paramInputsKeys.length;

    const keyName = "paramKey" + parametersCounter;
    const valueName = "paramValue" + parametersCounter;

    this.formGroup.addControl(
      keyName, new FormControl('', [Validators.required, Validators.minLength(3)])
    );
    this.formGroup.addControl(
      valueName, new FormControl('', [Validators.required, Validators.minLength(1)])
    );

    this.paramInputs.set(keyName, valueName);
    this.paramInputsKeys = Array.from(this.paramInputs.keys());
  }

  public save(): void {
    this.editMode = false;

    const parameters = new Map<string, string>();
    for (let i = 0; i < this.paramInputsKeys.length; i++) {
      const keyName = "paramKey" + i;
      const parameter = this.formGroup.get(keyName)?.value;
      const valueName = "paramValue" + i;
      const value = this.formGroup.get(valueName)?.value;

      parameters.set(parameter, value);
    }

    const updatedEquipment: Equipment = {
      id: this.equipmentId,
      name: this.equipment.name,
      serialNumber: this.formGroup.getRawValue().serialNumber,
      storageLocation: this.formGroup.getRawValue().storageLocation,
      parameters: parameters
    };

    this.equipmentService.deleteEquipment(this.equipmentId);
    this.equipmentService.addEquipment(updatedEquipment);
    this.ngOnInit();
  }

  public close(): void {
    this.editMode = false;
    this.paramInputs = new Map(this.tempParamInputs);
    this.paramInputsKeys = this.tempParamInputsKeys.slice();
  }

}
