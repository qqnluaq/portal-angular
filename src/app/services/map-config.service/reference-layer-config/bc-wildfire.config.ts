export function BCWildfireConfigLayerConfig( pref: any ) {
	return [
		{   
			id: "fire-centre",
			type: 'wms',
			title: "Fire Centre",
			// folder: ["Boundaries", "BC Wildfire"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			//layerName: "WF1_FIRE_CENTRE_SPG"
			layerName: "FIRE_CENTRE_ADMIN_AREA"
		},
		{
			id: "fire-zone",
			type: 'wms',
			title: "Fire Zone",
			// folder: ["Boundaries", "BC Wildfire"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			// layerName: "WF1_FIRE_ZONE_SPG"
			layerName: "FIRE_ZONE_ADMIN_AREA_SVW"
		}
	]
}