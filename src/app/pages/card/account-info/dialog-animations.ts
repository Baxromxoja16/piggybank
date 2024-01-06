import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-animations-example-dialog',
    template: ` <h1 mat-dialog-title>Delete file</h1>
      <div mat-dialog-content>Are you sure you want to delete this account?</div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button mat-dialog-close (click)="onDelete()" cdkFocusInitial>Yes</button>
      </div>`,
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogTitle,
      MatDialogContent,
    ],
  })
  export class DialogAnimationsExampleDialog implements OnInit, OnDestroy {
    constructor(
      public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    ) {}
  
    ngOnInit(): void {
    }
    
    onDelete() {
      this.dialogRef.close(true);
    }
  
    ngOnDestroy(): void {
    }
  }
  