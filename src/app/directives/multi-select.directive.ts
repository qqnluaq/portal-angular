import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from "@angular/core";
import {arrayEquals} from "../utils";

declare var $: any;

@Directive({
    selector: '[appWFMultiSelect]'
})
export class MultiSelectDirective implements AfterViewInit, OnChanges {
    @Input() appWFPlaceholder?: string;
    @Input() options: any[];
    @Input() selected: any[];
    @Input() maxSelect?: number;
    @Input() showSelectAll?: boolean = true;
    @Output() updated: EventEmitter<any> = new EventEmitter();
    selectHtmlElement: HTMLSelectElement;
    multiselect;
    hasDisabledOptions = false;

    constructor(
        private element: ElementRef,
        private cdr: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !arrayEquals(changes.options.currentValue, changes.options.previousValue)) {
            this.options = changes.options.currentValue;
            setTimeout(() => {
                this.cdr.detectChanges();
                this.multiselect.multipleSelect("refresh");
            });

        }
        if (changes.selected && !arrayEquals(changes.selected.currentValue, changes.selected.previousValue)) {
            setTimeout(() => {
                this.selected = changes.selected.currentValue;
                this.multiselect.multipleSelect("setSelects", this.selected);
            });
        }
    }

    ngAfterViewInit() {
        this.selectHtmlElement = this.element.nativeElement;
        let self = this;
        this.selectHtmlElement.addEventListener("change", function () {
            self.onClick();
        });
        this.multiselect = $(this.selectHtmlElement).multipleSelect({
            placeholder: this.appWFPlaceholder ? this.appWFPlaceholder : "Select...",
            minimumCountSelected: 1,
            onClick: this.onClick.bind(this),
            onCheckAll: this.checkAll.bind(this),
            onUncheckAll: this.uncheckAll.bind(this),
            filter: true,
            selectAll: this.showSelectAll,
        });
    }

    onClick() {
        let selected = [];
        for (let i = 0; i < this.selectHtmlElement.selectedOptions.length; i++) {
            selected.push(this.selectHtmlElement.selectedOptions.item(i).value);
        }
        if (this.maxSelect) { //if a max select value has been specified
            if (selected.length >= this.maxSelect) { //check if max selection limit has been reached
                for (let i = 0; i < this.selectHtmlElement.options.length; i++) {
                    if (selected.includes(this.selectHtmlElement.options.item(i).value)) { //enable all selected options
                        this.selectHtmlElement.options.item(i).removeAttribute("disabled");
                    } else { //disable all unselected options
                        this.selectHtmlElement.options.item(i).setAttribute("disabled", "disabled");
                    }
                }
                this.hasDisabledOptions = true;
                this.multiselect.multipleSelect("refresh"); //need to refresh the element to cause a re-render
            } else if (this.hasDisabledOptions) { //if max selection limit has not been reached
                for (let i = 0; i < this.selectHtmlElement.options.length; i++) { //enable all options
                    this.selectHtmlElement.options.item(i).removeAttribute("disabled");
                }
                this.hasDisabledOptions = false;
                this.multiselect.multipleSelect("refresh"); //need to refresh the element to cause a re-render
            }
        }

        this.updated.emit(selected);
    }

    uncheckAll() {
        this.updated.emit([]);
    }

    checkAll() {
        let selectedList = [];
        for (let i = 0; i < this.selectHtmlElement.options.length; i++) {
            let option = this.selectHtmlElement.options.item(i);
            selectedList.push(option.value);
        }
        this.updated.emit(selectedList);
    }
}
