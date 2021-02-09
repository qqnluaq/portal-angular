import {MapPageComponentModel} from "./map-page.component.model";
import { Directive} from "@angular/core";
import { BaseComponent } from "../common/base/base.component";
import { MapConfigService } from "../../services";

@Directive()
export class MapPageComponent extends BaseComponent { 
    // displayLabel = "Personnel Search";

    protected mapConfigService: MapConfigService;

    initComponent() {
        super.initComponent()

        this.mapConfigService = this.injector.get( MapConfigService )
    }

    initModels() {
        this.model = new MapPageComponentModel(this.sanitizer);
        this.viewModel = new MapPageComponentModel(this.sanitizer);
    }

    loadPage() {
        this.updateView();
    }

    getViewModel(): MapPageComponentModel {
        return <MapPageComponentModel>this.viewModel;
    }
}
