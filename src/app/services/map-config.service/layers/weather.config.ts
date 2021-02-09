export function WeatherLayerConfig( pref: any ) {
    return [
        {
            "id": "radar-1km-rrai--radarurpprecipr14-linear",
            "type": "wms",
            "title": "Radar Precipitation Rate",
            "isQueryable": false,
            "opacity": 0.65,
            "minScale": null,
            "maxScale": null,
            "titleAttribute": null,
            "attributes": false,
            "queries": null,
            "serviceUrl": "https://geo.weather.gc.ca/geomet",
            "layerName": "RADAR_1KM_RRAI",
            "styleName": ""
        },
        {
            "id": "current-conditions--default",
            "type": "wms",
            "title": "Current Weather Conditions",
            "isQueryable": false,
            "opacity": 0.65,
            "minScale": null,
            "maxScale": null,
            "titleAttribute": null,
            "attributes": false,
            "queries": null,
            "serviceUrl": "https://geo.weather.gc.ca/geomet",
            "layerName": "CURRENT_CONDITIONS",
            "styleName": "default"
        }
    ]
}