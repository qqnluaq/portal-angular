import {BaseComponentModel} from "../common/base/base.component.model";
import {DomSanitizer} from "@angular/platform-browser";

export class MapPageComponentModel extends BaseComponentModel {

    constructor(protected sanitizer: DomSanitizer) {
        super(sanitizer);

    }

    public clone(): MapPageComponentModel {
        let clonedModel: MapPageComponentModel = new MapPageComponentModel(this.sanitizer);
        return clonedModel;
    }
}
