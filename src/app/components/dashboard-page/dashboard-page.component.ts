import {DashboardPageComponentModel} from "./dashboard-page.component.model";
import { Directive} from "@angular/core";
import { BaseComponent } from "../common/base/base.component";
import { MapConfigService } from "../../services";

@Directive()
export class DashboardPageComponent extends BaseComponent { 
    // displayLabel = "Personnel Search";

    // protected mapConfigService: MapConfigService;

    initComponent() {
        super.initComponent()

        // this.mapConfigService = this.injector.get( MapConfigService )
    }

    initModels() {
        this.model = new DashboardPageComponentModel(this.sanitizer);
        this.viewModel = new DashboardPageComponentModel(this.sanitizer);
    }

    loadPage() {
        this.updateView();
    }

    getViewModel(): DashboardPageComponentModel {
        return <DashboardPageComponentModel>this.viewModel;
    }
}
