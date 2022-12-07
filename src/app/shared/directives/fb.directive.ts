import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[fb]'
})
export class FBDirective implements AfterViewInit {
  @Input('fb') col: string;
  constructor(private elRef: ElementRef) {
  }
  ngAfterViewInit(): void {
    const cols = this.col.split(',');
    this.elRef.nativeElement.style.color = cols[0];
    if (cols.length > 1) {
      this.elRef.nativeElement.style.backgroundColor = cols[1];
    }
  }
}

@Directive({
  selector: '[b]'
})
export class BoldDirective implements AfterViewInit {
  @Input('b') bold: string;
  constructor(private elRef: ElementRef) {
  }
  ngAfterViewInit(): void {
    this.elRef.nativeElement.style.fontWeight = "bold";
  }
}
