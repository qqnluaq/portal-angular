import { ActiveIncidentsLayerConfig } from './map-layer-config/active-incidents.config'
import { ReferenceLayerConfig } from './reference-layer-config'

export function MapConfig(pref: any) {
	return {
		viewer: {
			type: 'esri3d',
			location: {
				center: [-126.58333333, 56.66666667],
				zoom: 5
			}
		},
		tools: [
			{
				type: 'zoom',
				enabled: true,
				order: 1
			},
			{
				type: 'pan',
				enabled: true,
				order: 2
			},
			{
				type: 'reset-view',
				enabled: true
			},
			{
				type: 'current-location',
				enabled: true
			},
			{
				type: 'baseMaps',
				enabled: true,
				choices: ['Imagery', 'Streets', 'Topographic']
			},
			{
				type: 'layers',
				enabled: true,
				command: {
					allVisibility: false,
					filter: false,
					legend: false
				},
				glyph: {
					visible: "check_box",
					hidden: "check_box_outline_blank"
				},
				legend: true,
				display: [
					// { id: "active-incidents", isVisible: true },
					{ 
						type: 'group', 
						title: 'Active Incidents', 
						isVisible: true, 
						items: [
							{ id: 'active-incident-clusters', isVisible: true },
							{ id: 'active-incidents-under-control', isVisible: true },
							{ id: 'active-incidents-being-held', isVisible: true },
							{ id: 'active-incidents-out', isVisible: true },
							{ id: 'active-incidents-out-of-control', isVisible: true },
						] 
					},
					{
						title: 'Critical Infrastructure', type: 'folder', isVisible: false, isExpanded: false, items: [
							{
								title: 'Wildfire Response Infrastructure', type: 'folder', isVisible: true, isExpanded: true, items: [
									{ id: "airtanker-base", isVisible: true },
									{ id: "attack-base", isVisible: true },
									{ id: "equipment-depot", isVisible: true },
									{ id: "admin-office", isVisible: true }
								]
							}
						]
					},
					{
						title: 'Boundaries', type: 'folder', isVisible: false, isExpanded: false, items: [
							{
								title: 'BC Wildfire', type: 'folder', isVisible: true, isExpanded: true, items: [
									{ id: "fire-centre", isVisible: true },
									{ id: "fire-zone", isVisible: true }
								]
							}
						]
					},
					{
						title: 'Transportation and Trails', type: 'folder', isVisible: false, isExpanded: false, items: [
							{
								title: 'Roads', type: 'folder', isVisible: true, items: [
									{ id: 'roads', isVisible: true }
								]
							}
						]
					},
					// { id: 'fire-perimeters', isVisible: false },
					{ id: 'radar-1km-rrai--radarurpprecipr14-linear', isVisible: false }
				]
			},
			{
				type: "location",
				enabled: false
			},
			{
				type: "identify",
				title: "Identify",
				enabled: true,
				showTitle: false,
				showWidget: false,
				showPanel: true,
				radius: 20,
				command: {
					attributeMode: false,
					clear: false,
					nearBy: false
				},
				internalLayers: [
					{
						id: "@identify-search-area",
						title: "Identify Search Area",
						style: [
							{
								stroke: false,
								fill: true,
								fillColor: "white",
								fillOpacity: 0.5
							},
							{
								strokeWidth: 2,
								strokeColor: "black",
								strokeOpacity: 1,
								strokeCap: "butt",
								strokeDashes: "6,6",
								strokeDashOffset: 6
							},
							{
								strokeWidth: 2,
								strokeColor: "white",
								strokeOpacity: 1,
								strokeCap: "butt",
								strokeDashes: "6,6"
							}
						],
						legend: {
							line: true
						}
					},
					{
						id: "@identify-edit-search-area",
						title: "Identify Edit Search Area",
						style: [
							{
								strokeWidth: 3,
								strokeColor: "red",
								strokeOpacity: 1
							}
						],
						legend: {
							line: true
						}
					},
					{
						id: "@identify-location",
						title: "Identify Location",
						style: {
							strokeWidth: 3,
							strokeColor: "black",
							strokeOpacity: 1,
							fill: true,
							fillColor: "white",
							fillOpacity: 0.5
						},
						legend: {
							point: true
						}
					}
				]
			}
		],
		layers: [
			...ActiveIncidentsLayerConfig(pref),
			...ReferenceLayerConfig(pref)
		]
	}
};
