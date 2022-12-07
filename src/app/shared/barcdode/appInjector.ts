import { Injector } from "@angular/core";

export let AppInjector: Injector;

export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
