import { Component} from "@angular/core";
import {DashboardPageComponent} from "../dashboard-page.component";

@Component({
    selector: "dashboard-page-desktop",
    templateUrl: "./dashboard-page.component.desktop.html",
    styleUrls: [
        "../../common/base/base.component.scss",
        "./dashboard-page.component.desktop.scss"
    ],
})
export class DashboardPageComponentDesktop extends DashboardPageComponent {
	elementId = 'visualize-container'
	// reportPath = '/adhoc/aru/KCG_-_Incident_Detail_Ad_Hoc_View_Report'
	// reportPath = '/NRSRS/HOME/idir_shjain/test_shashank_dashboard'
	reportPath = '/NRSRS/WFONE/Dashboards/Wildfire_Staff_Portal_Dashboard'

	
	ngOnInit() {
	}

	ngOnDestroy() {
	}
}
