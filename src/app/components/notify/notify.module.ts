import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SharedModule } from "@shared"
import { NotifyComponent } from "./notify.component"
import { PrimeModule } from "@app/prime.module"
import { DynamicFormModule } from "../dynamic-form/dynamic-form.module"
import { DialogHeaderModule } from "../dialog-header/dialog-header.module"
// import { PrismModule } from "app/components"

@NgModule({
    declarations: [
        NotifyComponent,
    ],
    imports: [
        CommonModule,
        PrimeModule,
        SharedModule,
        DialogHeaderModule,
        // PrismModule,
        DynamicFormModule
    ],
    exports: [
        NotifyComponent
    ]
})
export class NotifyModule { }
