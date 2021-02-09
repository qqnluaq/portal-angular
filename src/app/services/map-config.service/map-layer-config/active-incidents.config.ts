export function ActiveIncidentsLayerConfig( pref: any ) {
	return [
		incidentLayer( pref, 'under-control', 'Under Control', "STAGE_OF_CONTROL_CODE = 'UNDER CONTROL'" ),
		incidentLayer( pref, 'being-held', 'Being Held', "STAGE_OF_CONTROL_CODE = 'BEING HELD'" ),
		incidentLayer( pref, 'out', 'Out', "STAGE_OF_CONTROL_CODE = 'OUT'" ),
		incidentLayer( pref, 'out-of-control', 'Out of Control', "STAGE_OF_CONTROL_CODE = 'OUT OF CONTROL'" ),
		// incidentLayer( 'all', 'All', 'include' ),
		{
			id: 'active-incident-clusters',
			type: 'cluster',
			title: 'Active Incidents'
		}

		// {
		// 	id: "active-incidents",
		// 	type: 'vector',
		// 	title: "Active Incidents",
		// 	dataUrl: 'https://d1wfbs.vividsolutions.com/geoserver/wfs?service=WFS&request=GetFeature&version=2.0.0&typeNames=INCIDENT_ACTIVE_FIRE&outputFormat=json',
		// 	// folder: ["Incidents"],
		// 	// service: "wfone",
		// 	// serviceUrl: pref[ "geoserver.wms.url" ],
		// 	isVisible: true,
		// 	isQueryable: true,
		// 	// layerName: "INCIDENT_ACTIVE_FIRE",
		// 	titleAttribute: "INCIDENT_NUMBER_LABEL",
		// 	attributes: [
		// 		{ name: "INCIDENT_NUMBER_LABEL", title: "Fire Number" },
		// 		{ name: "DISCOVERY_DATE",  title: "Date of Discovery" },
		// 		{ name: "GENERAL_INCIDENT_CAUSE_CAT", title: "Suspected Cause" },
		// 		{ name: "FIRE_SIZE_HA", title: "Estimated Size (ha)" },
		// 		{ name: "STAGE_OF_CONTROL_DESC", title: "Stage of Control" },
		// 		{ name: "INCIDENT_TYPE_DESC", title: "Incident Type" },
		// 		{ name: "FIRE_CLASSIFICATION_DESC", title: "Classification" },
		// 		{ name: "INCIDENT_COMMANDER_NAME", title: "Incident Commander" },
		// 		{ name: "GEOGRAPHIC_DESCRIPTION", title: "Approx Location" },
		// 		{ name: "FIRE_CTR_ORG_UNIT_NAME", title: "Fire Centre" },
		// 		{ name: "FIRE_ZONE_ORG_UNIT_NAME", title: "Zone" }
		// 	]
		// }
	]
}


function incidentLayer( pref, id, title, cql ) {
	return {
		id: 'active-incidents-' + id,
		clusterId: 'active-incident-clusters',
		type: 'vector',
		title: title,
		dataUrl: pref[ "geoserver.wms.url" ] + '?service=WFS&request=GetFeature&version=2.0.0&typeNames=INCIDENT_ACTIVE_FIRE&outputFormat=json&cql_filter=' + encodeURIComponent( cql ),
		geometryType: 'point',
		isVisible: true,
		isQueryable: true,
		isOnMap: false,
		titleAttribute: "INCIDENT_NUMBER_LABEL",
		geometryAttribute: 'GEOMETRY',
		attributes: [
			{ name: "INCIDENT_NUMBER_LABEL", title: "Fire Number" },
			{ name: "DISCOVERY_DATE",  title: "Date of Discovery" },
			{ name: "GENERAL_INCIDENT_CAUSE_CAT", title: "Suspected Cause" },
			{ name: "FIRE_SIZE_HA", title: "Estimated Size (ha)" },
			{ name: "STAGE_OF_CONTROL_DESC", title: "Stage of Control" },
			{ name: "INCIDENT_TYPE_DESC", title: "Incident Type" },
			{ name: "FIRE_CLASSIFICATION_DESC", title: "Classification" },
			{ name: "INCIDENT_COMMANDER_NAME", title: "Incident Commander" },
			{ name: "GEOGRAPHIC_DESCRIPTION", title: "Approx Location" },
			{ name: "FIRE_CTR_ORG_UNIT_NAME", title: "Fire Centre" },
			{ name: "FIRE_ZONE_ORG_UNIT_NAME", title: "Zone" }
		],
		style: {
			markerUrl: 'assets/images/icons/incident-' + id + '.svg',
			markerSize: [ 30, 30 ],
			labelAttribute: 'INCIDENT_NUMBER_LABEL',
			labelColor: 'black',
			labelBackgroundColor: '#fabf4f',
		},
		legend: {
			// title: ' ',
			point: true
		}
	}
}

// STAGE_OF_CONTROL_CODE
