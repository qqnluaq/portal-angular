import {Injectable} from "@angular/core";
import { AppConfigService } from "@wf1/core-ui";
// import { environment } from '../../environments/environment';

@Injectable( {
    providedIn: 'root',
} )
export class WFMapService {
    private patchPromise: Promise<any>;
    // private smkBaseUrl // = `${window.location.protocol}//${window.location.host}${environment.app_base}assets/smk/`

    constructor(
		private appConfig: AppConfigService
    ) {
    }

    setHandler( id, method, handler ): Promise<any> {
        const SMK = window[ 'SMK' ]

        return this.patch().then( function () {
            SMK.HANDLER.set( id, method, handler )
        } )
    }

    createSMK( option: any ) {
        var self = this

        const SMK = window[ 'SMK' ]

        return this.patch()
            .then( function () { return self.getBaseUrl() } )
            .then( function ( base ) {
                return SMK.INIT( { 
                    baseUrl: base,
                    ...option 
                } )
            } )
    }

    getBaseUrl(): Promise<string> {
        var self = this

        return this.appConfig.loadAppConfig().then( function () {
            return `${ self.appConfig.getConfig().application.baseUrl }assets/smk/`
        } )
    }

    private patch(): Promise<any> {
        var self = this
        
        const include = window[ 'include' ]
        const SMK = window[ 'SMK' ]
        const jQuery = window[ 'jQuery' ]
        
        if ( !this.patchPromise ) this.patchPromise = Promise.resolve()
            .then( function () { return self.getBaseUrl() } )
            .then( function ( base ) {
                console.log( "start patching SMK" );

                // Create a DIV for a temporary map.
                // This map is used to ensure that SMK is completely loaded before monkey-patching
                var temp = document.createElement( 'div' )
                document.body.appendChild( temp )

                return SMK.INIT( {
                    id: 999,
                    containerSel: temp,
                    baseUrl: base
                } )
                .then( function ( smk ) {
                    // monkey patch Topographic & Imagery basemaps to double tilesize for hi-dpi displays
                    SMK.TYPE.Viewer.prototype.basemap.Topographic.option.tileSize = 512
                    SMK.TYPE.Viewer.prototype.basemap.Topographic.option.zoomOffset = -1

                    SMK.TYPE.Viewer.prototype.basemap.Imagery.option.tileSize= 512
                    SMK.TYPE.Viewer.prototype.basemap.Imagery.option.zoomOffset= -1

                    smk.destroy()
                    temp.parentElement.removeChild( temp )
                } )
            } )
            // .then( function () {
            //     // add a component to Vue global used by SMK
            //     const Vue = window['Vue']

            //     return include( 'component' ).then( function () {
            //         Vue.component( 'wf-feature', {
            //             template: '#wf-feature-template',
            //             // extends: SMK.TYPE.VueFeatureComponent
            //             extends: SMK.COMPONENT.FeatureBase        
            //         } );
            //     } )
            // } )            
            .then( function () {                
                // SMK.TYPE.Layer.wms.leaflet.prototype.getFeaturesInArea = function ( area, view, option ) {
                //     var self = this

                //     var extraFilter = this.config.where || ''
                //     if ( extraFilter ) extraFilter = ' AND ' + extraFilter

                //     var polygon = 'SRID=4326;POLYGON ((' + area.geometry.coordinates[ 0 ].map( function ( c ) { return c.join( ' ' ) } ).join( ',' ) + '))'

                //     var data = {
                //         service:        "WFS",
                //         version:        '1.1.0',
                //         request:        "GetFeature",
                //         srsName:        'EPSG:4326',
                //         typename:       this.config.layerName,
                //         outputformat:   "application/json",
                //         cql_filter:     'INTERSECTS(' + (this.config.geometryAttribute||'GEOMETRY') + ',' + polygon + ')' + extraFilter
                //     }
            
                //     return SMK.UTIL.makePromise( function ( res, rej ) {
                //         jQuery.ajax( {
                //             url:        self.config.serviceUrl,
                //             method:     'GET',
                //             data:       data,
                //             dataType:   'json',
                //         } ).then( res, rej )
                //     } )
                //     .then( function ( data ) {
                //         // console.log( data )
            
                //         if ( !data ) throw new Error( 'no features' )
                //         if ( !data.features || data.features.length == 0 ) throw new Error( 'no features' )
            
                //         return data.features.map( function ( f, i ) {
                //             if ( self.config.titleAttribute )
                //                 f.title = f.properties[ self.config.titleAttribute ]
                //             else
                //                 f.title = 'Feature #' + ( i + 1 )
            
                //             return f
                //         } )
                //     } )
                // }            

                SMK.TYPE.Viewer.leaflet.prototype.mapResized = function () {
                    var self = this
                    setTimeout( function () {
                        self.map.invalidateSize(true)
                        console.log('resized')    
                    }, 1000 )
                } 
            } )
            .then( function () {
                console.log( "done patching SMK" );
            } )    

        return this.patchPromise
    }
}


