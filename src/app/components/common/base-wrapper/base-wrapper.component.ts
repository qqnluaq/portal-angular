import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {ResourcesRoutes} from "../../../utils";
import {Router} from "@angular/router";
import {ErrorState} from "../../../store/application/application.state";
import {ApplicationStateService} from "../../../services/application-state.service";
import {Store} from "@ngrx/store";
import {RootState} from "../../../store";
import {PublicAppHeaderActionItem} from "@wf1/core-ui/lib/public-application-header/public-application-header.component";
import {MatSidenav} from "@angular/material/sidenav";
import {SCOPES_UI} from "../../../utils/scopes";
import scrollIntoView from "scroll-into-view-if-needed";
import {SecurityUtilService} from "../../../services/security-util.service";
import { WFONEService } from "src/app/services";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";

export interface NavItem {
    icon?: any;
    category?: any;
    svgIcon?: any;
    label: string;
    routerLink?: string;
    externalLink?: string;
    badge: number;
    queryParams?: any;
    disabled?: boolean;
}

export interface ActionItem {
    label: string;
    callBackFunction: Function;
}

const iconForCategory = {
    'COSTING':  'request_quote',
    'ROF':      'local_phone',
    'RM':       'assignment_ind',
    'IM':       'local_fire_department',
    'BI':       'work',
    'VP':       'person',
    'RRT':      'analytics'
}

@Component({
    selector: "base-wrapper",
    templateUrl: "./base-wrapper.component.html",
    styleUrls: ["./base-wrapper.component.scss"],
})
export class BaseWrapperComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() backRouteQueryParams?: any;
    @Input() backRoute?: ResourcesRoutes;
    @Input() backRouteLabel?: string = null;
    @Input() summaryString?: string = null;
    @Input() actionItems?: ActionItem[] = null;
    @Input() errorState?: ErrorState[];

    @ViewChild("sidenav") sidenav: MatSidenav;
    @ViewChild("topnav") topnav: MatSidenav;

    userSummary = "";
    userOrgSummary = "";
    userNameText = "";
    userIdText = "";

    isMobileRes = false;

    signUpRequired: boolean = false;

    headerItemsMobile: PublicAppHeaderActionItem[] = [
        {
            icon: "menu",
            label: "Menu",
            badge: 0,
            callBackFunction: this.toggleSidenav.bind(this)
        },
    ];
    headerItemsDesktop: PublicAppHeaderActionItem[] = [
    ];

    topNavItems = [
    ];

    navItems = {
        pages: [],
        links: [],
    }

    constructor(
        private router: Router,
        private applicationStateService: ApplicationStateService,
        private securityUtilService: SecurityUtilService,
        private store: Store<RootState>,
        private cdr: ChangeDetectorRef,
        private wfoneService: WFONEService
    ) {}

    ngOnInit(): void {
        var self = this

        // if (!this.router.url.includes(ResourcesRoutes.SIGN_UP)) {

        // }
        this.userSummary = this.applicationStateService.getUserSummaryDisplay();
        this.userOrgSummary = "BCWS";
        this.isMobileRes = this.applicationStateService.getIsMobileResolution();
        this.userNameText = this.applicationStateService.getUserNameDisplay();
        this.userIdText = this.applicationStateService.getUserId();
        
        this.getPortalLinks().then( function ( items ) {
            self.navItems.links = items
        } );
        this.getPortalPages().then( function ( items ) {
            self.navItems.pages = items
        } );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.summaryString) {
            this.summaryString = changes.summaryString.currentValue;
        }
    }

    ngAfterViewInit() {
        let node = document.getElementsByClassName('app-container')[0];
        scrollIntoView(node, { behavior: 'auto', scrollMode: 'if-needed', block: 'start', inline: 'start' });
    }

    showToolbar() {
        return true;
    }


    // getNavItems(type?: string): NavItem[] {
    //     if (type) {
    //         if (type == "main") {
    //             return this.getMainNavItems();
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    getPortalLinks(): Promise<NavItem[]> {
        var self = this

        return this.wfoneService.getPortalLinks()
            .then( function ( links ) {
                return links.map( function ( lk ) {
                    return {
                        category: lk.linkCategory,
                        icon: self.getIconForCategory( lk.linkCategory ),
                        label: lk.linkName,
                        // routerLink: "/" + ResourcesRoutes.RESOURCES, 
                        externalLink: lk.linkHref,
                        badge: 0
                    }
                } )
            } )
    }

    getPortalPages(): Promise<NavItem[]> {
        return Promise.resolve()
            .then( function () {
                return [
                    {
                        icon: "explore", 
                        label: "Map", 
                        routerLink: "/" + ResourcesRoutes.MAP, 
                        badge: 0
                    },
                    {
                        icon: "insert_chart_outlined", 
                        label: "Dashboard", 
                        // routerLink: "/" + ResourcesRoutes., 
                        badge: 0
                    }
                ]
            } )
    }

        // let items = [];
        // items.push({icon: "date_range", label: "My Resource Pool", routerLink: "/" + ResourcesRoutes.RESOURCES, badge: 0});
        // if (this.securityUtilService.hasScope(SCOPES_UI.GET_ASSIGNMENT)) {
        //     items.push({icon: "list_alt", label: "Assignments", routerLink: "/" + ResourcesRoutes.ASSIGNMENTS, badge: 0});
        // }
        // if (this.securityUtilService.hasScope(SCOPES_UI.GET_WILDFIRE_RESOURCE)) {
        //     items.push({icon: "person", label: "Personnel", routerLink: "/" + ResourcesRoutes.PERSONNEL, badge: 0});
        // }
        // if (this.securityUtilService.hasScope(SCOPES_UI.GET_GROUP)) {
        //     items.push({icon: "group", label: "Groups", routerLink: "/" + ResourcesRoutes.GROUPS, badge: 0});
        // }

        // //items.push({icon: "format_list_numbered", label: "Rosters", routerLink: "/" + ResourcesRoutes.UNAUTHORIZED, badge: 0, disabled: true});
        // // items.push({icon: "swap_horiz", label: "Assignments", routerLink: "/" + ResourcesRoutes.UNAUTHORIZED, badge: 0, disabled: true});

        // return items;

    getIconForCategory( category: string ): string {
        return iconForCategory[ category ] || category || 'launch';
    }

    clickNavItem( nav: NavItem ) {
        if ( nav.routerLink ) {
            this.router.navigateByUrl( nav.routerLink )
        }
        else if ( nav.externalLink ) {
            window.open( nav.externalLink, 'WFONE_PORTAL_' + nav.category )
        }
        else {
            console.warn( 'no click action for ', nav )
        }
    }

    navigateToBackRoute() {
        if (this.backRouteQueryParams) {
            this.router.navigate([this.backRoute], {queryParams: this.backRouteQueryParams});
        } else {
            this.router.navigate([this.backRoute]);
        }
    }

    isSidenavOpen() {
        if ( !this.sidenav ) return false
        return this.sidenav.opened
    }

    toggleSidenav() {
        this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
    }

    toggleTopnav() {
        this.topnav.opened ? this.topnav.close() : this.topnav.open();
    }

    closeTopnav() {
        this.topnav.close();
    }

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        this.isMobileRes = this.applicationStateService.getIsMobileResolution();
        this.cdr.detectChanges();
    }


}




