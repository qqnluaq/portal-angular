import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MapPageComponent} from "../map-page.component";

@Component({
    selector: "map-page-mobile",
    templateUrl: "./map-page.component.mobile.html",
    styleUrls: [
        "../../common/base/base.component.scss",
        "../../common/base/mobile.component.scss",
        // "../../common/base-collection/collection.component.mobile.scss",
        "./map-page.component.mobile.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponentMobile extends MapPageComponent {
}
