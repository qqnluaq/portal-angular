import {Component} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {DashboardPageContainer} from "./dashboard-page-container.component";

@Component({
    selector: "dashboard-page-container-mobile",
    template: `
        <dashboard-page-mobile
        ></dashboard-page-mobile>`,
        // [collection]="collection$ | async"
        // [searchState]="searchState$ | async"
        // [loadState]="loadState$ | async"
        // [errorState]="errorState$ | async"
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class DashboardPageContainerMobile extends DashboardPageContainer {}
