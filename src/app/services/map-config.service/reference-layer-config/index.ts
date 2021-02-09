import { BCWildfireConfigLayerConfig } from "./bc-wildfire.config";
import { RoadsLayerConfig } from "./roads.config";
import { WildfireResponseInfrastructureLayerConfig } from "./wildfire-response-infrastructure.config";
import { FirePerimetersLayerConfig } from "./fire-perimeters.config";
import { WeatherLayerConfig } from "./weather.config";


export function ReferenceLayerConfig( pref: any ) {
	return [
		...WildfireResponseInfrastructureLayerConfig( pref ),
		...BCWildfireConfigLayerConfig( pref ),
		...RoadsLayerConfig( pref ),
		// ...FirePerimetersLayerConfig( pref ),
		...WeatherLayerConfig( pref )
	]
}