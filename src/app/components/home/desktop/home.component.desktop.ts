import {ChangeDetectionStrategy, Component} from "@angular/core";
import {HomeComponent} from "../home.component";

@Component({
    selector: "wfrm-home-desktop",
    templateUrl: "./home.component.desktop.html",
    styleUrls: [
        "../../common/base/base.component.scss",
        "../../common/base-collection/collection.component.desktop.scss",
        "./home.component.desktop.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponentDesktop extends HomeComponent {
}
