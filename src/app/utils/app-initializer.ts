import {Injector} from "@angular/core";
import {AppConfigService, TokenService} from "@wf1/core-ui";
import {HttpHandler} from "@angular/common/http";
import {ApplicationStateService} from "../services/application-state.service";

export function appInitFn(httpHandler: HttpHandler, injector: Injector): () => Promise<any> {
    const appStateService = injector.get(ApplicationStateService);
    //initialize the app gutter space styling based on device resolution
    document.documentElement.style.setProperty("--wf1-gutter-space", appStateService.getIsMobileResolution() ? "8px" : "16px");

    //initialize token and code tables
    const appConfigService = injector.get(AppConfigService);
    return (): Promise<any> => {
        return new Promise((resolve, reject) => {
            appConfigService.configEmitter.subscribe(config => {
                const tokenService = injector.get(TokenService);
                setTimeout(() => {
                    if (tokenService.getOauthToken()) {
                        tokenService.authTokenEmitter.subscribe((token) => {
                            resolve()
                            // handleHasToken(token, appConfigService, tokenService, injector, resolve, reject);
                        });
                    } else {
                        resolve();
                    }
                }, 1000);
            });

        });
    };
    // return function () { return Promise.resolve( true ) }
}


