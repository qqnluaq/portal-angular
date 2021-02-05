import {Component} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {HomeContainer} from "./home-container.component";

@Component({
    selector: "wfrm-home-container-mobile",
    template: `
        <wfrm-home-mobile
        ></wfrm-home-mobile>`,
        // [collection]="collection$ | async"
        // [searchState]="searchState$ | async"
        // [loadState]="loadState$ | async"
        // [errorState]="errorState$ | async"
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class HomeContainerMobile extends HomeContainer {

}
