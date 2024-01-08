import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-cancel',
    template: `
      <div mat-dialog-content>This income will not be saved. Are you shure you want to cencel?</div>
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
  export class DialogCancel implements OnInit, OnDestroy {
    constructor(
      public dialogRef: MatDialogRef<DialogCancel>,
    ) {}
  
    ngOnInit(): void {
    }
    
    onDelete() {
      this.dialogRef.close(true);
    }
  
    ngOnDestroy(): void {
    }
  }
  