import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinComponent } from './coin.component';



@NgModule({
    declarations: [
        CoinComponent
    ],
    exports: [
        CoinComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoinModule { }
