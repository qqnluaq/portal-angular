import {ChangeDetectionStrategy, Component} from "@angular/core";
import {HomeComponent} from "../home.component";

@Component({
    selector: "wfrm-home-mobile",
    templateUrl: "./home.component.mobile.html",
    styleUrls: [
        "../../common/base/base.component.scss",
        "../../common/base/mobile.component.scss",
        "../../common/base-collection/collection.component.mobile.scss",
        "./home.component.mobile.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponentMobile extends HomeComponent {
}
