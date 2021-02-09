import {NgModule} from "@angular/core";
import {Router, RouterModule, Routes} from "@angular/router";
import {ResourcesAuthGuard} from "./services/util/ResourcesAuthGuard";
import {DeactivateGuard} from "./services/util/DeactivateGuard";
import {UnauthorizedPageComponent} from "./components/unauthorized-page/unauthorized-page.component";
import {ApplicationStateService} from "./services/application-state.service";
import {ResourcesRoutes} from "./utils";

import {SignOutPageComponent} from "./components/sign-out-page/sign-out-page.component";

import {SCOPES_UI} from "./utils/scopes";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import { HomeContainerDesktop } from "./containers/home/home-container.component.desktop";
import { HomeContainerMobile } from "./containers/home/home-container.component.mobile";
import { MapPageContainerDesktop } from "./containers/map-page/map-page-container.component.desktop";
import { MapPageContainerMobile } from "./containers/map-page/map-page-container.component.mobile";

const LANDING_SCOPES = [[SCOPES_UI.GET_WILDFIRE_RESOURCE, SCOPES_UI.GET_GROUP]];

const routes: Routes = [
    {
        path: ResourcesRoutes.LANDING, 
        redirectTo: ResourcesRoutes.MAP, 
        pathMatch: "full",
        data: {scopes: LANDING_SCOPES}, 
        canActivate: [ResourcesAuthGuard]
    },
    {
        path: ResourcesRoutes.HOME, 
        component: HomeContainerDesktop, 
        data: {scopes: LANDING_SCOPES, shouldDetach: true}, 
        // pathMatch: "full",
        canActivate: [ResourcesAuthGuard]
    },
    {
        path: ResourcesRoutes.MAP, 
        component: MapPageContainerDesktop, 
        data: {scopes: LANDING_SCOPES, shouldDetach: true}, 
        // pathMatch: "full",
        canActivate: [ResourcesAuthGuard]
    },
    {path: ResourcesRoutes.UNAUTHORIZED, component: UnauthorizedPageComponent, pathMatch: "full"},
    {path: ResourcesRoutes.ERROR_PAGE, component: ErrorPageComponent, pathMatch: "full"},
    {path: ResourcesRoutes.SIGN_OUT, component: SignOutPageComponent, pathMatch: "full"},
    {path: "**", redirectTo: "/"}
];

const mobile_routes: Routes = [
    {
        path: ResourcesRoutes.LANDING, 
        redirectTo: ResourcesRoutes.MAP, 
        pathMatch: "full",
        data: {scopes: LANDING_SCOPES}, 
        canActivate: [ResourcesAuthGuard]
    },
    {
        path: ResourcesRoutes.HOME, 
        component: HomeContainerMobile, 
        data: {scopes: LANDING_SCOPES, shouldDetach: true}, 
        // pathMatch: "full",
        canActivate: [ResourcesAuthGuard]
    },
    {
        path: ResourcesRoutes.MAP, 
        component: MapPageContainerMobile, 
        data: {scopes: LANDING_SCOPES, shouldDetach: true}, 
        // pathMatch: "full",
        canActivate: [ResourcesAuthGuard]
    },
    {path: ResourcesRoutes.UNAUTHORIZED, component: UnauthorizedPageComponent, pathMatch: "full"},
    {path: ResourcesRoutes.ERROR_PAGE, component: ErrorPageComponent, pathMatch: "full"},
    {path: ResourcesRoutes.SIGN_OUT, component: SignOutPageComponent, pathMatch: "full"},
    {path: "**", redirectTo: "/"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    public constructor(private router: Router,
                       private applicationStateService: ApplicationStateService) {
        if (applicationStateService.getIsMobileResolution()) {
            //console.log("mobile resolution");
            router.resetConfig(mobile_routes);
        }
    }
}
