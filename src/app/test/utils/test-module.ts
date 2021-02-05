import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentModule} from "ngx-moment";
import {NgxMaskModule} from "ngx-mask";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {OwlDateTimeModule, OwlMomentDateTimeModule} from "@busacca/ng-pick-datetime";
import {MatInputModule} from "@angular/material/input";
import {NgModule} from "@angular/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import {FakeNoopComponent} from "../fake/fake-noop.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FakeErrorPanelComponent} from "../fake/fake-error-panel.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FakeSecurityUtilService} from "../fake/fake-common/fake-security-util-service";

export function getDefaultTestingImportModules(): any[] {
    return [
        DragDropModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatExpansionModule,
        MatBadgeModule,
        MatGridListModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatToolbarModule,
        NgxPaginationModule,
        MomentModule,
        MatProgressSpinnerModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ];
}

@NgModule({
    imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatExpansionModule,
        MatBadgeModule,
        MatGridListModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogModule,
        MomentModule,
        MatProgressSpinnerModule,
        NgxPaginationModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        ReactiveFormsModule,
        NoopAnimationsModule
    ],
    exports: [
        FakeNoopComponent,
        FakeErrorPanelComponent,
    ],
    declarations: [
        FakeNoopComponent,
        FakeErrorPanelComponent,
    ],
    entryComponents: [
    ]
})
export class TestModule { }

export const MOCK_APP_STATE_SERVICE = jasmine.createSpyObj(['getUserCredentialsEmitter',
    'getUserEmail',
    'getCurrentEmployeeGuid', 'getIsMobileResolution',
    'getCurrentEmployeeProfile', 'isEA', 'isExceptionEA',
    'resetViewportScale', 'isPayrollClerk', 'getUserSummaryDisplay',
    'getUserNameDisplay', 'getUserId']);

export const MOCK_SECURITY_UTIL_SERVICE = new FakeSecurityUtilService();
