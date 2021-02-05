import {ErrorState, LoadState} from "./application.state";
import {RootState} from "../index";
import {SearchState} from "@wf1/core-ui";

export const selectSearchState = (componentId) => (state: RootState): SearchState => ((state[componentId]) ? state[componentId] : undefined);

export const selectPersonnelLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnel) ? state.application.loadStates.personnel : undefined);
export const selectPersonnelErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnel) ? state.application.errorStates.personnel : undefined);

export const selectGroupsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groups) ? state.application.loadStates.groups : undefined);
export const selectGroupsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groups) ? state.application.errorStates.groups : undefined);

export const selectPersonnelDetailMetadataLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelDetailMetadata) ? state.application.loadStates.personnelDetailMetadata : undefined);
export const selectPersonnelDetailMetadataErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelDetailMetadata) ? state.application.errorStates.personnelDetailMetadata : undefined);

export const selectGroupDetailMetadataLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupDetailMetadata) ? state.application.loadStates.groupDetailMetadata : undefined);
export const selectGroupDetailMetadataErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupDetailMetadata) ? state.application.errorStates.groupDetailMetadata : undefined);

export const selectGroupDetailMembersCurrentLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupDetailMembersCurrent) ? state.application.loadStates.groupDetailMembersCurrent : undefined);
export const selectGroupDetailMembersCurrentErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupDetailMembersCurrent) ? state.application.errorStates.groupDetailMembersCurrent : undefined);

export const selectGroupDetailMembersPastLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupDetailMembersPast) ? state.application.loadStates.groupDetailMembersPast : undefined);
export const selectGroupDetailMembersPastErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupDetailMembersPast) ? state.application.errorStates.groupDetailMembersPast : undefined);

export const selectGroupDetailMembersLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupDetailMembers) ? state.application.loadStates.groupDetailMembers : undefined);
export const selectGroupDetailMembersErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupDetailMembers) ? state.application.errorStates.groupDetailMembers : undefined);

export const selectGroupMembersLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupMembers) ? state.application.loadStates.groupMembers : undefined);
export const selectGroupMembersErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupMembers) ? state.application.errorStates.groupMembers : undefined);

export const selectUpdatingGroupMemberLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.updatingGroupMember) ? state.application.loadStates.updatingGroupMember : undefined);
export const selectUpdatingGroupMemberErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.updatingGroupMember) ? state.application.errorStates.updatingGroupMember : undefined);

export const selectPersonnelCharacteristicsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelCharacteristics) ? state.application.loadStates.personnelCharacteristics : undefined);
export const selectPersonnelCharacteristicsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelCharacteristics) ? state.application.errorStates.personnelCharacteristics : undefined);

export const selectPersonnelGroupMembershipsCurrentLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelGroupMembershipsCurrent) ? state.application.loadStates.personnelGroupMembershipsCurrent : undefined);
export const selectPersonnelGroupMembershipsCurrentErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelGroupMembershipsCurrent) ? state.application.errorStates.personnelGroupMembershipsCurrent : undefined);

export const selectPersonnelGroupMembershipsPastLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelGroupMembershipsPast) ? state.application.loadStates.personnelGroupMembershipsPast : undefined);
export const selectPersonnelGroupMembershipsPastErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelGroupMembershipsPast) ? state.application.errorStates.personnelGroupMembershipsPast : undefined);

export const selectPersonnelContactInfoOtherLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelContactInfoOther) ? state.application.loadStates.personnelContactInfoOther : undefined);
export const selectPersonnelContactInfoOtherErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelContactInfoOther) ? state.application.errorStates.personnelContactInfoOther : undefined);

export const selectPersonnelContactInfoEmergencyLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelContactInfoEmergency) ? state.application.loadStates.personnelContactInfoEmergency : undefined);
export const selectPersonnelContactInfoEmergencyErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelContactInfoEmergency) ? state.application.errorStates.personnelContactInfoEmergency : undefined);

export const selectPersonnelContactInfoCommunicationsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelContactInfoCommunications) ? state.application.loadStates.personnelContactInfoCommunications : undefined);
export const selectPersonnelContactInfoCommunicationsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelContactInfoCommunications) ? state.application.errorStates.personnelContactInfoCommunications : undefined);

export const selectPersonnelContactInfoWorkAddressLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelContactInfoWorkAddress) ? state.application.loadStates.personnelContactInfoWorkAddress : undefined);
export const selectPersonnelContactInfoWorkAddressErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelContactInfoWorkAddress) ? state.application.errorStates.personnelContactInfoWorkAddress : undefined);

export const selectGroupContactInfoOtherLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupContactInfoOther) ? state.application.loadStates.groupContactInfoOther : undefined);
export const selectGroupContactInfoOtherErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupContactInfoOther) ? state.application.errorStates.groupContactInfoOther : undefined);

export const selectGroupContactInfoEmergencyLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupContactInfoEmergency) ? state.application.loadStates.groupContactInfoEmergency : undefined);
export const selectGroupContactInfoEmergencyErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupContactInfoEmergency) ? state.application.errorStates.groupContactInfoEmergency : undefined);

export const selectGroupContactInfoCommunicationsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupContactInfoCommunications) ? state.application.loadStates.groupContactInfoCommunications : undefined);
export const selectGroupContactInfoCommunicationsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupContactInfoCommunications) ? state.application.errorStates.groupContactInfoCommunications : undefined);

export const selectGroupAvailabilityLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupAvailability) ? state.application.loadStates.groupAvailability : undefined);
export const selectGroupAvailabilityErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupAvailability) ? state.application.errorStates.groupAvailability : undefined);

export const selectUpdatingGroupAvailabilityLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.updatingGroupAvailability) ? state.application.loadStates.updatingGroupAvailability : undefined);
export const selectUpdatingGroupAvailabilityErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.updatingGroupAvailability) ? state.application.errorStates.updatingGroupAvailability : undefined);

export const selectGroupAvailabilitySummaryLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupAvailabilitySummary) ? state.application.loadStates.groupAvailabilitySummary : undefined);
export const selectGroupAvailabilitySummaryErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupAvailabilitySummary) ? state.application.errorStates.groupAvailabilitySummary : undefined);

export const selectPersonnelAvailabilityLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelAvailability) ? state.application.loadStates.personnelAvailability : undefined);
export const selectPersonnelAvailabilityErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelAvailability) ? state.application.errorStates.personnelAvailability : undefined);

export const selectUpdatingPersonnelAvailabilityLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.updatingPersonnelAvailability) ? state.application.loadStates.updatingPersonnelAvailability : undefined);
export const selectUpdatingPersonnelAvailabilityErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.updatingPersonnelAvailability) ? state.application.errorStates.updatingPersonnelAvailability : undefined);

export const selectPersonnelAvailabilitySummaryLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelAvailabilitySummary) ? state.application.loadStates.personnelAvailabilitySummary : undefined);
export const selectPersonnelAvailabilitySummaryErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelAvailabilitySummary) ? state.application.errorStates.personnelAvailabilitySummary : undefined);

export const selectAssignmentsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.assignments) ? state.application.loadStates.assignments : undefined);
export const selectAssignmentsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.assignments) ? state.application.errorStates.assignments : undefined);

export const selectAssignmentsDialogLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.assignmentsDialog) ? state.application.loadStates.assignmentsDialog : undefined);
export const selectAssignmentsDIalogErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.assignmentsDialog) ? state.application.errorStates.assignmentsDialog : undefined);

export const selectIncidentsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.incidents) ? state.application.loadStates.incidents : undefined);
export const selectIncidentsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.incidents) ? state.application.errorStates.incidents : undefined);

export const selectAssignmentDetailMetadataLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.assignmentDetailMetadata) ? state.application.loadStates.assignmentDetailMetadata : undefined);
export const selectAssignmentDetailMetadataErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.assignmentDetailMetadata) ? state.application.errorStates.assignmentDetailMetadata : undefined);

export const selectAssignmentDetailResourcesLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.assignmentDetailMetadata) ? state.application.loadStates.assignmentDetailResources : undefined);
export const selectAssignmentDetailResourcesErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.assignmentDetailMetadata) ? state.application.errorStates.assignmentDetailResources : undefined);

export const selectAssignmentResourcesLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.assignmentResources) ? state.application.loadStates.assignmentResources : undefined);
export const selectAssignmentResourcesErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.assignmentResources) ? state.application.errorStates.assignmentResources : undefined);

export const selectUpdatingAssignmentResourceLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.updatingAssignmentResource) ? state.application.loadStates.updatingAssignmentResource : undefined);
export const selectUpdatingAssignmentResourceErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.updatingAssignmentResource) ? state.application.errorStates.updatingAssignmentResource : undefined);

export const selectPersonnelCertificationsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelCertifications) ? state.application.loadStates.personnelCertifications : undefined);
export const selectPersonnelCertificationsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelCertifications) ? state.application.errorStates.personnelCertifications : undefined);

export const selectPersonnelAssignmentsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.personnelAssignments) ? state.application.loadStates.personnelAssignments : undefined);
export const selectPersonnelAssignmentsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.personnelAssignments) ? state.application.errorStates.personnelAssignments : undefined);

export const selectGroupAssignmentsLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.groupAssignments) ? state.application.loadStates.groupAssignments : undefined);
export const selectGroupAssignmentsErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.groupAssignments) ? state.application.errorStates.groupAssignments : undefined);

export const selectResourcesLoadState = () => (state: RootState): LoadState => ((state.application.loadStates.resources) ? state.application.loadStates.resources : undefined);
export const selectResourcesErrorState = () => (state: RootState): ErrorState[] => ((state.application.errorStates.resources) ? state.application.errorStates.resources : undefined);


export const selectFormStateUnsaved = (componentId: string) => (state: RootState): boolean => ((state.application.formStates[componentId]) ? state.application.formStates[componentId].isUnsaved : false);

export const selectFormStatesUnsaved = (componentIds: string[]) => (state: RootState): boolean => {
    let ret = false;
    if (componentIds && componentIds.length) {
        componentIds.forEach(componentId => {
            let formUnsaved = state.application.formStates[componentId] ? state.application.formStates[componentId].isUnsaved : false;
            ret = ret || formUnsaved;
        });
    }
    return ret;
};

