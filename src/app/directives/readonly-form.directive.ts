import {ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";
import {makeFormFieldNotReadonly, makeFormFieldReadonly} from "../utils";

@Directive({
  selector: '[appWFReadonlyForm]'
})
export class ReadonlyFormDirective implements OnChanges {
  @Input() appWFReadonlyForm: string;
  formHtmlElement: HTMLElement;

  constructor(
      private element: ElementRef,
      protected cdr: ChangeDetectorRef,
      private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appWFReadonlyForm) {
      this.appWFReadonlyForm = changes.appWFReadonlyForm.currentValue;
    }
    this.formHtmlElement = this.element.nativeElement;
    let associatedFormElements = this.formHtmlElement.getElementsByTagName('mat-form-field');
    if (associatedFormElements && associatedFormElements.length) {
      if (this.appWFReadonlyForm) {
        for (let i = 0; i < associatedFormElements.length; i++) {
          let formEl = associatedFormElements.item(i) as HTMLElement;
            makeFormFieldReadonly(this.renderer, formEl);
        }
      } else {
        for (let i = 0; i < associatedFormElements.length; i++) {
          let formEl = associatedFormElements.item(i) as HTMLElement;
          if (!associatedFormElements.item(i).getAttribute("appwfreadonlyfield")) {
            makeFormFieldNotReadonly(this.renderer, formEl);
          }
        }
      }
    }
    this.cdr.detectChanges();
  }
}
