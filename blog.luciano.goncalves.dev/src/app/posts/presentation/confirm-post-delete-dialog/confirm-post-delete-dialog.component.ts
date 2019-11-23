import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostEdit } from '../../post';

@Component({
  selector: 'lgblog-confirm-post-delete-dialog',
  templateUrl: './confirm-post-delete-dialog.component.html',
  styleUrls: ['./confirm-post-delete-dialog.component.scss']
})
export class ConfirmPostDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmPostDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostEdit) {
      console.log(data);
     }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
