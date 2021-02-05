import {APP_INITIALIZER, Injector, NgModule} from "@angular/core";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {
//     ApiModule as ResourcesV2APIServiceModule,
//     Configuration as ResourcesV2APIServiceConfiguration
// } from "@wf1/wfrm-resources-v2-api";
// import {
//     ApiModule as ScheduleAPIServiceModule,
//     Configuration as ScheduleAPIServiceConfiguration
// } from "@wf1/wfrm-resource-schedule-api";
// import {
//     ApiModule as ClassificationAPIServiceModule,
//     Configuration as ClassificationAPIServiceConfiguration
// } from "@wf1/wfrm-resource-classification-api";
// import {
//     ApiModule as IncidentsAPIServiceModule,
//     Configuration as IncidentsAPIServiceConfiguration
// } from "@wf1/incidents-rest-api";
// import {
//     ApiModule as OrgUnitAPIServiceModule,
//     OrgUnitConfiguration as OrgUnitAPIServiceConfiguration
// } from "@wf1/orgunit-rest-api";
import {BrowserModule} from "@angular/platform-browser";
import {ServiceWorkerModule} from "@angular/service-worker";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {AppConfigService, CoreUIModule, MapService, PublicApplicationHeaderModule, TokenService} from "@wf1/core-ui";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./containers/application-root/app.component";
import {environment} from "../environments/environment";
import {initialRootState, rootEffects, rootReducers} from "./store";
import {DATE_FORMATS, provideBootstrapEffects} from "./utils";
import {NgxMaskModule} from "ngx-mask";
import {MomentModule} from "ngx-moment";
import {UnauthorizedPageComponent} from "./components/unauthorized-page/unauthorized-page.component";
import {NgxTrimModule} from "ngx-trim";
import {ErrorPanelComponent} from "./components/common/error-panel/error-panel.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {RouteReuseStrategy} from "@angular/router";
import {CustomReuseStrategy} from "./utils/custom-route-reuse-strategy";
import {BaseWrapperComponent} from "./components/common/base-wrapper/base-wrapper.component";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler} from "@angular/common/http";
import {ResourcesInterceptor} from "./interceptors/resources-interceptor";
import {NgxPaginationModule} from "ngx-pagination";
import {CdkTableModule} from "@angular/cdk/table";
import {appInitFn} from "./utils/app-initializer";
import {AutoFocusDirective} from "./directives/auto-focus.directive";
import {BaseDialogComponent} from "./components/dialogs/base-dialog/base-dialog.component";
import {UpdateService} from "./services/update.service";
import {SignOutPageComponent} from "./components/sign-out-page/sign-out-page.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlMomentDateTimeModule} from "@busacca/ng-pick-datetime";
import {BaseExpansionPanelComponent} from "./components/common/base-expansion-panel/base-expansion-panel.component";
import {WFSnackbarComponent} from "./components/common/snackbars/wf-snackbar.component";
import {TimeMaskDirective} from "./directives/time-mask.directive";
import {DateTimeMaskDirective} from "./directives/date-time-mask.directive";
import {DateMaskDirective} from "./directives/date-mask.directive";
import {ErrorDialogComponent} from "./components/dialogs/error-dialog/error-dialog.component";
import {UnsavedDialogComponent} from "./components/dialogs/unsaved-dialog/unsaved-dialog.component";
import {DateRangeMaskDirective} from "./directives/date-range-mask.directive";
import {ReadonlyFieldDirective} from "./directives/readonly-field.directive";
import {ReadonlyFormDirective} from "./directives/readonly-form.directive";
import {A11yModule} from "@angular/cdk/a11y";
import {MultiSelectDirective} from "./directives/multi-select.directive";
import {SingleSelectDirective} from "./directives/singleselect.directive";
import {WarningPanelComponent} from "./components/common/warning-panel/warning-panel.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import { HomeComponentDesktop } from "./components/home/desktop/home.component.desktop";
import { HomeComponentMobile } from "./components/home/mobile/home.component.mobile";
import { HomeContainerDesktop } from "./containers/home/home-container.component.desktop";
import { HomeContainerMobile } from "./containers/home/home-container.component.mobile";


/**
 * Function that initializes the Configuration injector with the application base url from the app config service.
 * Used by the Swagger CodeGen Rest API angular services.
 */
// export function resourcesV2RestInitializerFn(appConfig: AppConfigService) {
//     const apiConfiguration = new ResourcesV2APIServiceConfiguration();
//     apiConfiguration.basePath = appConfig.getConfig().rest["wfrm"];
//     return apiConfiguration;
// }

// export function scheduleRestInitializerFn(appConfig: AppConfigService) {
//     const apiConfiguration = new ScheduleAPIServiceConfiguration();
//     apiConfiguration.basePath = appConfig.getConfig().rest["schedule"];
//     return apiConfiguration;
// }

// export function classificationRestInitializerFn(appConfig: AppConfigService) {
//     const apiConfiguration = new ClassificationAPIServiceConfiguration();
//     apiConfiguration.basePath = appConfig.getConfig().rest["classification"];
//     return apiConfiguration;
// }

// export function incidentsRestInitializerFn(appConfig: AppConfigService) {
//     const apiConfiguration = new IncidentsAPIServiceConfiguration();
//     apiConfiguration.basePath = appConfig.getConfig().rest["incidents"];
//     return apiConfiguration;
// }

// export function orgUnitRestInitializerFn(appConfig: AppConfigService) {
//     const apiConfiguration = new OrgUnitAPIServiceConfiguration();
//     apiConfiguration.basePath = appConfig.getConfig().rest["orgunit"];
//     return apiConfiguration;
// }

let devOnlyImports = [];

if (!environment.production || !environment.restrict_imports) {
    devOnlyImports = [
        StoreDevtoolsModule.instrument({
            maxAge: 50,
        }),
    ];
}

@NgModule({
    declarations: [
        DateMaskDirective,
        TimeMaskDirective,
        DateTimeMaskDirective,
        DateRangeMaskDirective,
        ReadonlyFieldDirective,
        ReadonlyFormDirective,
        MultiSelectDirective,
        SingleSelectDirective,
        MultiSelectDirective,
        SingleSelectDirective,

        WFSnackbarComponent,
        BaseExpansionPanelComponent,
        BaseDialogComponent,
        AutoFocusDirective,

        HomeContainerDesktop,
        HomeContainerMobile,

        AppComponent,
        BaseWrapperComponent,
        ErrorPageComponent,

        HomeComponentDesktop,
        HomeComponentMobile,

        UnauthorizedPageComponent,
        ErrorPanelComponent,
        WarningPanelComponent,
        ErrorDialogComponent,
        UnsavedDialogComponent,
        SignOutPageComponent,
    ],
    imports: [
        // ScheduleAPIServiceModule,
        // ClassificationAPIServiceModule,
        // ResourcesV2APIServiceModule,
        // OrgUnitAPIServiceModule,
        // IncidentsAPIServiceModule,
        HttpClientModule,
        DragDropModule,
        CdkTableModule,
        BrowserModule,
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
        MomentModule,
        MatProgressSpinnerModule,
        NgxTrimModule,
        NgxMaskModule.forRoot(),
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        ReactiveFormsModule,
        ScrollingModule,
        PublicApplicationHeaderModule,
        CoreUIModule.forRoot({configurationPath: environment.app_config_location}),
        StoreModule.forRoot(rootReducers, {initialState: initialRootState}),
        AppRoutingModule,
        NgxPaginationModule,
        // Connects RouterModule with StoreModule
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),
        ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production, scope: "./"}),
        ...devOnlyImports,
        A11yModule,
    ],
    providers: [
        // Added provideBootstrapEffects function to handle the ngrx issue that loads effects before APP_INITIALIZER
        // providers have finished initializing.
        // See https://github.com/ngrx/platform/issues/931 for more information.
        provideBootstrapEffects(rootEffects),
        UpdateService,
        AppConfigService,
        TokenService,
        MapService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitFn,
            multi: true,
            deps: [HttpHandler, Injector]
        },
        {provide: OWL_DATE_TIME_FORMATS, useValue: DATE_FORMATS},
        {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResourcesInterceptor,
            multi: true
        },
    ],
    entryComponents: [
        BaseDialogComponent,
        ErrorDialogComponent,
        UnsavedDialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
