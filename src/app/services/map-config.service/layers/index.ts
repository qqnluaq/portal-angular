import { BCWildfireConfigLayerConfig } from "./bc-wildfire.config";
import { RoadsLayerConfig } from "./roads.config";
import { WildfireResponseInfrastructureLayerConfig } from "./wildfire-response-infrastructure.config";
import { FirePerimetersLayerConfig } from "./fire-perimeters.config";
import { WeatherLayerConfig } from "./weather.config";
import { ActiveIncidentsLayerConfig } from "./active-incidents.config";

export function LayerConfig( pref: any ) {
	return [
		...ActiveIncidentsLayerConfig( pref ),
		...WildfireResponseInfrastructureLayerConfig( pref ),
		...BCWildfireConfigLayerConfig( pref ),
		...RoadsLayerConfig( pref ),
		// ...FirePerimetersLayerConfig( pref ),
		...WeatherLayerConfig( pref )
	]
}