import { ApplicationStateService } from "./application-state.service";
// import { RefreshService } from "./refresh.service";
import { RouterExtService } from "./router-ext.service";
import { SecurityUtilService } from "./security-util.service";
import { UpdateService } from "./update.service";
import { WFMapService } from "./wf-map.service";
import { MapConfigService } from "./map-config.service";
import { VisualizeService } from "./visualize.service";
import { WFONEService } from "./wfone.service";

export const SERVICES = [
	ApplicationStateService,
	// RefreshService,
	RouterExtService,
	SecurityUtilService,
	UpdateService,
	WFMapService,
	MapConfigService,
	VisualizeService,
	WFONEService
];

export * from "./application-state.service";
// export * from "./refresh.service";
export * from "./router-ext.service";
export * from "./security-util.service";
export * from "./update.service";
export * from "./wf-map.service";
export * from "./map-config.service";
export * from "./visualize.service";
export * from "./wfone.service";
