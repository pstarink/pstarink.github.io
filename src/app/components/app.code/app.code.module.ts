import { Component, ElementRef, AfterViewInit, Input, ViewChild, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-code',
    template: `
<pre [ngClass]="'language-' + lang"><code #code><ng-content></ng-content>
</code></pre>`,
    styleUrls: ['./app.doc.component.scss']
})
export class AppCodeComponent implements AfterViewInit {
    @Input() lang = 'markup'
    @ViewChild('code') codeViewChild: ElementRef

    constructor(public el: ElementRef) { }

    ngAfterViewInit() {
        // @ts-ignore
        if (window['Prism']) {
            // @ts-ignore
            window['Prism'].highlightElement(this.codeViewChild.nativeElement)
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AppCodeComponent],
    declarations: [AppCodeComponent],
})
export class AppCodeModule { }
