import { Injectable } from "@angular/core";
import { AppConfigService, TokenService } from "@wf1/core-ui";

// Exteral Libraries
import { Subject } from "rxjs";
import { UUID } from "angular2-uuid";
import { HttpClient } from "@angular/common/http";

enum ResourceTypes {
    CODE_TABLES = "http://common.nrs.gov.bc.ca/v1/codeTables",
    CODE_HIERARCHIES = "http://common.nrs.gov.bc.ca/v1/codeHierarchies",

    PORTAL_LINKS = "http://wfone.nrs.gov.bc.ca/v1/portalLinkList",

    STATISTICS = "http://wfone.nrs.gov.bc.ca/v1/statistics",
    COSTING = "http://wfone.nrs.gov.bc.ca/v1/costing",

    SELF = "self",
    PREV = "prev",
    NEXT = "next",
}

@Injectable({
	providedIn: 'root',
})
export class WFONEService {

	private topLevelEndpointsUrl: string;

	private readonly restVersion: string = "1";

	private tokenAlgorithm;

	private tokenDetails;
	public tokenDetails$ = new Subject<any>();

	codeTableData: { [table: string]: any };

	private accessToken;
	private topLevelEndpointsPromise: Promise<any>

	constructor(
		private tokenService: TokenService,
		private appConfig: AppConfigService,
		private httpClient: HttpClient
	) { }

	// public setOAuthInfo(jwt) {
	// 	this.accessToken = jwt;
	// 	try {
	// 		let jwtComponents: string[] = this.accessToken.split('.');
	// 		this.tokenDetails = JSON.parse(atob(jwtComponents[1]));
	// 		this.tokenDetails$.next(this.tokenDetails);

	// 	}
	// 	catch (e) {
	// 		this.handleError(e);
	// 	}
	// }

	public getUserSummaryDisplay() {
		const userDetails = this.getUserDetails();
		if (userDetails) {
			return userDetails.given_name + " " + userDetails.family_name + " - " + userDetails.user_id;
		}
		return null;
	}

	private getUserDetails() {
		//console.log(this.getTokenService() ? this.getTokenService().getTokenDetails():null);
		return this.tokenDetails;
	}


	public getUserId(): string {
		return this.tokenDetails ? this.tokenDetails.user_id : null;
	}

	public getUserFamilyName(): string {
		return this.tokenDetails ? this.tokenDetails.family_name : null;
	}

	public getUserGivenName(): string {
		return this.tokenDetails ? this.tokenDetails.given_name : null;
	}

	public getUserEmail(): string {
		return this.tokenDetails ? this.tokenDetails.email : null;
	}

	public hasScope(scope: string): boolean {
		if (this.tokenDetails && this.tokenDetails.scope) {
			return this.tokenDetails.scope.includes(scope);
		}
		return false;
	}


	// Permissions
	canViewPortal(): boolean {
		return this.hasScope("WFONE.PORTAL_VIEWER");
	}

	canGetTopLevel(): boolean {
		return this.hasScope("WFONE.GET_PORTAL_LINKS");
	}

	canGetPortalLinks(): boolean {
		return this.hasScope("WFONE.GET_PORTAL_LINKS");
	}

	canGetStatisticsInfo(): boolean {
		return this.hasScope("WFONE.GET_STATISTICS");
	}

	canGetCostingInfo(): boolean {
		return this.hasScope("WFONE.GET_COSTING");
	}


	getTokenDetails() {
		return this.tokenDetails;
	}

	// setTopLevelEndpointsUrl(url: string) {
	// 	this.topLevelEndpointsUrl = url;
	// }

	handleError(err) {
		throw err;
	}

	// ====================================================================================================

	getTopLevelEndpoints() {
		var self = this

		if ( !this.topLevelEndpointsPromise )
			this.topLevelEndpointsPromise = this.appConfig.loadAppConfig()
				.then( function () {
					return self.httpClient.get( self.appConfig.getConfig()[ 'wfone-portal-rest.url' ] ).toPromise()
				} )
				.then( function ( resp ) {
					console.log( resp )
					return resp
				} )

		return this.topLevelEndpointsPromise
   }

	// ====================================================================================================

	// getCodeTables(codeTableName) {
	// 	let queryParams = { "codeTableName": codeTableName };

	// 	return this.getTopLevelEndpoints().then(
	// 		(topLevel) => this.process(ResourceTypes.CODE_TABLES, topLevel, null, queryParams).then(data => data[0])
	// 	);
	// }

	// getCodeHierarchies(codeHierarchyName) {
	// 	let queryParams = { "codeHierarchyName": codeHierarchyName };

	// 	return this.getTopLevelEndpoints().then(
	// 		(topLevel) => this.process(ResourceTypes.CODE_HIERARCHIES, topLevel, null, queryParams).then(data => data[0])
	// 	);
	// }

	// ====================================================================================================

	getPortalLinks() {
		return this.getResource( ResourceTypes.PORTAL_LINKS, this.getTopLevelEndpoints() )
			.then( function ( resp ) {
				console.log( resp )
				return resp.collection
			} )
		// return this.getTopLevelEndpoints().then(
		// 	topLevel => this.process(ResourceTypes.PORTAL_LINKS, topLevel).then(data => data[0])
		// );
	}

	// getStatistics(reportDate: Date) {
	// 	let queryParams = {
	// 		"reportDate": reportDate ? reportDate.getTime() : null
	// 	};

	// 	return this.getTopLevelEndpoints().then(
	// 		topLevel => this.process(ResourceTypes.STATISTICS, topLevel, null, queryParams).then(data => data[0])
	// 	);
	// }

	// getCostingData(reportDate: Date) {
	// 	let queryParams = {
	// 		"reportDate": reportDate ? reportDate.getTime() : null
	// 	};

	// 	return this.getTopLevelEndpoints().then(
	// 		topLevel => this.process(ResourceTypes.COSTING, topLevel, null, queryParams).then(data => data[0])
	// 	);
	// }


	// ====================================================================================================


	getResource( type: ResourceTypes, parent ) {
		var self = this

		return Promise.resolve( parent )
			.then( function ( parentResource ) {
				if ( !parentResource.links ) throw new Error( 'Unsupported Operation' )
				
				var matchedLinks = parentResource.links.filter( function ( lk ) {
					return lk.rel == type
				} )
				if ( matchedLinks.length != 1 ) throw new Error( 'Unsupported Operation: ' + type )

				var url = matchedLinks[ 0 ].href,
					method = matchedLinks[ 0 ].method.toLowerCase()

				return self.httpClient[ method ]( url ).toPromise()
			} )
	}


	// process(resourceType, parentResource, resource?, queryParams?, headers?) {
	// 	console.log(resourceType, parentResource);
	// 	let foundOperation = false;
	// 	return new Promise((resolve, reject) => {
	// 		if (parentResource && parentResource.links) {
	// 			parentResource.links.forEach(link => {
	// 				if (link['rel'] === resourceType) {
	// 					foundOperation = true;
	// 					this.request(link['href'], link['method'], resource, queryParams, headers).then(
	// 						result => resolve(result),
	// 						error => reject(error)
	// 					)
	// 						.catch(error => reject(error));
	// 				}
	// 			});

	// 			if (!foundOperation) {
	// 				reject({ error: 'Unsupported Operation ' + resourceType });
	// 			}
	// 		}
	// 	});
	// }

	// buildUrlWithQueryParamString(url, queryParams) {
	// 	if (queryParams) {
	// 		if (url.indexOf('?') === -1) {
	// 			url = url.concat('?');
	// 		}
	// 		else {
	// 			url = url.substr(0, url.indexOf('?') + 1);
	// 		}

	// 		for (let k in queryParams) {
	// 			if (queryParams.hasOwnProperty(k) && queryParams[k]) {
	// 				url = url.concat(k).concat('=').concat(queryParams[k]).concat('&');
	// 			}
	// 		}
	// 	}

	// 	return url;
	// }

	// request(url, method, resource?, queryParams?, additionalHeaders?) {
	// 	if (!queryParams) {
	// 		queryParams = {};
	// 	}
	// 	Object.assign(queryParams, { "nocache": new Date().getTime() });

	// 	url = this.buildUrlWithQueryParamString(url, queryParams);

	// 	let requestId = "WFONEUI" + UUID.UUID().replace(/-/g, '').toUpperCase();

	// 	console.log('<request ( ' + requestId + ' )' + url);

	// 	return new Promise((resolve, reject) => {
	// 		const xhr = new XMLHttpRequest();

	// 		xhr.open(method, url);

	// 		let headers = {
	// 			"Authorization": "Bearer " + this.accessToken,
	// 			"Rest-Version": this.restVersion,
	// 			"Accept": "application/json",
	// 			"Content-type": "application/json",
	// 			"requestId": requestId
	// 		};

	// 		Object.assign(headers, additionalHeaders);

	// 		for (let header in headers) {
	// 			xhr.setRequestHeader(header, headers[header]);
	// 		}

	// 		xhr.onload = () => {
	// 			let response = [null, xhr];
	// 			if (xhr.responseText) {
	// 				response = [JSON.parse(xhr.responseText), xhr];
	// 			}

	// 			if (xhr.readyState == 4 && xhr.status >= 400) {
	// 				console.log('Error: ' + requestId);
	// 				reject(response);
	// 			}
	// 			resolve(response);
	// 		};

	// 		xhr.onerror = () => reject(xhr.statusText);

	// 		if (resource) {
	// 			xhr.send(JSON.stringify(resource));
	// 		}
	// 		else {
	// 			xhr.send();
	// 		}
	// 	});
	// }
}



// loadAppConfig() {
//     // console.log("loading app config");
//      let http = new HttpClient(this.httpHandler);
//      return http.get(this.libConfig.configurationPath).toPromise().then((data: ApplicationConfig) => {
//          this.appConfig = data;
//          this.config.next(this.appConfig);
//          this.config.complete();
//      });
//    }
 