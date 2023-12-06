import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appTextSize]'
})
export class TextSizeDirective {
  private _fontWeight = 'normal';
  private _fontSize = '20px';

  @Input()
  get fontWeight() {
    return this._fontWeight;
  }

  set fontWeight(newValue: string) {
    this._fontWeight = newValue;
    this.setFontWeight();
  }

  @Input()
  get fontSize() {
    return this._fontSize;
  }

  set fontSize(newValue: string) {
    this._fontSize = newValue;
    this.setFontSize();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.setFontSize();
    this.setFontWeight();
  }

  setFontSize(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', this.fontSize);
  }

  setFontWeight(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', this.fontWeight);
  }
}