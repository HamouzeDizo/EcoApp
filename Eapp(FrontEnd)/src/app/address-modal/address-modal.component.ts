// address-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
