import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from "@angular/core";
import {UpdateService} from "../../services/update.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {RootState} from "../../store";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {ApplicationStateService} from "../../services/application-state.service";
import {addRemoveCdkOverlayClass} from "../../utils";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: "wfrm-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    constructor(private updateService: UpdateService,
                private router: Router, private store: Store<RootState>,
                protected cdr: ChangeDetectorRef,
                protected dialog: MatDialog,
                protected applicationStateService: ApplicationStateService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {
        this.updateService.checkForUpdates();

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        let vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty("--vw", `${vw}px`);

        document.documentElement.style.setProperty("--wf1-gutter-space", this.applicationStateService.getIsMobileResolution() ? "8px" : "16px");
        addRemoveCdkOverlayClass(this.applicationStateService.getIsMobileResolution());

        this.matIconRegistry.addSvgIcon(
            "filter-cancel",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/app-icons/filter-cancel.svg")
        );

        this.matIconRegistry.addSvgIcon(
            "incident",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/app-icons/incident.svg")
        );
    }


    @HostListener("window:orientationchange", ["$event"])
    onOrientationChange(event) {
        setTimeout(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);

            let vw = window.innerWidth * 0.01;
            document.documentElement.style.setProperty("--vw", `${vw}px`);

            addRemoveCdkOverlayClass(this.applicationStateService.getIsMobileResolution());
            document.documentElement.style.setProperty("--wf1-gutter-space", this.applicationStateService.getIsMobileResolution() ? "8px" : "16px");
        }, 250);
    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        setTimeout(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);

            let vw = window.innerWidth * 0.01;
            document.documentElement.style.setProperty("--vw", `${vw}px`);

            addRemoveCdkOverlayClass(this.applicationStateService.getIsMobileResolution());
            document.documentElement.style.setProperty("--wf1-gutter-space", this.applicationStateService.getIsMobileResolution() ? "8px" : "16px");

        }, 250);
    }

    ngOnInit(): void {
    }

}
