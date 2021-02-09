export function WildfireResponseInfrastructureLayerConfig( pref: any ) {
	return [
		{
			id: "airtanker-base",
			type: 'wms',
			title: "Airtanker Base",
			// folder: ["Critical Infrastructure", "Wildfire Response Infrastructure"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			layerName: "CI_BCWS_AIRTANKER_BASE"
		},
		{
			id: "attack-base",
			type: 'wms',
			title: "Attack Base",
			// folder: ["Critical Infrastructure", "Wildfire Response Infrastructure"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			layerName: "CI_BCWS_ATTACK_BASE"
		},
		{
			id: "equipment-depot",
			type: 'wms',
			title: "Equipment Depot",
			// folder: ["Critical Infrastructure", "Wildfire Response Infrastructure"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			layerName: "CI_BCWS_EQUIPMENT_DEPOT"
		},
		{
			id: "admin-office",
			type: 'wms',
			title: "Admin Office",
			// folder: ["Critical Infrastructure", "Wildfire Response Infrastructure"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			layerName: "CI_BCWS_ADMIN_OFFICE"
		}
	]
}