import {Injectable, Injector} from "@angular/core";
import {TokenService} from "@wf1/core-ui";
import {ROLES_UI} from "../utils/scopes";

@Injectable({
    providedIn: "root"
})
export class SecurityUtilService {
    tokenService: TokenService;

    constructor(private injector: Injector) {
    }

    private getTokenService() {
        return this.tokenService ? this.tokenService : this.injector.get(TokenService);
    }

    public doesUserHaveScopes(scopes: string[]): boolean {
        return this.getTokenService().doesUserHaveApplicationPermissions(scopes);
    }

    public doesUserHaveScope(scope) {
        return this.doesUserHaveScopes([scope]);
    }

    hasScope(scope: string): boolean {
        return this.hasScopes([scope]);
    }

    hasScopes(scopes: string[]): boolean {
        return this.doesUserHaveScopes(scopes);
    }

    //role security---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    isSectionStaff() {
        return this.hasScope(ROLES_UI.WFRM_SECTION_STAFF);
    }

    isWFStaff() {
        return this.hasScope(ROLES_UI.WFRM_WILDFIRE_STAFF);
    }

    isWFViewer() {
        return this.hasScope(ROLES_UI.WFRM_ADMIN_RESOURCE_VIEWER);
    }

    isAnyWFRMUser() {
        return this.isWFViewer() || this.isWFStaff() || this.isSectionStaff();
    }

}
