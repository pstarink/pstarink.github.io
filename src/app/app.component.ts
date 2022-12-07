import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
        <valdemort-templates></valdemort-templates>
        <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}
