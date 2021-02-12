import {Injectable, Injector} from "@angular/core";
import {TokenService} from "@wf1/core-ui";

@Injectable({
    providedIn: "root"
})
export class ApplicationStateService {

    private isMobileResolution: boolean;
    tokenService: TokenService;

    constructor(private injector: Injector) {
        this.isMobileResolution = this.checkMobileResolution();
    }

    private checkMobileResolution() {
        if (window.innerWidth < 768 || (window.innerWidth < 900 && window.innerHeight < 450)/*support for landscape mobile views*/) {
            return true;
        } else {
            return false;
        }
    }

    public getIsMobileResolution(): boolean {
        return this.checkMobileResolution();
    }

    public getHeight(): number {
        return window.innerHeight;
    }

    public getWidth(): number {
        return window.innerWidth;
    }

    public getUserEmail() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.email;
        }
        return null;
    }

    public getUserGuid(): string {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.user_guid;
        }
        return null;
    }

    public getUserId(): string {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.user_id;
        }
        return null;
    }

    public getUserType(): string {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.user_type;
        }
        return null;
    }

    public getOrgId() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.onBehalfOfOrganizationId;
        }
        return null;
    }

    public getOrgName() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.onBehalfOfOrganizationName;
        }
        return null;
    }

    public getClientId() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.onBehalfOfOrganizationCode;
        }
        return null;
    }

    public getUserSummaryDisplay() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.given_name + " " + userDetails.family_name + " - " + userDetails.user_id;
        }
        return null;
    }

    public getUserSummaryOrgDisplay() {
        const userDetails = this.getUserDetails();
        if (userDetails && userDetails.onBehalfOfOrganizationName !== null) {
            return userDetails.onBehalfOfOrganizationName.toString().toUpperCase();
        } else {
            return null;
        }
        return null;
    }

    public getUserNameDisplay() {
        const userDetails = this.getUserDetails();
        if (userDetails) {
            return userDetails.given_name + " " + userDetails.family_name;
        }
        return null;
    }

    public getUserCredentialsEmitter() {
        return this.getTokenService().credentialsEmitter;
    }

    //Need to use an injector due to dependencies on the token service and how it initializes in the common lib
    private getTokenService() {
        return this.tokenService ? this.tokenService : this.injector.get(TokenService);
    }

    private getUserDetails() {
        //console.log(this.getTokenService() ? this.getTokenService().getTokenDetails():null);
        return this.getTokenService() ? this.getTokenService().getTokenDetails() : null;
    }

    public resetViewportScale() {
        document.getElementById("meta-viewport").setAttribute('content', "width=device-width, minimum-scale=0.75, maximum-scale=1.0, initial-scale=0.75");
        document.getElementById("meta-viewport").setAttribute('content', "width=device-width, initial-scale=1");
    }

}
