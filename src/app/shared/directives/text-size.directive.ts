import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appTextSize]'
})
export class TextSizeDirective {
  private _fontWeight = 'normal';

  @Input()
  get fontWeight() {
    return this._fontWeight;
  }

  set fontWeight(newValue: string) {
    this._fontWeight = newValue;
    this.setFontWeight();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
    ) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
   }

   setFontWeight(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', this.fontWeight);
   }
}
