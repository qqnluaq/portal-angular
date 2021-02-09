export function RoadsLayerConfig( pref: any ) {
	return [
		{   
			id: 'roads',
			type: 'wms',
			title: "Roads",
			// folder: ["Transportation and Trails" , "Roads"],
			// service: "wfgs",
			serviceUrl: pref[ "geoserver.wms.extra.url" ],
			isQueryable: false,
			layerName: "WF1_ROADS"
		}
	]
}