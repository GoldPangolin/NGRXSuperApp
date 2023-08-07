import { Component, Output, Input} from '@angular/core';

@Component({
    selector: 'logout-confirmation-dialog',
    template: `
    <h1 mat-dialog-title>Logout</h1>
    <mat-dialog-content> Are you sure you want to logout?</mat-dialog-content>
    <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false">Cancel</button>
        <button mat-button [mat-dialog-close]="false">OK</button>
    </mat-dialog-actions>
    `,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
                max-width: 300px;
            }

            mat-dialog-actions {
                display: flex;
                justify-content: flex-end;
            }
            
            [mat-button] {
                padding: 0;
            }
        `
    ]
}) export class LogoutConfirmationDialogComponent {

}