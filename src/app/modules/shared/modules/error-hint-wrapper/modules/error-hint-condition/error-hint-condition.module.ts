import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHintConditionComponent } from './error-hint-condition.component';



@NgModule({
    declarations: [
        ErrorHintConditionComponent
    ],
    exports: [
        ErrorHintConditionComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ErrorHintConditionModule { }
