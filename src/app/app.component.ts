import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <ng-http-loader 
      [backdrop]="true"
      [backgroundColor]="'#fff'"
      [debounceDelay]="100"
      [extraDuration]="300"
      [minDuration]="300"
      [opacity]=".6"
      [backdropBackgroundColor]="'#000'"
      spinner="sk-chasing-dots">
    </ng-http-loader>
    <valdemort-templates></valdemort-templates>
    <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}
