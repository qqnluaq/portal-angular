import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfigService, AuthenticationInterceptor, TokenService} from "@wf1/core-ui";
import {UUID} from "angular2-uuid";
import {catchError, mergeMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {RouterExtService} from "../services/router-ext.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WFSnackbarComponent} from "../components/common/snackbars/wf-snackbar.component";
import {displayErrorMessage, ErrorHandlingInstructions, getSnackbarConfig} from "../utils/user-feedback-utils";
import {WF_SNACKBAR_TYPES} from "../utils";

@Injectable()
export class ResourcesInterceptor extends AuthenticationInterceptor implements HttpInterceptor {
    private tokenService;
    private asyncTokenRefresh;
    private refreshSnackbar;

    constructor(protected appConfig: AppConfigService, private snackbarService: MatSnackBar, protected injector: Injector,
                private router: Router, private routerExtService: RouterExtService) {
        super(appConfig, injector);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let processedRequest = req;
        let requestId;
        if (this.isUrlSecured(req.url)) {
            requestId = `WFRME${UUID.UUID().toUpperCase()}`.replace(/-/g, "");
            if (!this.tokenService) {
                this.tokenService = this.injector.get(TokenService);
            }
            if (this.tokenService.getTokenDetails()) {
                if (this.tokenService.isTokenExpired(this.tokenService.getTokenDetails()) || processedRequest.url.includes("/redeem")) {
                    return this.refreshWindow().pipe(mergeMap((tokenResponse) => {
                        this.tokenService.updateToken(tokenResponse);
                        let headers = req.headers.set("Authorization", `Bearer ${tokenResponse["access_token"]}`)
                            .set("RequestId", requestId);

                        processedRequest = req.clone({headers});
                        if (this.asyncTokenRefresh.isComplete) {
                            this.asyncTokenRefresh = undefined;
                        }
                        if (this.refreshSnackbar) {
                            this.refreshSnackbar.dismiss();
                            this.refreshSnackbar = undefined;
                        }
                        return this.handleRequest(requestId, next, processedRequest);
                    }));
                } else {
                    if (requestId && req.url.indexOf("/wfrm-resources-api/") == -1
                        && req.url.indexOf("/wfrm-resource-schedule-api/") == -1
                        && req.url.indexOf("/wfrm-resource-classification-api/") == -1) {
                        //api's other than resources v2 api, schedule api, or classification still need to have this manually set
                        let headers = req.headers.set("RequestId", requestId);

                        // Need to explicitly disable caching, as IE11 caches by default
                        if (req.method === "GET") {
                            headers = headers.set("Cache-Control", "no-cache")
                                .set("Pragma", "no-cache");
                            // console.log(headers);
                        }
                        let authToken = this.tokenService.getOauthToken();
                        processedRequest = req.clone({
                            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
                        });
                    } else {
                        requestId = req.headers.get("RequestId");
                    }
                    return this.handleRequest(requestId, next, processedRequest);
                }
            } else {
                return this.handleRequest(requestId, next, processedRequest);
            }
        } else {
            return this.handleRequest(requestId, next, processedRequest);
        }
    }

    handleRequest(requestId, next, processedRequest): Observable<any> {
        return next.handle(processedRequest).pipe(
            catchError((response: HttpErrorResponse) => {
                const errorHandlingInstructions = this.retrieveErrorHandlingInstructions(response, processedRequest, requestId);
                this.handleError(errorHandlingInstructions);
                throw response;
            }));
    }


    retrieveErrorHandlingInstructions(response, processedRequest, requestId): ErrorHandlingInstructions {
        if (response.url && response.url.endsWith("codeTables")) {
            return this.createErrorHandlingInstructions(null, null, `Unable to initialize application (${response.status}). ${response.url}`);
        } else if (response.status === 0) {
            if (window.navigator.onLine) {
                return this.createErrorHandlingInstructions(null, null, "An unexpected error has occurred.");
            } else {
                return this.createErrorHandlingInstructions(null, null, "No Connectivity. Please try again when you have reconnected.");
            }
        } else if (response.status === 504) {
            return this.createErrorHandlingInstructions(null, null, "No Connectivity. Please try again when you have reconnected.");
        } else if (response.status === 500) {
            return this.createErrorHandlingInstructions(null, null, requestId ? `Server Error (500). RequestId: ${requestId}` : "Server Error (500)");
        } else if (response.status >= 501) {
            return this.createErrorHandlingInstructions(null, null, `Server Error (${response.status}).`);
        } else if (response.status == 401) {
            return this.createErrorHandlingInstructions(null, null, `Insufficient Permissions (${response.status}). ${response.url}`);
        } else if (response.status == 403) {
            return this.createErrorHandlingInstructions(null, null, `Insufficient Permissions (${response.status}). ${response.url}`);
        }

        return null;
    }

    handleError(errorHandlingInstructions: ErrorHandlingInstructions) {
        if (!errorHandlingInstructions) {
            // console.log("no error handling instructions");
            return;
        }

        if (errorHandlingInstructions.snackBarErrorMsg) {
            this.displayErrorMessage(errorHandlingInstructions.snackBarErrorMsg);
        }

        if (errorHandlingInstructions.redirectToRoute) {
            this.router.navigate([errorHandlingInstructions.redirectToRoute], {queryParams: {message: errorHandlingInstructions.redirectToRouteData}});
        }
    }


    createErrorHandlingInstructions(redirectToRoute, redirectToRouteData, snackBarErrorMsg): ErrorHandlingInstructions {
        return {
            redirectToRoute: redirectToRoute,
            redirectToRouteData: redirectToRouteData,
            snackBarErrorMsg: snackBarErrorMsg
        };

    }

    updateErrorPageRouteData(routeName, data) {
        // console.log("routeName: " + routeName);
        // console.log("data: " + data);
        let route = this.router.config.find(r => r.path === routeName);
        if (data) {
            route.data = {errorMsg: data};
        }
    }

    isUrlSecured(url: string): boolean {
        let isSecured = false;
        const config = this.appConfig.getConfig();

        if (config && config.rest) {
            for (let endpoint in config.rest) {
                if (url.startsWith(config.rest[endpoint])) {
                    isSecured = true;
                    break;
                }
            }

            if ( url.startsWith( config[ 'wfone-portal-rest.url' ] ) )
                return true
        }


        return isSecured;
    }

    displayErrorMessage(message: string) {
        setTimeout(() => {
            displayErrorMessage(this.snackbarService, message);
        });
    }

    displayRefreshErrorMessage(message: string) {
        if (!this.refreshSnackbar) {
            this.refreshSnackbar = this.snackbarService.openFromComponent(WFSnackbarComponent, getSnackbarConfig(message, WF_SNACKBAR_TYPES.ERROR));

            this.refreshSnackbar.onAction().subscribe(() => {
                this.refreshSnackbar = undefined;
            });
        }
    }

    refreshWindow() {
        // console.log("refresh window");
        if (this.asyncTokenRefresh) {
            return this.asyncTokenRefresh;
        }
        let baseUrl = this.appConfig.getConfig().application.baseUrl;
        let refreshPage = "refresh-token.html";
        if (baseUrl && !baseUrl.endsWith("/")) {
            refreshPage = `/${refreshPage}`;
        }
        let clientId = this.appConfig.getConfig().webade.clientId;
        let authorizeUrl = this.appConfig.getConfig().webade.oauth2Url;
        let authScopes = this.appConfig.getConfig().webade.authScopes;

        let redirectUrl = `${baseUrl}${refreshPage}`;
        this.asyncTokenRefresh = this.tokenService.initRefreshTokenImplicitFlow(`${authorizeUrl}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${authScopes}`
            , "wfrm-resources-token",
            (errorMessage) => {
                this.displayRefreshErrorMessage(errorMessage);
            });
        return this.asyncTokenRefresh;

    }
}
