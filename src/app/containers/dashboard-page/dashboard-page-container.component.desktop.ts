import {Component} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {DashboardPageContainer} from "./dashboard-page-container.component";

@Component({
    selector: "dashboard-page-container-desktop",
    template: `
        <dashboard-page-desktop
        ></dashboard-page-desktop>`,
        // [collection]="collection$ | async"
        // [searchState]="searchState$ | async"
        // [loadState]="loadState$ | async"
        // [errorState]="errorState$ | async"
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class DashboardPageContainerDesktop extends DashboardPageContainer {
}
