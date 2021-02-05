import {BaseComponentModel} from "../common/base/base.component.model";
import {DomSanitizer} from "@angular/platform-browser";

export class HomeComponentModel extends BaseComponentModel {

    constructor(protected sanitizer: DomSanitizer) {
        super(sanitizer);

    }

    public clone(): HomeComponentModel {
        let clonedModel: HomeComponentModel = new HomeComponentModel(this.sanitizer);
        return clonedModel;
    }
}
