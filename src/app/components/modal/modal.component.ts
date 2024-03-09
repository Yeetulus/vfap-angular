import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModalParams} from "../../models/modal/modal-params";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  formData: any = {};
  _data: ModalParams
  constructor(
      public dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ModalParams
  ) {
    this._data = data;
  }

  onSubmit(): void {
    this.dialogRef.close(this.formData);
  }

  onCancel(): void {
    this.formData = undefined;
    this.dialogRef.close();
  }

  ngOnInit(): void {
    for (let form of this._data.fields){
      this.formData[form.name] = form.initialValue;

    }
  }
}
