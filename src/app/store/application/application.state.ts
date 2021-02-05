import {SearchState} from "@wf1/core-ui";

export enum ERROR_TYPE {
    VALIDATION,
    WARNING,
    FATAL,
    NOT_FOUND,
    FAILED_PRECONDITION
}

export interface ValidationError {
    path: string;
    message: string;
    messageTemplate: string;
    messageArguments: any[];
}

export interface CodeData {
    code: string;
    description: string;
    displayOrder: number;
    effectiveDate: string;
    expiryDate: string;
    shortDescription?: string;
}

export interface Option {
    code: string;
    description: string;
    shortDescription?: string;
}

export interface PagingInfoRequest {
    query?: string;
    pageNumber: number;
    pageRowCount: number;
    sortColumn?: string;
    sortDirection?: string;
}

export interface PagingSearchState extends SearchState {
    pageIndex?: number;
    pageSize?: number;
}

export const EMPTY_SEARCH_STATE: PagingSearchState = {
    query: null,
    sortParam: null,
    sortDirection: null,
    sortModalVisible: false,
    filters: {},
    hiddenFilters: {},
    componentId: null,
    pageIndex: 0,
    pageSize: 10
};

export function getDefaultPagingInfoRequest(pageNumber = 1, pageSize = 5, sortColumn?: string, sortDirection?: string, query?: string): PagingInfoRequest {
    return {
        query: query,
        pageNumber: pageNumber,
        pageRowCount: pageSize,
        sortColumn: sortColumn,
        sortDirection: sortDirection
    };
}


export interface LoadState {
    isLoading: boolean;
}

export interface FormState {
    isUnsaved: boolean;
    //isValid: boolean;
}

export interface ErrorState {
    uuid: string;
    type: ERROR_TYPE;
    status: number;
    statusText?: string;
    message?: string;
    name: string;
    validationErrors?: ValidationError[];
    responseEtag: string;
}

export interface LoadStates {
    personnel: LoadState;
    groups: LoadState;
    assignments: LoadState;
    resources: LoadState;
    assignmentsDialog: LoadState;
    incidents: LoadState;
    groupMembers: LoadState;
    personnelDetailMetadata: LoadState;
    personnelAvailabilitySummary: LoadState;
    personnelContactInfoOther: LoadState;
    personnelContactInfoEmergency: LoadState;
    personnelContactInfoCommunications: LoadState;
    personnelContactInfoWorkAddress: LoadState;
    personnelCharacteristics: LoadState;
    personnelAvailability: LoadState;
    personnelCertifications: LoadState;
    personnelAssignments: LoadState;
    updatingPersonnelAvailability: LoadState;
    personnelGroupMembershipsCurrent: LoadState;
    personnelGroupMembershipsPast: LoadState;
    groupDetailMetadata: LoadState;
    groupAvailabilitySummary: LoadState;
    groupDetailMembersCurrent: LoadState;
    groupDetailMembersPast: LoadState;
    groupDetailMembers: LoadState;
    updatingGroupMember: LoadState;
    groupContactInfoOther: LoadState;
    groupContactInfoEmergency: LoadState;
    groupContactInfoCommunications: LoadState;
    groupAssignments: LoadState;
    groupAvailability: LoadState;
    updatingGroupAvailability: LoadState;
    assignmentDetailMetadata: LoadState;
    assignmentDetailResources: LoadState;
    assignmentResources: LoadState;
    creatingAssignment: LoadState;
    updatingAssignmentResource: LoadState;
}

export interface FormStates {
    groupMembers: FormState;
    personnelDetailMetadata: FormState;
    personnelAvailabilitySummary: FormState;
    personnelContactInfoOther: FormState;
    personnelContactInfoEmergency: FormState;
    personnelContactInfoCommunications: FormState;
    personnelContactInfoWorkAddress: FormState;
    personnelCharacteristics: FormState;
    personnelAvailability: FormState;
    updatingPersonnelAvailability: FormState;
    personnelGroupMembershipsCurrent: FormState;
    personnelGroupMembershipsPast: FormState;
    groupDetailMetadata: FormState;
    groupAvailabilitySummary: FormState;
    groupDetailMembersCurrent: FormState;
    groupDetailMembersPast: FormState;
    groupContactInfoOther: FormState;
    groupContactInfoEmergency: FormState;
    groupContactInfoCommunications: FormState;
    groupAvailability: FormState;
    updatingGroupAvailability: FormState;
    assignmentDetailMetadata: FormState;
    assignmentDetailResources: FormState;
    assignmentResources: FormState;
}

export interface ErrorStates {
    personnel: ErrorState[];
    groups: ErrorState[];
    assignments: ErrorState[];
    resources: ErrorState[];
    assignmentsDialog: ErrorState[];
    incidents: ErrorState[];
    groupMembers: ErrorState[];
    personnelDetailMetadata: ErrorState[];
    personnelAvailabilitySummary: ErrorState[];
    personnelContactInfoOther: ErrorState[];
    personnelContactInfoEmergency: ErrorState[];
    personnelContactInfoCommunications: ErrorState[];
    personnelContactInfoWorkAddress: ErrorState[];
    personnelCharacteristics: ErrorState[];
    personnelAvailability: ErrorState[];
    personnelCertifications: ErrorState[];
    personnelAssignments: ErrorState[];
    updatingPersonnelAvailability: ErrorState[];
    personnelGroupMembershipsCurrent: ErrorState[];
    personnelGroupMembershipsPast: ErrorState[];
    groupDetailMetadata: ErrorState[];
    groupAvailabilitySummary: ErrorState[];
    groupDetailMembersCurrent: ErrorState[];
    groupDetailMembersPast: ErrorState[];
    groupDetailMembers: ErrorState[];
    updatingGroupMember: ErrorState[];
    groupContactInfoOther: ErrorState[];
    groupContactInfoEmergency: ErrorState[];
    groupContactInfoCommunications: ErrorState[];
    groupAvailability: ErrorState[];
    groupAssignments: ErrorState[];
    updatingGroupAvailability: ErrorState[];
    assignmentDetailMetadata: ErrorState[];
    assignmentDetailResources: ErrorState[];
    assignmentResources: ErrorState[];
    creatingAssignment: ErrorState[];
    updatingAssignmentResource: ErrorState[];
    severe: ErrorState[];
}

export interface ApplicationState {
    loadStates: LoadStates;
    errorStates: ErrorStates;
    formStates: FormStates;
}


export function getDefaultLoadStates(): LoadStates {
    return {
        personnel: {isLoading: false},
        groups: {isLoading: false},
        assignments: {isLoading: false},
        resources: {isLoading: false},
        assignmentsDialog: {isLoading: false},
        incidents: {isLoading: false},
        groupMembers: {isLoading: false},
        personnelDetailMetadata: {isLoading: false},
        personnelAvailabilitySummary: {isLoading: false},
        personnelContactInfoOther: {isLoading: false},
        personnelContactInfoEmergency: {isLoading: false},
        personnelContactInfoCommunications: {isLoading: false},
        personnelContactInfoWorkAddress: {isLoading: false},
        personnelCharacteristics: {isLoading: false},
        personnelAvailability: {isLoading: false},
        personnelCertifications: {isLoading: false},
        personnelAssignments: {isLoading: false},
        updatingPersonnelAvailability: {isLoading: false},
        personnelGroupMembershipsCurrent: {isLoading: false},
        personnelGroupMembershipsPast: {isLoading: false},
        updatingGroupMember: {isLoading: false},
        groupDetailMetadata: {isLoading: false},
        groupAvailabilitySummary: {isLoading: false},
        groupDetailMembersCurrent: {isLoading: false},
        groupDetailMembersPast: {isLoading: false},
        groupDetailMembers: {isLoading: false},
        groupContactInfoOther: {isLoading: false},
        groupContactInfoEmergency: {isLoading: false},
        groupContactInfoCommunications: {isLoading: false},
        groupAvailability: {isLoading: false},
        groupAssignments: {isLoading: false},
        updatingGroupAvailability: {isLoading: false},
        assignmentDetailMetadata: {isLoading: false},
        assignmentDetailResources: {isLoading: false},
        assignmentResources: {isLoading: false},
        creatingAssignment: {isLoading: false},
        updatingAssignmentResource: {isLoading: false},
    };
}

export function getDefaultErrorStates(): ErrorStates {
    return {
        personnel: [],
        groups: [],
        assignments: [],
        resources: [],
        assignmentsDialog: [],
        incidents: [],
        groupMembers: [],
        personnelDetailMetadata: [],
        personnelAvailabilitySummary: [],
        personnelContactInfoOther: [],
        personnelContactInfoEmergency: [],
        personnelContactInfoCommunications: [],
        personnelContactInfoWorkAddress: [],
        personnelCharacteristics: [],
        personnelAvailability: [],
        personnelCertifications: [],
        personnelAssignments: [],
        updatingPersonnelAvailability: [],
        personnelGroupMembershipsCurrent: [],
        personnelGroupMembershipsPast: [],
        groupDetailMetadata: [],
        groupAvailabilitySummary: [],
        groupDetailMembersCurrent: [],
        groupDetailMembersPast: [],
        groupDetailMembers: [],
        updatingGroupMember: [],
        groupContactInfoOther: [],
        groupContactInfoEmergency: [],
        groupContactInfoCommunications: [],
        groupAvailability: [],
        groupAssignments: [],
        updatingGroupAvailability: [],
        assignmentDetailMetadata: [],
        assignmentDetailResources: [],
        assignmentResources: [],
        creatingAssignment: [],
        updatingAssignmentResource: [],
        severe: [],
    };
}

export function getDefaultFormState(): FormState {
    return {
        isUnsaved: false,
        //isValid: true
    };
}

export function getDefaultFormStates(): FormStates {
    return {
        groupMembers: getDefaultFormState(),
        personnelDetailMetadata: getDefaultFormState(),
        personnelAvailabilitySummary: getDefaultFormState(),
        personnelContactInfoOther: getDefaultFormState(),
        personnelContactInfoEmergency: getDefaultFormState(),
        personnelContactInfoCommunications: getDefaultFormState(),
        personnelContactInfoWorkAddress: getDefaultFormState(),
        personnelCharacteristics: getDefaultFormState(),
        personnelAvailability: getDefaultFormState(),
        updatingPersonnelAvailability: getDefaultFormState(),
        personnelGroupMembershipsCurrent: getDefaultFormState(),
        personnelGroupMembershipsPast: getDefaultFormState(),
        groupDetailMetadata: getDefaultFormState(),
        groupAvailabilitySummary: getDefaultFormState(),
        groupDetailMembersCurrent: getDefaultFormState(),
        groupDetailMembersPast: getDefaultFormState(),
        groupContactInfoOther: getDefaultFormState(),
        groupContactInfoEmergency: getDefaultFormState(),
        groupContactInfoCommunications: getDefaultFormState(),
        groupAvailability: getDefaultFormState(),
        updatingGroupAvailability: getDefaultFormState(),
        assignmentDetailMetadata: getDefaultFormState(),
        assignmentDetailResources: getDefaultFormState(),
        assignmentResources: getDefaultFormState(),
    };
}

export function getDefaultApplicationState(): ApplicationState {
    return {
        loadStates: getDefaultLoadStates(),
        errorStates: getDefaultErrorStates(),
        formStates: getDefaultFormStates(),
    };
}
