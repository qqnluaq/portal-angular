import {Component} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {MapPageContainer} from "./map-page-container.component";

@Component({
    selector: "map-page-container-mobile",
    template: `
        <map-page-mobile
        ></map-page-mobile>`,
        // [collection]="collection$ | async"
        // [searchState]="searchState$ | async"
        // [loadState]="loadState$ | async"
        // [errorState]="errorState$ | async"
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class MapPageContainerMobile extends MapPageContainer {}
