import {Component, OnDestroy, OnInit} from "@angular/core";
import {BaseComponent} from "../common/base/base.component";

@Component({
    selector: "wfrm-sign-out-page",
    templateUrl: "./sign-out-page.component.html",
    styleUrls: ["./sign-out-page.component.scss"]
})
export class SignOutPageComponent extends BaseComponent implements OnInit, OnDestroy {


    ngOnInit() {

        const appConfig = (<any>this.appConfigService.getConfig()).application;
        let url = appConfig.siteminderUrlPrefix + appConfig.baseUrl + "&retnow=1";
        window.location.href = url;
    }

    ngOnDestroy() {

    }

}
