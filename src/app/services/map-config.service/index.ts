import { Injectable } from "@angular/core";
import { MapConfig } from "./map.config";
import { AppConfigService} from "@wf1/core-ui";

@Injectable()
export class MapConfigService {
	constructor(
		private appConfig: AppConfigService
	) {}

	getMapConfig(): Promise<any> {
		var self = this

		return this.appConfig.loadAppConfig()
			.then( function () {
				return self.appConfig.getConfig()
			} )
			.then( function ( pref ) {
				return MapConfig( pref )
			} )
	}
}
