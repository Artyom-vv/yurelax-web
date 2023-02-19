import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header.component';



@NgModule({
    declarations: [
        AuthHeaderComponent
    ],
    exports: [
        AuthHeaderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AuthHeaderModule { }
