import {Component} from "@angular/core";
import {TokenService} from "@wf1/core-ui";
import {Router} from "@angular/router";

@Component({
    selector: "wfrm-unauthorized-page",
    templateUrl: "./unauthorized-page.component.html",
    styleUrls: ["./unauthorized-page.component.scss"]
})
export class UnauthorizedPageComponent {
    constructor(private tokenService: TokenService, private router: Router) {
        /* if(tokenService.doesUserHaveApplicationPermissions(['WFRM.GET_TOPLEVEL', 'WFRM.GET_CODE_TABLES', 'WFRM.GET_PERSONNEL'])){
             this.router.navigate(['']);
         }*/
    }

}
