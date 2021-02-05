import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";

import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ApplicationStateService} from "../../../services/application-state.service";
import {RootState} from "../../../store";
import {ErrorState} from "../../../store/application/application.state";

@Component({
    selector: "wfrm-base-expansion-panel",
    templateUrl: "./base-expansion-panel.component.html",
    styleUrls: ["../base/base.component.scss", "./base-expansion-panel.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseExpansionPanelComponent {
    mobile: boolean;

    @Output() primaryActionButtonClick: EventEmitter<any> = new EventEmitter();
    @Output() secondaryActionButtonClick: EventEmitter<any> = new EventEmitter();
    @Output() headerActionButtonClick: EventEmitter<any> = new EventEmitter();

    @Input() errorState: ErrorState[];
    @Input() isLoading: boolean = false;
    @Input() expanded?: boolean = true;

    @Input() titleLabel: string;
    @Input() panelDisabled?: boolean = false;

    @Input() primaryButtonDisabled?: boolean = false;
    @Input() primaryButtonLabel?: string;
    @Input() primaryButtonHidden?: boolean = false;

    @Input() secondaryButtonDisabled?: boolean = false;
    @Input() secondaryButtonLabel?: string;
    @Input() secondaryButtonHidden?: boolean = false;

    @Input() headerButtonDisabled?: boolean = false;
    @Input() headerButtonLabel?: string;
    @Input() headerButtonHidden?: boolean = false;

    @Input() warningMessage?: string;
    @Input() simplePanel?: boolean = false;

    constructor(
        protected applicationStateService: ApplicationStateService,
        protected sanitizer: DomSanitizer,
        protected fb: FormBuilder,
        protected store: Store<RootState>
    ) {
        this.mobile = applicationStateService.getIsMobileResolution();
        this.initModels();
    }

    initModels() {

    }

    secondaryActionButtonClicked(): void {
        this.secondaryActionButtonClick.emit();
    }

    primaryActionButtonClicked(): void {
        this.primaryActionButtonClick.emit();
    }

    headerActionButtonClicked(): void {
        this.headerActionButtonClick.emit();
    }
}
