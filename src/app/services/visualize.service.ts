import { Injectable } from "@angular/core";
import { AppConfigService } from "@wf1/core-ui";

@Injectable()
export class VisualizeService {
	preferencesPromise: Promise<any>

	constructor(
		private appConfig: AppConfigService
	) {
		var self = this 

        this.appConfig.loadAppConfig().then( function () {
            var pref = self.appConfig.getConfig()
			let themeHref = `${pref[ 'jasper.url' ]}/_themes/${pref[ 'jasper.theme.hash' ]}/theme.css`.split("/").slice(0, -1).join("/");

			window[ 'visualize' ].config( {
				server: 	pref[ 'jasper.url' ],
				scripts: 	`runtime/${pref[ 'jasper.scripts.hash' ]}/optimized-scripts`,
				logEnabled: true,
				logLevel: 	"error",
				_showInputControls: true,
				theme: {
					href: themeHref
				}
			} )		
		} )
	}
}
