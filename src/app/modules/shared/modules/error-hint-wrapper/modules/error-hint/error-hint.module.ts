import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHintComponent } from './error-hint.component';



@NgModule({
    declarations: [
        ErrorHintComponent
    ],
    exports: [
        ErrorHintComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ErrorHintModule { }
