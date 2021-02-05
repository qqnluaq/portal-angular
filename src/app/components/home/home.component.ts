import {HomeComponentModel} from "./home.component.model";
import {AfterViewInit, Directive, OnChanges, SimpleChanges} from "@angular/core";
import { BaseComponent } from "../common/base/base.component";

@Directive()
export class HomeComponent extends BaseComponent { //implements OnChanges, AfterViewInit {
    // displayLabel = "Personnel Search";

    initModels() {
        this.model = new HomeComponentModel(this.sanitizer);
        this.viewModel = new HomeComponentModel(this.sanitizer);
    }

    loadPage() {
        this.updateView();
    }

    getViewModel(): HomeComponentModel {
        return <HomeComponentModel>this.viewModel;
    }
}
