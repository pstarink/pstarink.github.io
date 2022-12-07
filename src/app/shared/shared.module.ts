import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DisplayMode, ValdemortConfig, ValdemortModule } from "ngx-valdemort";
import { ErrorTemplates } from "./helpers";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger'
import { PrimeModule } from "@app/prime.module";

import {
  FBDirective,
  BoldDirective,
} from "./directives";

import {
  SafePipe
} from "./pipes";

const Modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  PrimeModule,
  ReactiveFormsModule,
  ValdemortModule
];

const Directives = [
  ErrorTemplates,
  BoldDirective,
  FBDirective,
];

const Pipes = [
  SafePipe,
  DatePipe
];

@NgModule({
  imports: [
    ...Modules,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      // trace debug info log warning error fatal
      colorScheme: ['green', 'teal', 'blue', 'gray', 'orange', 'red', 'darkred'],
      disableFileDetails: true,
      timestampFormat: "ss.SSS"
    })
  ],
  declarations: [...Directives],
  exports: [...Modules, ...Directives],
  providers: [...Pipes]
})
export class SharedModule {
  constructor(config: ValdemortConfig) {
    // config.errorsClasses = "ng-dirty ng-invalid"
    // config.errorClasses = 'text-warning'
    config.displayMode = DisplayMode.ONE
    config.shouldDisplayErrors = (control, form) => control.dirty || control.touched
  }
}
