import {BaseComponentModel} from "../common/base/base.component.model";
import {DomSanitizer} from "@angular/platform-browser";

export class DashboardPageComponentModel extends BaseComponentModel {

    constructor(protected sanitizer: DomSanitizer) {
        super(sanitizer);

    }

    public clone(): DashboardPageComponentModel {
        let clonedModel: DashboardPageComponentModel = new DashboardPageComponentModel(this.sanitizer);
        return clonedModel;
    }
}
