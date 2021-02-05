import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from "@angular/core";
import {ERROR_TYPE, ErrorState} from "../../../store/application/application.state";
import {getDisplayErrorMessage} from "../../../utils/error-messages";
import scrollIntoView from "scroll-into-view-if-needed";

@Component({
    selector: "wfrm-base-warning-panel",
    templateUrl: "./warning-panel.component.html",
    styleUrls: ["../base/base.component.scss", "./warning-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningPanelComponent implements OnChanges {
    @Input() errorState: ErrorState[];
    @Input() titleLabel: string;
    @Input() ignoreFailedPreconditions?: boolean = true;
    @Output() preconditionOkButtonClick?: EventEmitter<any> = new EventEmitter();
    ERROR_TYPE = ERROR_TYPE;
    DISPLAY_ERROR_MESSAGE = getDisplayErrorMessage;
    errorStatesToDisplay: ErrorState[];
    selectedAction: string;

    constructor(protected cdr: ChangeDetectorRef) {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.errorState) {
            this.errorState = <ErrorState[]>changes.errorState.currentValue;
            if (this.errorState && this.errorState.length) {
                this.errorStatesToDisplay = [...this.errorState];

                //only show warnings (409)
                const index: number = this.errorState.findIndex(err => err.type != ERROR_TYPE.WARNING);
                if (index !== -1) {
                    this.errorStatesToDisplay.splice(index, 1);
                    this.errorState = this.errorStatesToDisplay;
                }

                if (this.errorState && this.errorState.length) {
                    this.cdr.detectChanges();
                    const node = document.getElementsByClassName('error-panel')[0];
                    scrollIntoView(node, { behavior: 'smooth', scrollMode: 'if-needed' });
                }
            }

        }
    }

    //Allow setting error state manually - used for dialogs
    setErrorState(errorState: ErrorState[]) {
        this.errorState = errorState;
        this.cdr.detectChanges();
    }

    clearErrorState() {
        this.errorState = [];
        this.cdr.detectChanges();
    }

    preconditionOkButtonClicked(error: ErrorState): void {
        this.preconditionOkButtonClick.emit({selectedAction: this.selectedAction, error: error});
    }
}
