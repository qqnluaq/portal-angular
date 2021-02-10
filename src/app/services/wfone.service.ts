import { Injectable } from "@angular/core";
import { ResourceTypes } from "../../resource/wfone/resource.types";
import { AppConfigService, TokenService } from "@wf1/core-ui";

// Exteral Libraries
import { Subject } from "rxjs";
import { UUID } from "angular2-uuid";

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

	constructor(
		private tokenService: TokenService
	) { }

	public setOAuthInfo(jwt) {
		this.accessToken = jwt;
		try {
			let jwtComponents: string[] = this.accessToken.split('.');
			this.tokenDetails = JSON.parse(atob(jwtComponents[1]));
			this.tokenDetails$.next(this.tokenDetails);

		}
		catch (e) {
			this.handleError(e);
		}
	}

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

	setTopLevelEndpointsUrl(url: string) {
		this.topLevelEndpointsUrl = url;
	}

	handleError(err) {
		throw err;
	}

	// ====================================================================================================

	getTopLevelEndpoints() {
		return this.request(this.topLevelEndpointsUrl, 'GET').then(result => {
			console.log(result);
			return result[0];
		})
			.catch((err) => {
				if (!err) {
					err = 'Failed to get Top Level';
				}
				throw err;
			}
			);
	}

	// ====================================================================================================

	getCodeTables(codeTableName) {
		let queryParams = { "codeTableName": codeTableName };

		return this.getTopLevelEndpoints().then(
			(topLevel) => this.process(ResourceTypes.CODE_TABLES, topLevel, null, queryParams).then(data => data[0])
		);
	}

	getCodeHierarchies(codeHierarchyName) {
		let queryParams = { "codeHierarchyName": codeHierarchyName };

		return this.getTopLevelEndpoints().then(
			(topLevel) => this.process(ResourceTypes.CODE_HIERARCHIES, topLevel, null, queryParams).then(data => data[0])
		);
	}

	// ====================================================================================================

	getPortalLinks() {
		return this.getTopLevelEndpoints().then(
			topLevel => this.process(ResourceTypes.PORTAL_LINKS, topLevel).then(data => data[0])
		);
	}

	getStatistics(reportDate: Date) {
		let queryParams = {
			"reportDate": reportDate ? reportDate.getTime() : null
		};

		return this.getTopLevelEndpoints().then(
			topLevel => this.process(ResourceTypes.STATISTICS, topLevel, null, queryParams).then(data => data[0])
		);
	}

	getCostingData(reportDate: Date) {
		let queryParams = {
			"reportDate": reportDate ? reportDate.getTime() : null
		};

		return this.getTopLevelEndpoints().then(
			topLevel => this.process(ResourceTypes.COSTING, topLevel, null, queryParams).then(data => data[0])
		);
	}


	// ====================================================================================================


	process(resourceType, parentResource, resource?, queryParams?, headers?) {
		console.log(resourceType, parentResource);
		let foundOperation = false;
		return new Promise((resolve, reject) => {
			if (parentResource && parentResource.links) {
				parentResource.links.forEach(link => {
					if (link['rel'] === resourceType) {
						foundOperation = true;
						this.request(link['href'], link['method'], resource, queryParams, headers).then(
							result => resolve(result),
							error => reject(error)
						)
							.catch(error => reject(error));
					}
				});

				if (!foundOperation) {
					reject({ error: 'Unsupported Operation ' + resourceType });
				}
			}
		});
	}

	buildUrlWithQueryParamString(url, queryParams) {
		if (queryParams) {
			if (url.indexOf('?') === -1) {
				url = url.concat('?');
			}
			else {
				url = url.substr(0, url.indexOf('?') + 1);
			}

			for (let k in queryParams) {
				if (queryParams.hasOwnProperty(k) && queryParams[k]) {
					url = url.concat(k).concat('=').concat(queryParams[k]).concat('&');
				}
			}
		}

		return url;
	}

	request(url, method, resource?, queryParams?, additionalHeaders?) {
		if (!queryParams) {
			queryParams = {};
		}
		Object.assign(queryParams, { "nocache": new Date().getTime() });

		url = this.buildUrlWithQueryParamString(url, queryParams);

		let requestId = "WFONEUI" + UUID.UUID().replace(/-/g, '').toUpperCase();

		console.log('<request ( ' + requestId + ' )' + url);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

			let headers = {
				"Authorization": "Bearer " + this.accessToken,
				"Rest-Version": this.restVersion,
				"Accept": "application/json",
				"Content-type": "application/json",
				"requestId": requestId
			};

			Object.assign(headers, additionalHeaders);

			for (let header in headers) {
				xhr.setRequestHeader(header, headers[header]);
			}

			xhr.onload = () => {
				let response = [null, xhr];
				if (xhr.responseText) {
					response = [JSON.parse(xhr.responseText), xhr];
				}

				if (xhr.readyState == 4 && xhr.status >= 400) {
					console.log('Error: ' + requestId);
					reject(response);
				}
				resolve(response);
			};

			xhr.onerror = () => reject(xhr.statusText);

			if (resource) {
				xhr.send(JSON.stringify(resource));
			}
			else {
				xhr.send();
			}
		});
	}
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
 