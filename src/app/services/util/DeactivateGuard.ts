import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {BaseContainer} from "../../containers/base/base-container.component";
import {UnsavedDialogComponent} from "../../components/dialogs/unsaved-dialog/unsaved-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApplicationStateService} from "../application-state.service";
import {ResourcesRoutes} from "../../utils";

@Injectable({
    providedIn: "root",
})
export class DeactivateGuard implements CanDeactivate<any> {
    constructor(
        protected dialog: MatDialog,
        protected applicationStateService: ApplicationStateService,
    ) {
    }

    canDeactivate(component: any,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> {
        if (this.dialog && this.dialog.openDialogs && this.dialog.openDialogs.length) {
            if (nextState.url.includes(ResourcesRoutes.ERROR_PAGE)) {
                return of(true);
            } else {
                this.dialog.closeAll();
                return of(false);
            }
        }
        if (component instanceof BaseContainer) {
            let typedComp = <BaseContainer>component;
            if (typedComp.getHasUnsavedForms()) {
                return this.confirmUnsavedDialog(typedComp.getDisplayLabel());
            } else {
                return of(true);
            }
        } else {
            return of(true);
        }
    }

    confirmUnsavedDialog(displayLabel: string): Observable<boolean> {
        let config = {
            data: displayLabel,
            autoFocus: false,
            closeOnNavigation: false
        };
        this.applicationStateService.resetViewportScale();
        const dialogRef = this.dialog.open(UnsavedDialogComponent, config);
        return dialogRef.afterClosed().pipe(map(result => {
            if ("cancel" === result) {
                return false;
            } else if ("continue" === result) {
                return true;
            } else {
                return false;
            }
        }));
    }

}
