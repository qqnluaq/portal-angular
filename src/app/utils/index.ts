import {APP_BOOTSTRAP_LISTENER, Inject, InjectionToken, Renderer2, Type} from "@angular/core";
import {EffectSources} from "@ngrx/effects";
import {PagingInfoRequest} from "../store/application/application.state";
import {SortDirection} from "@wf1/core-ui";
import * as moment from "moment";
import {Moment, unitOfTime} from "moment";
import * as momenttz from "moment-timezone";
// import {vmGroup, vmGroupMember, vmPersonnel} from "../conversion/models";
import {FormControl, Validators} from "@angular/forms";
import {ResourceCommunicationRsrc, ResourceContactListRsrc, ResourceContactRsrc} from "@wf1/wfrm-resources-v2-api";
import {SCOPES_UI} from "./scopes";

export const CODE_TABLE_CACHE = {};
// export let currentResource: vmPersonnel = null;

export function getCodeTableCache() {

    return CODE_TABLE_CACHE;
}

// export function setWildfireResource(rsrc: vmPersonnel) {
//     currentResource = rsrc;
// }

// export function getWildfireResource() {
//     return currentResource;
// }

// export function getDefaultHomeFCCode() {
//     if (currentResource) {
//         return currentResource.fireCentreIdentifier;
//     } else {
//         return null;
//     }
// }


// export function getDefaultHomeFZCode() {
//     if (currentResource) {
//         return currentResource.zoneIdentifier;
//     } else {
//         return null;
//     }
// }


export const CONSTANTS = {
    NO_RECORDS_MESSAGE: "No records to display.",
    PHONE_MASK: '000-000-0000',
    DATE_MASK: [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ],
    DATE_RANGE_MASK: [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ].concat([' - ']).concat([ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ]),
    DATE_TIME_MASK: [ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/  ],
    EMAIL_PATTERN: "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
    TYPEAHEAD_MIN_CHARACTERS: 6,
    EMPTY_TYPEAHEAD_RESULT_LIMIT: 5,
    NON_EMPTY_TYPEAHEAD_RESULT_LIMIT: 25,
    TYPEAHEAD_DEBOUNCE_TIME: 250,
    WILDFIRE_RESOURCE_TYPES: {
        GovernmentPersonnel: 'GovernmentPersonnel',
    },
    ADDRESS_TYPES: {
        WORK: 'WORK'
    },
    COMMUNICATION_METHOD_TYPES: {
        EMERGENCY_PHONE_NUMBER: 'EPN',
        OFFICE_PHONE_NUMBER: 'WPN',
        PRIMARY_EMAIL_ADDRESS: 'PEA'
    },
    CONTACT_TYPES: {
        MAIN_CONTACT: 'MCT'
    },
    AVAILABILITY_STATUSES: {
        AVAIL: 'AVAIL',
        ASSIGN: 'ASSIGN',
        OUTSRVC: 'OUTSRVC',
    },
    AVAILABILITY_SOURCE_CODES: {
        DEFAULT: 'DEFAULT',
        ASSIGNMENT: 'ASSIGNMENT',
        SCHEDULE: 'SCHEDULE',
        SHIFT_SCHEDULE: 'SHIFT_SCHEDULE',
        GROUP_DEFAULT: 'GROUP_DEFAULT',
        GROUP_ASSIGNMENT: 'GROUP_ASSIGNMENT',
        GROUP_SCHEDULE: 'GROUP_SCHEDULE',
        GROUP_SHIFT_SCHEDULE: 'GROUP_SHIFT_SCHEDULE',
    },
    ALLOCATION_TYPES: {
        CNTR: 'CNTR',
        INCIDENT: 'INCIDENT',
        PROJECT: 'PROJECT',
        FULL: 'FULL',
        LOCAL_ONLY: 'LOCAL_ONLY',
        LEAVE: 'LEAVE',
        RESET: 'RESET',
        TRAINING: 'TRAINING',
        OTHER: 'OTHER',
    },
    ASSIGNMENT_TYPES: {
        INCIDENT: 'INCIDENT',
        COORD: 'COORD_CTR',
        PROJECT: 'PROJECT',
    },
    ASSIGNMENT_RESOURCE_TYPES: {
        RSRC_UNT: 'RSRC_UNT',
        RSRC_GRP: 'RSRC_GRP',
        RSRC_GRP_MBR: 'RSRC_GRP_MBR',
    },
    SCHEDULE_RESOURCE_TYPES: {
        RSRC_UNT: 'RSRC_UNT',
        RSRC_GRP: 'RSRC_GRP',
    },
    SHIFT_TYPES: {
        STANDBYDY: 'STANDBYDY',
        OFFDAY: 'OFFDAY',
        REGLRDAY: 'REGLRDAY',
        DUTYDAY: 'DUTYDAY',
    },
    ASSIGNMENT_STATUSES: {
        ACTIVE: 'ACTIVE',
        CLOSED: 'CLOSED',
    },
    COMMITMENT_LEVELS: {
        COMMITTED: 'COMMITTED',
        FLEXIBLE: 'FLEXIBLE',
    },
    AVAILABILITY_LOCATION: {
        HOME: 'HOME',
        AWAY: 'AWAY',
    }

};

export enum ResourcesRoutes {
    LANDING = "",
    HOME = "home",
    PERSONNEL = "personnel",
    PERSONNEL_DETAIL = "personnel/detail",
    GROUPS = "groups",
    RESOURCES = "resources",
    GROUP_DETAIL = "groups/detail",
    GROUP_CREATE = "groups/create",
    GROUP_MEMBERS = "groups/detail/members",
    ASSIGNMENTS = "assignments",
    ASSIGNMENT_DETAIL = "assignments/detail",
    ASSIGNMENT_CREATE = "assignments/create",
    ASSIGNMENT_RESOURCES = "assignments/detail/resources",
    UNAUTHORIZED = "unauthorized",
    ERROR_PAGE = "error",
    SIGN_UP = "sign-up",
    SIGN_OUT = "sign-out-page"
}

export const DATE_FORMATS = {
    fullPickerInput: "Y-MM-DD HH:mm",
    datePickerInput: "Y-MM-DD",
    timePickerInput: "HH:mm",
    monthYearLabel: "Y-MM",
    dateA11yLabel: "Y-MMM-DD",
    monthYearA11yLabel: "YYYY-MMM",
    simplifiedDate: "MMM DD",
    API_DATE: "Y-MM-DD",
    API_TIMESTAMP: 'Y-MM-DD HH:mm:ss',
    API_TIMESTAMP_WITH_SEP: 'Y-MM-DDTHH:mm:ss'
};

//
// export const USER_ACCESS_EDIT_DIALOG_MODE = {
//     INVITE: "INVITE",
//     VIEW: "VIEW",
//     EDIT: "EDIT"
// };

export const BOOTSTRAP_EFFECTS = new InjectionToken("Bootstrap Effects");

export function bootstrapEffects(effects: Type<any>[], sources: EffectSources) {
    return () => {
        effects.forEach(effect => sources.addEffects(effect));
    };
}

export function createInstances(...instances: any[]) {
    return instances;
}

export function provideBootstrapEffects(effects: Type<any>[]): any {
    return [
        effects,
        {
            provide: BOOTSTRAP_EFFECTS, deps: effects, useFactory: createInstances
        },
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: bootstrapEffects,
            deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources]
        }
    ];
}

export function getPageInfoRequestForSearchState(searchState: any): PagingInfoRequest {
    return {
        pageRowCount: searchState.pageSize,
        pageNumber: searchState.pageIndex,
        sortColumn: searchState.sortParam,
        sortDirection: searchState.sortDirection,
        query: searchState.query
    };
}

export const formatSort = (param: string, direction: SortDirection) => param && direction ? `${param} ${direction}` : undefined;

export function addRemoveCdkOverlayClass(isMobileResolution) {
    let cdkOverlayContainer = <HTMLElement>document.getElementsByClassName("cdk-overlay-container")[0];
    if (cdkOverlayContainer) {
        cdkOverlayContainer.classList.remove("desktop");
        cdkOverlayContainer.classList.remove("mobile");

        cdkOverlayContainer.classList.add(isMobileResolution ? "mobile" : "desktop");
    }
}

export interface DayOfPeriod {
    dayName: string;
    date: number;
    moment: Moment;
}

export function getDaysArray (year, month): DayOfPeriod[] {
    let monthIndex = month;
    let names = [ 'SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA' ];
    let date = new Date(year, monthIndex, 1);
    let result = [];
    while (date.getMonth() == monthIndex) {
        result.push({
            date: date.getDate(),
            dayName: names[date.getDay()],
            moment: moment(date)
        });
        date.setDate(date.getDate() + 1);
    }
    return result;
}

export function getWeekRange(date: Moment, numWeeks: number): Moment[] {
    let weekRange: Moment[] = [];
    let includingDate = date.startOf('day');
    let startOfWeek: Moment = includingDate.clone().isoWeekday(4); // week must start on Thurs for Roster business logic
    if (includingDate.isBefore(startOfWeek)) { // if selected date was Sun-Wed, we need to shift back one week due to the Thursday week start logic
        startOfWeek = startOfWeek.subtract(1, 'week');
    }
    for (let day = 0; day < 7 * numWeeks; day++) {
        let dateToAdd = startOfWeek.clone().add(day, "day");
        weekRange.push(dateToAdd);
    }

    return weekRange;
}

export interface WFSnackbarData {
    message: string;
    type: string;
}

export function convertToAPITime(dateTimeLocalMoment: Moment): string {
    return momenttz(dateTimeLocalMoment).local().tz("America/Vancouver").format(DATE_FORMATS.API_TIMESTAMP);
}

export function convertToAPITimeWithTZFormat(dateTimeLocalMoment: Moment): string {
    return momenttz(dateTimeLocalMoment).local().tz("America/Vancouver").format(DATE_FORMATS.API_TIMESTAMP_WITH_SEP);
}

export const WF_SNACKBAR_TYPES = {SUCCESS: "success", ERROR: "error", INFO: "info", UPDATE: "update"};

export  const hasValues = (obj) => Object.values(obj).some(v => v !== null && typeof v !== "undefined");

// export function filterGroupMembershipsListByLatestRemovedDate(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     if (groupMembers) {
//         groupMembers.forEach(item => {
//             let index = filtered.findIndex(filteredItem => item.group.groupGuid == filteredItem.group.groupGuid);
//             if (index >= 0) { //already exists, compare removed dates
//                 if (item.resourceRemovedDate.isSameOrAfter(filtered[index].resourceRemovedDate)) {
//                     filtered[index] = item; //replace it with the more recent one
//                 } //else ignore it (don't add it to the filtered list)
//             } else {
//                 filtered.push(item);
//             }
//         });
//     }

//     return filtered;
// }

// export function filterGroupMembershipsPast(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     let today = moment();
//     if (groupMembers) {
//         filtered = groupMembers.filter(item => {
//             let include = false;
//             if (item.group) {
//                 if (item.resourceRemovedDate && item.resourceRemovedDate.isSameOrBefore(today)) {
//                     include = true;
//                 }
//             } else {
//                 if (item.resourceRemovedDate && item.resourceRemovedDate.isSameOrBefore(today)) {
//                     include = true;
//                 }
//             }
//             return include;
//         });
//     }
//     return filtered;
// }

// export function filterGroupMembershipsCurrent(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     let today = moment();
//     if (groupMembers) {
//         filtered = groupMembers.filter(item => {
//             let include = false;
//             if (item.group) {
//                 if (!item.resourceRemovedDate || item.resourceRemovedDate.isAfter(today)) {
//                     include = true;
//                 }
//             } else {
//                 if (!item.resourceRemovedDate || item.resourceRemovedDate.isAfter(today)) {
//                     include = true;
//                 }
//             }
//             return include;
//         });
//     }
//     return filtered;
// }

// export function filterGroupMembersPast(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     let today = moment();
//     if (groupMembers) {
//         filtered = groupMembers.filter(item => {
//             let include = false;

//             if (item.resourceRemovedDate && item.resourceRemovedDate.isSameOrBefore(today)) {
//                 include = true;
//             }

//             return include;
//         });
//     }
//     return filtered;
// }

// export function filterGroupMembersCurrent(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     let today = moment();
//     if (groupMembers) {
//         filtered = groupMembers.filter(item => {
//             let include = false;

//             if (!item.resourceRemovedDate || item.resourceRemovedDate.isAfter(today)) {
//                 include = true;
//             }

//             return include;
//         });
//     }
//     return excludeFutureIfHasCurrent(filtered);
// }

// export function excludeFutureIfHasCurrent(groupMembers: vmGroupMember[]) {
//     let filtered = [];
//     let alreadyAddedResourceIds = new Set<string>();
//     let sortedByDate = groupMembers.sort(sortGroupMembersByRemovedDateAsc);
//     let today = moment();
//     if (sortedByDate) {
//         filtered = sortedByDate.filter(item => {
//             let include = false;
//             if (item.resourceAddedDate && item.resourceAddedDate.isSameOrBefore(today, "day")) {
//                 include = true;
//                 alreadyAddedResourceIds.add(item.wildfireResourceId);
//             } else if (!alreadyAddedResourceIds.has(item.wildfireResourceId)) {
//                 include = true;
//                 alreadyAddedResourceIds.add(item.wildfireResourceId);
//             }

//             return include;
//         });
//     }
//     return filtered;
// }

// export const sortGroupMembersByRemovedDateAsc = (a: vmGroupMember, b: vmGroupMember) =>  {
//     if (b && a && b.resourceRemovedDate && a.resourceRemovedDate) {
//         return a.resourceRemovedDate.valueOf() - b.resourceRemovedDate.valueOf();
//     } else {
//         return 0;
//     }
// };

// export const sortGroupMembersByRemovedDateDesc = (a: vmGroupMember, b: vmGroupMember) =>  {
//     if (b && a && b.resourceRemovedDate && a.resourceRemovedDate) {
//         return b.resourceRemovedDate.valueOf() - a.resourceRemovedDate.valueOf();
//     } else {
//         return 0;
//     }
// };


export function compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function compareMoment(a: Moment, b: Moment, isAsc: boolean): number {
    return (a.isBefore(b) ? -1 : 1) * (isAsc ? 1 : -1);
}


export function makeFormFieldNotReadonly(renderer: Renderer2, formFieldEl: HTMLElement) {
    renderer.removeClass(formFieldEl, "readonly");
    let editableElements;
    //make input element readonly
    let inputHtmlElement: HTMLInputElement;
    editableElements = formFieldEl.getElementsByTagName('input');
    if (editableElements && editableElements.length) {
        inputHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeAttribute(inputHtmlElement, "readonly");
        });
    }

    //make textarea element readonly
    let textareaHtmlElement: HTMLTextAreaElement;
    editableElements = formFieldEl.getElementsByTagName('textarea');
    if (editableElements && editableElements.length) {
        textareaHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeAttribute(textareaHtmlElement, "readonly");
        });
    }

    //make select element readonly
    let selectHtmlElement: HTMLSelectElement;
    editableElements = formFieldEl.getElementsByTagName('select');
    if (editableElements && editableElements.length) {
        selectHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.removeClass(selectHtmlElement, "select-read-only-cursor");
            renderer.removeAttribute(selectHtmlElement, "readonly");
            for (let i = 0; i < selectHtmlElement.options.length; i++) {
                selectHtmlElement.options[i].disabled = undefined;
            }
        });
    }

    //make radio element readonly
    // let radioHtmlElement: MatRadioButton;
    // editableElements = formFieldEl.getElementsByTagName('mat-radio-button');
    // if (editableElements && editableElements.length) {
    //     radioHtmlElement = editableElements[0];
    //     renderer.setAttribute(radioHtmlElement, "disabled", "true");
    // }
    // -- dont need to do this here as radio group will be disabled separately via form config

    //make datepicker buttons disabled
    let buttonHtmlElement: HTMLButtonElement;
    editableElements = formFieldEl.getElementsByTagName('button');
    if (editableElements && editableElements.length) {
        buttonHtmlElement = editableElements[0];
        renderer.removeAttribute(buttonHtmlElement, "disabled");
    }
}

export function makeFormFieldReadonly(renderer: Renderer2, formFieldEl: HTMLElement) {
    renderer.addClass(formFieldEl, "readonly");
    let editableElements;
    //make input element readonly
    let inputHtmlElement: HTMLInputElement;
    editableElements = formFieldEl.getElementsByTagName('input');
    if (editableElements && editableElements.length) {
        inputHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.setAttribute(inputHtmlElement, "readonly", "readonly");
        });
    }

    //make textarea element readonly
    let textareaHtmlElement: HTMLTextAreaElement;
    editableElements = formFieldEl.getElementsByTagName('textarea');
    if (editableElements && editableElements.length) {
        textareaHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.setAttribute(textareaHtmlElement, "readonly", "readonly");
        });
    }

    //make select element readonly
    let selectHtmlElement: HTMLSelectElement;
    editableElements = formFieldEl.getElementsByTagName('select');
    if (editableElements && editableElements.length) {
        selectHtmlElement = editableElements[0];
        setTimeout(() => {
            renderer.addClass(selectHtmlElement, "select-read-only-cursor");
            renderer.setAttribute(selectHtmlElement, "readonly", "readonly");
            for (let i = 0; i < selectHtmlElement.options.length; i++) {
                selectHtmlElement.options[i].disabled = true;
            }
        });
    }

    //make radio element readonly
    // let radioHtmlElement: MatRadioButton;
    // editableElements = formFieldEl.getElementsByTagName('mat-radio-button');
    // if (editableElements && editableElements.length) {
    //     radioHtmlElement = editableElements[0];
    //     renderer.setAttribute(radioHtmlElement, "disabled", "true");
    // }
    // -- dont need to do this here as radio group will be disabled separately via form config

    //make datepicker buttons disabled
    let buttonHtmlElement: HTMLButtonElement;
    editableElements = formFieldEl.getElementsByTagName('button');
    if (editableElements && editableElements.length) {
        buttonHtmlElement = editableElements[0];
        renderer.setAttribute(buttonHtmlElement, "disabled", "true");
    }
}

export function getElementInnerText(el: HTMLElement): string {
    return el.innerText;
}

export function isElementTruncated(el: HTMLElement): boolean {
    return el.offsetWidth < el.scrollWidth;
}

export function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function requiredIfValidator(predicate) {
    return (formControl => {
        if (!formControl.parent) {
            return null;
        }
        if (predicate()) {
            return Validators.required(formControl);
        }
        return null;
    });
}

export function resetFC(fc: FormControl, resetValue: boolean = false) {
    if (resetValue) {
        fc.setValue(null);
    }
    fc.setErrors(null);
    fc.markAsPristine();
    fc.markAsUntouched();
}

export function resetFCs(fcArray: FormControl[], resetValue: boolean = false) {
    if (fcArray && fcArray.length) {
        fcArray.forEach(fc => resetFC(fc, resetValue));
    }
}

export function validateDateFormControlAfter(fc1: FormControl, fc2: FormControl, granularity: unitOfTime.StartOf, errorName: string) {
    if (fc1.value
        && fc2.value
        && moment(fc1.value).isAfter(moment(fc2.value), granularity)) {
        fc1.setErrors({...fc1.errors, [errorName]: "invalid"});
        fc2.setErrors({...fc2.errors, [errorName]: "invalid"});
        fc1.markAsTouched();
        fc2.markAsTouched();
        return false;
    } else {
        if (fc1.errors) {
            delete fc1.errors[errorName];
            if (!Object.keys(fc1.errors) || !Object.keys(fc1.errors).length) {
                fc1.setErrors(null);
            }
        }

        if (fc2.errors) {
            delete fc2.errors[errorName];
            if (!Object.keys(fc2.errors) || !Object.keys(fc2.errors).length) {
                fc2.setErrors(null);
            }
        }
        return true;
    }
}

export function getFilteredContacts(contacts: ResourceContactListRsrc, includeCommunicationMethodTypes?: string[], excludeCommunicationMethodTypes?: string[]) {
    let contactListRsrc = contacts;

    if (contactListRsrc.collection && contactListRsrc.collection.length > 0) {
        contactListRsrc.collection = contactListRsrc.collection.filter(
            (contact: ResourceContactRsrc) => {
                return contact.communicationMethods.some((comm: ResourceCommunicationRsrc) => {
                    let isIncluded = includeCommunicationMethodTypes && includeCommunicationMethodTypes.length ? includeCommunicationMethodTypes.includes(comm.communicationMethodTypeCode) : true;
                    let isExcluded = excludeCommunicationMethodTypes && excludeCommunicationMethodTypes.length ? excludeCommunicationMethodTypes.includes(comm.communicationMethodTypeCode) : false;
                    return isIncluded && !isExcluded;
                });
            }
        );
    }
    return contactListRsrc;
}


