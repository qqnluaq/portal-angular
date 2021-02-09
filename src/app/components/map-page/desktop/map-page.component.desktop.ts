import { Component} from "@angular/core";
import {MapPageComponent} from "../map-page.component";
import { Subscription } from "rxjs";

@Component({
    selector: "map-page-desktop",
    templateUrl: "./map-page.component.desktop.html",
    styleUrls: [
        "../../common/base/base.component.scss",
        "./map-page.component.desktop.scss"
    ],
})
export class MapPageComponentDesktop extends MapPageComponent {
	mapConfig = null
	smkInstance = null

	// private leftSidebarState$: Subscription;
	// private rightSidebarState$: Subscription;
		
    initMap( smk: any ) {
		// console.log('initMap')

	  	this.smkInstance = smk
		
	  	// this.refreshService.refreshDate$.subscribe(
		// 	function ( refreshDate: Date ) { 
		// 		smk.$viewer.displayContext.layers.setItemVisible( smk.$viewer.displayContext.layers.root.id, false )
		// 		smk.$viewer.updateLayersVisible()
		// 		setTimeout( function () {
		// 			smk.$viewer.displayContext.layers.setItemVisible( smk.$viewer.displayContext.layers.root.id, true )
		// 			smk.$viewer.updateLayersVisible()
		// 		}, 250 )
		// 	}
		// )

		// clicking anywhere on layer name changes vis
		smk.on( 'LayersTool', {
			'layer-click': function ( ev ) {
				smk.$viewer.displayContext.layers.setItemVisible( ev.id, !ev.isVisible )
			}
		} )

		// suppress drag handle for changing identify search radius
		var displaySearchAreaOrig = smk.$tool.IdentifyListTool.displaySearchArea
		smk.$tool.IdentifyListTool.displaySearchArea = function () {
			displaySearchAreaOrig.call( this )
			this.trackMouse = false
		}
	}

	updateMapSize() {
		if ( !this.smkInstance ) return
		
		this.smkInstance.updateMapSize()
	}

	ngOnInit() {
		var self = this

        super.ngOnInit()
		//   this.checkUserPermissions();

		this.mapConfigService.getMapConfig().then( function ( config ) {
			self.mapConfig = [ config ]
            self.cdr.detectChanges();
		})
	}

	ngOnDestroy() {
		// this.leftSidebarState$.unsubscribe();
		// this.rightSidebarState$.unsubscribe();
	}

	setSidebarStateSubscriptions() {
		var self = this

		// this.leftSidebarState$ = this.menuService.isLeftSidebarOpen$.subscribe(
		// 	function ( state: boolean ) {
		// 		self.updateMapSize()
		// 	}
		// )

		// this.rightSidebarState$ = this.menuService.isRightSidebarOpen$.subscribe(
		// 	function ( state: boolean ) {
		// 		self.updateMapSize()
		// 	}
		// )
	}
}
