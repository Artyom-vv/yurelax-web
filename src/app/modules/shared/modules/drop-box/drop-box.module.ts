import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropBoxComponent } from './drop-box.component';
import { DropDirective } from './directives/drop.directive';



@NgModule({
    declarations: [
        DropBoxComponent,
        DropDirective
    ],
    exports: [
        DropBoxComponent
    ],
    imports: [
        CommonModule
    ]
})
export class DropBoxModule { }
