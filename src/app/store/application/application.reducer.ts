import {Action} from "@ngrx/store";
import {
    ApplicationState,
    ERROR_TYPE,
    ErrorState,
    getDefaultApplicationState,
    getDefaultFormState,
    getDefaultLoadStates
} from "./application.state";
import {SET_FORM_STATE_UNSAVED, SetFormStateUnsavedAction} from "./application.actions";

export function applicationReducer(state: ApplicationState = getDefaultApplicationState(), action: Action): ApplicationState {
    switch (action.type) {
        // return updateLoadState(state, action, true);
        // return updateLoadState(state, action, false);
        // return updateErrorState(state, action, action["payload"]["error"]);
    
        case SET_FORM_STATE_UNSAVED: {
            let typedAction = <SetFormStateUnsavedAction>action;
            return {...state, formStates: {...state.formStates,
                    [typedAction.payload.componentId]: {
                        ...state.formStates[typedAction.payload.componentId],
                        isUnsaved: typedAction.payload.isUnsaved,
                    }
                }
            };
        }

        // return clearErrorState(state, action);
    
        default: {
            return state;
        }
    }
}

export function getStatePropertyNameForActionName(action: Action): string {
    return ''
    // let actionType = action.type;
    // let typedAction = null;
    // switch (actionType) {
    //     case LOAD_PERSONNEL_DETAIL_METADATA:
    //     case LOAD_PERSONNEL_DETAIL_METADATA_SUCCESS:
    //     case LOAD_PERSONNEL_DETAIL_METADATA_ERROR:
    //     case UPDATE_PERSONNEL_DETAIL_METADATA:
    //     case UPDATE_PERSONNEL_DETAIL_METADATA_SUCCESS:
    //     case UPDATE_PERSONNEL_DETAIL_METADATA_ERROR:
    //         return PERSONNEL_METADATA_COMPONENT_ID;
    //     case LOAD_PERSONNEL_CHARACTERISTICS:
    //     case LOAD_PERSONNEL_CHARACTERISTICS_SUCCESS:
    //     case LOAD_PERSONNEL_CHARACTERISTICS_ERROR:
    //     case UPDATE_PERSONNEL_CHARACTERISTICS:
    //     case UPDATE_PERSONNEL_CHARACTERISTICS_SUCCESS:
    //     case UPDATE_PERSONNEL_CHARACTERISTICS_ERROR:
    //         return PERSONNEL_CHARACTERISTICS_COMPONENT_ID;
    //     case LOAD_PERSONNEL_CONTACT_INFO_WORK_ADDRESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_WORK_ADDRESS_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_WORK_ADDRESS_ERROR:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_WORK_ADDRESS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_WORK_ADDRESS_SUCCESS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_WORK_ADDRESS_ERROR:
    //         return PERSONNEL_CI_WORK_ADDRESS_COMPONENT_ID;
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_COMMUNICATIONS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_LIST:
    //     case CREATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS:
    //     case DELETE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS:
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_LIST_SUCCESS:
    //     case CREATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case DELETE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_LIST_ERROR:
    //     case CREATE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case LOAD_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case DELETE_PERSONNEL_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //         return PERSONNEL_CI_COMMUNICATIONS_COMPONENT_ID;
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_OTHER:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_OTHER:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER_LIST:
    //     case CREATE_PERSONNEL_CONTACT_INFO_OTHER:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER:
    //     case DELETE_PERSONNEL_CONTACT_INFO_OTHER:
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_OTHER_SUCCESS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_OTHER_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER_LIST_SUCCESS:
    //     case CREATE_PERSONNEL_CONTACT_INFO_OTHER_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER_SUCCESS:
    //     case DELETE_PERSONNEL_CONTACT_INFO_OTHER_SUCCESS:
    //     case UPDATE_BATCH_PERSONNEL_CONTACT_INFO_OTHER_ERROR:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_OTHER_ERROR:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER_LIST_ERROR:
    //     case CREATE_PERSONNEL_CONTACT_INFO_OTHER_ERROR:
    //     case LOAD_PERSONNEL_CONTACT_INFO_OTHER_ERROR:
    //     case DELETE_PERSONNEL_CONTACT_INFO_OTHER_ERROR:
    //         return PERSONNEL_CI_OTHER_COMPONENT_ID;
    //     case LOAD_PERSONNEL_CONTACT_INFO_EMERGENCY:
    //     case LOAD_PERSONNEL_CONTACT_INFO_EMERGENCY_SUCCESS:
    //     case LOAD_PERSONNEL_CONTACT_INFO_EMERGENCY_ERROR:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_EMERGENCY:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_EMERGENCY_SUCCESS:
    //     case UPDATE_PERSONNEL_CONTACT_INFO_EMERGENCY_ERROR:
    //         return PERSONNEL_CI_EMERGENCY_COMPONENT_ID;
    //     case LOAD_PERSONNEL_GROUP_MEMBERSHIP:
    //     case LOAD_PERSONNEL_GROUP_MEMBERSHIP_SUCCESS:
    //     case LOAD_PERSONNEL_GROUP_MEMBERSHIP_ERROR:
    //         return PERSONNEL_GROUP_MEMBERSHIPS_COMPONENT_ID;
    //     case LOAD_PERSONNEL_AVAILABILITY:
    //     case LOAD_PERSONNEL_AVAILABILITY_SUCCESS:
    //     case LOAD_PERSONNEL_AVAILABILITY_ERROR:
    //         return PERSONNEL_AVAILABILITY_COMPONENT_ID;
    //     case LOAD_PERSONNEL_AVAILABILITY_FOR_UPDATE:
    //     case LOAD_PERSONNEL_AVAILABILITY_FOR_UPDATE_SUCCESS:
    //     case LOAD_PERSONNEL_AVAILABILITY_FOR_UPDATE_ERROR:
    //     case UPDATE_PERSONNEL_AVAILABILITY:
    //     case UPDATE_PERSONNEL_AVAILABILITY_SUCCESS:
    //     case UPDATE_PERSONNEL_AVAILABILITY_ERROR:
    //         return PERSONNEL_AVAILABILITY_UPDATING_COMPONENT_ID;
    //     case LOAD_PERSONNEL_AVAILABILITY_SUMMARY:
    //     case LOAD_PERSONNEL_AVAILABILITY_SUMMARY_SUCCESS:
    //     case LOAD_PERSONNEL_AVAILABILITY_SUMMARY_ERROR:
    //     case LOAD_PERSONNEL_FATIGUE_SUMMARY:
    //     case LOAD_PERSONNEL_FATIGUE_SUMMARY_SUCCESS:
    //     case LOAD_PERSONNEL_FATIGUE_SUMMARY_ERROR:
    //         return PERSONNEL_AVAILABILITY_SUMMARY_COMPONENT_ID;
    //     case SEARCH_PERSONNEL:
    //     case SEARCH_PERSONNEL_SUCCESS:
    //     case SEARCH_PERSONNEL_ERROR:
    //         return PERSONNEL_COMPONENT_ID;
    //     case LOAD_GROUP_DETAIL_METADATA:
    //     case LOAD_GROUP_DETAIL_METADATA_SUCCESS:
    //     case LOAD_GROUP_DETAIL_METADATA_ERROR:
    //     case UPDATE_GROUP_DETAIL_METADATA:
    //     case UPDATE_GROUP_DETAIL_METADATA_SUCCESS:
    //     case UPDATE_GROUP_DETAIL_METADATA_ERROR:
    //     case CREATE_GROUP_DETAIL_METADATA:
    //     case CREATE_GROUP_DETAIL_METADATA_SUCCESS:
    //     case CREATE_GROUP_DETAIL_METADATA_ERROR:
    //         return GROUP_METADATA_COMPONENT_ID;
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_COMMUNICATIONS:
    //     case UPDATE_GROUP_CONTACT_INFO_COMMUNICATIONS:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS_LIST:
    //     case CREATE_GROUP_CONTACT_INFO_COMMUNICATIONS:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS:
    //     case DELETE_GROUP_CONTACT_INFO_COMMUNICATIONS:
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case UPDATE_GROUP_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS_LIST_SUCCESS:
    //     case CREATE_GROUP_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case DELETE_GROUP_CONTACT_INFO_COMMUNICATIONS_SUCCESS:
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case UPDATE_GROUP_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS_LIST_ERROR:
    //     case CREATE_GROUP_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case LOAD_GROUP_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //     case DELETE_GROUP_CONTACT_INFO_COMMUNICATIONS_ERROR:
    //         return GROUP_CI_COMMUNICATIONS_COMPONENT_ID;
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_OTHER:
    //     case UPDATE_GROUP_CONTACT_INFO_OTHER:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER_LIST:
    //     case CREATE_GROUP_CONTACT_INFO_OTHER:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER:
    //     case DELETE_GROUP_CONTACT_INFO_OTHER:
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_OTHER_SUCCESS:
    //     case UPDATE_GROUP_CONTACT_INFO_OTHER_SUCCESS:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER_LIST_SUCCESS:
    //     case CREATE_GROUP_CONTACT_INFO_OTHER_SUCCESS:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER_SUCCESS:
    //     case DELETE_GROUP_CONTACT_INFO_OTHER_SUCCESS:
    //     case UPDATE_BATCH_GROUP_CONTACT_INFO_OTHER_ERROR:
    //     case UPDATE_GROUP_CONTACT_INFO_OTHER_ERROR:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER_LIST_ERROR:
    //     case CREATE_GROUP_CONTACT_INFO_OTHER_ERROR:
    //     case LOAD_GROUP_CONTACT_INFO_OTHER_ERROR:
    //     case DELETE_GROUP_CONTACT_INFO_OTHER_ERROR:
    //         return GROUP_CI_OTHER_COMPONENT_ID;
    //     case LOAD_GROUP_CONTACT_INFO_EMERGENCY:
    //     case LOAD_GROUP_CONTACT_INFO_EMERGENCY_SUCCESS:
    //     case LOAD_GROUP_CONTACT_INFO_EMERGENCY_ERROR:
    //     case UPDATE_GROUP_CONTACT_INFO_EMERGENCY:
    //     case UPDATE_GROUP_CONTACT_INFO_EMERGENCY_SUCCESS:
    //     case UPDATE_GROUP_CONTACT_INFO_EMERGENCY_ERROR:
    //         return GROUP_CI_EMERGENCY_COMPONENT_ID;
    //     case LOAD_GROUP_MEMBERS:
    //     case LOAD_GROUP_MEMBERS_SUCCESS:
    //     case LOAD_GROUP_MEMBERS_ERROR:
    //         return GROUP_DETAIL_MEMBERS_COMPONENT_ID;
    //     case LOAD_GROUP_MEMBER:
    //     case LOAD_GROUP_MEMBER_SUCCESS:
    //     case LOAD_GROUP_MEMBER_ERROR:
    //     case DELETE_GROUP_MEMBER:
    //     case DELETE_GROUP_MEMBER_SUCCESS:
    //     case DELETE_GROUP_MEMBER_ERROR:
    //     case UPDATE_GROUP_MEMBER:
    //     case UPDATE_GROUP_MEMBER_SUCCESS:
    //     case UPDATE_GROUP_MEMBER_ERROR:
    //     case CREATE_GROUP_MEMBER:
    //     case CREATE_GROUP_MEMBER_SUCCESS:
    //     case CREATE_GROUP_MEMBER_ERROR:
    //         return GROUP_MEMBER_UPDATING_COMPONENT_ID;
    //     case SEARCH_GROUPS:
    //     case SEARCH_GROUPS_SUCCESS:
    //     case SEARCH_GROUPS_ERROR:
    //         return GROUPS_COMPONENT_ID;
    //     case SEARCH_GROUP_MEMBERS:
    //     case SEARCH_GROUP_MEMBERS_SUCCESS:
    //     case SEARCH_GROUP_MEMBERS_ERROR:
    //     case UPDATE_GROUP_MEMBERS:
    //     case UPDATE_GROUP_MEMBERS_SUCCESS:
    //     case UPDATE_GROUP_MEMBERS_ERROR:
    //         return GROUP_MEMBERS_COMPONENT_ID;
    //     case LOAD_GROUP_AVAILABILITY:
    //     case LOAD_GROUP_AVAILABILITY_SUCCESS:
    //     case LOAD_GROUP_AVAILABILITY_ERROR:
    //         return GROUP_AVAILABILITY_COMPONENT_ID;
    //     case LOAD_GROUP_AVAILABILITY_FOR_UPDATE:
    //     case LOAD_GROUP_AVAILABILITY_FOR_UPDATE_SUCCESS:
    //     case LOAD_GROUP_AVAILABILITY_FOR_UPDATE_ERROR:
    //     case UPDATE_GROUP_AVAILABILITY:
    //     case UPDATE_GROUP_AVAILABILITY_SUCCESS:
    //     case UPDATE_GROUP_AVAILABILITY_ERROR:
    //         return GROUP_AVAILABILITY_UPDATING_COMPONENT_ID;
    //     case LOAD_GROUP_AVAILABILITY_SUMMARY:
    //     case LOAD_GROUP_AVAILABILITY_SUMMARY_SUCCESS:
    //     case LOAD_GROUP_AVAILABILITY_SUMMARY_ERROR:
    //     case LOAD_GROUP_FATIGUE_SUMMARY:
    //     case LOAD_GROUP_FATIGUE_SUMMARY_SUCCESS:
    //     case LOAD_GROUP_FATIGUE_SUMMARY_ERROR:
    //         return GROUP_AVAILABILITY_SUMMARY_COMPONENT_ID;
    //     case SEARCH_ASSIGNMENTS:
    //     case SEARCH_ASSIGNMENTS_SUCCESS:
    //     case SEARCH_ASSIGNMENTS_ERROR:
    //         return ASSIGNMENTS_COMPONENT_ID;
    //     case SEARCH_ASSIGNMENTS_DIALOG:
    //     case SEARCH_ASSIGNMENTS_DIALOG_SUCCESS:
    //     case SEARCH_ASSIGNMENTS_DIALOG_ERROR:
    //         return ASSIGNMENTS_DIALOG_COMPONENT_ID;
    //     case SEARCH_ASSIGNMENT_RESOURCES:
    //     case SEARCH_ASSIGNMENT_RESOURCES_SUCCESS:
    //     case SEARCH_ASSIGNMENT_RESOURCES_ERROR:
    //         return ASSIGNMENT_RESOURCES_COMPONENT_ID;
    //     case LOAD_ASSIGNMENT_DETAIL_METADATA:
    //     case LOAD_ASSIGNMENT_DETAIL_METADATA_SUCCESS:
    //     case LOAD_ASSIGNMENT_DETAIL_METADATA_ERROR:
    //     case UPDATE_ASSIGNMENT_DETAIL_METADATA:
    //     case UPDATE_ASSIGNMENT_DETAIL_METADATA_SUCCESS:
    //     case UPDATE_ASSIGNMENT_DETAIL_METADATA_ERROR:
    //     case CREATE_ASSIGNMENT_DETAIL_METADATA:
    //     case CREATE_ASSIGNMENT_DETAIL_METADATA_SUCCESS:
    //     case CREATE_ASSIGNMENT_DETAIL_METADATA_ERROR:
    //         return ASSIGNMENT_METADATA_COMPONENT_ID;
    //     case SEARCH_ASSIGNMENT_DETAIL_RESOURCES:
    //     case SEARCH_ASSIGNMENT_DETAIL_RESOURCES_SUCCESS:
    //     case SEARCH_ASSIGNMENT_DETAIL_RESOURCES_ERROR:
    //         return ASSIGNMENT_DETAIL_RESOURCES_COMPONENT_ID;
    //     case LOAD_ASSIGNMENT_RESOURCE:
    //     case LOAD_ASSIGNMENT_RESOURCE_SUCCESS:
    //     case LOAD_ASSIGNMENT_RESOURCE_ERROR:
    //     case UPDATE_ASSIGNMENT_RESOURCE:
    //     case UPDATE_ASSIGNMENT_RESOURCE_SUCCESS:
    //     case UPDATE_ASSIGNMENT_RESOURCE_ERROR:
    //     case CREATE_ASSIGNMENT_RESOURCE:
    //     case CREATE_ASSIGNMENT_RESOURCE_SUCCESS:
    //     case CREATE_ASSIGNMENT_RESOURCE_ERROR:
    //     case DELETE_ASSIGNMENT_RESOURCE:
    //     case DELETE_ASSIGNMENT_RESOURCE_SUCCESS:
    //     case DELETE_ASSIGNMENT_RESOURCE_ERROR:
    //     case CLEAR_UPDATING_ASSIGNMENT_RESOURCE:
    //         return ASSIGNMENT_RESOURCE_UPDATING_COMPONENT_ID;
    //     case LOAD_PERSONNEL_CERTIFICATIONS:
    //     case LOAD_PERSONNEL_CERTIFICATIONS_SUCCESS:
    //     case LOAD_PERSONNEL_CERTIFICATIONS_ERROR:
    //         return PERSONNEL_CERTIFICATIONS_COMPONENT_ID;
    //     case LOAD_PERSONNEL_ASSIGNMENTS:
    //     case LOAD_PERSONNEL_ASSIGNMENTS_SUCCESS:
    //     case LOAD_PERSONNEL_ASSIGNMENTS_ERROR:
    //         return PERSONNEL_ASSIGNMENTS_COMPONENT_ID;
    //     case LOAD_GROUP_ASSIGNMENTS:
    //     case LOAD_GROUP_ASSIGNMENTS_SUCCESS:
    //     case LOAD_GROUP_ASSIGNMENTS_ERROR:
    //         return GROUP_ASSIGNMENTS_COMPONENT_ID;
    //     case SEARCH_GROUPS_RESOURCES:
    //     case SEARCH_GROUPS_RESOURCES_SUCCESS:
    //     case SEARCH_GROUPS_RESOURCES_ERROR:
    //     case SEARCH_PERSONNEL_RESOURCES:
    //     case SEARCH_PERSONNEL_RESOURCES_SUCCESS:
    //     case SEARCH_PERSONNEL_RESOURCES_ERROR:
    //         return RESOURCES_COMPONENT_ID;
    //     default:
    //         return null;
    // }
}

export function updateLoadState(state: ApplicationState, action: Action, value: boolean): ApplicationState {
    let component = getStatePropertyNameForActionName(action);
    let st = state;
    if (value) { // if starting load, reset error state
        st = clearErrorState(state, action);
    } else { //if ending load, reset form state
        st = clearFormState(state, action);
    }
    // Only update state if there is a value change
    //console.log(component, action.type, value);
    if (component && (!state.loadStates || !state.loadStates[component] || state.loadStates[component].isLoading !== value)) {
        return {
            ...st,
            loadStates: {...st.loadStates, [component]: {isLoading: value}}
        };
    } else {
        return st;
    }
}

export function updateErrorState(state: ApplicationState, action: Action, value: ErrorState): ApplicationState {
    let component = getStatePropertyNameForActionName(action);
    if (component) {
        if (value.type == ERROR_TYPE.FATAL) {
            let ns = {
                ...state,
                errorStates: {...state.errorStates, ["severe"]: [...state.errorStates["severe"], value]},
                loadStates: getDefaultLoadStates() // set all load states to false on a fatal error
            };
            return ns;
        }

        if (state.errorStates && state.errorStates[component]) {
            if (state.errorStates[component].find && state.errorStates[component].find((errorState: ErrorState) => errorState.message == value.message)) {
                return state;
            }
        }

        return {
            ...state,
            errorStates: {...state.errorStates, [component]: [...state.errorStates[component], value]},
            loadStates: {...state.loadStates, [component]: {isLoading: false}}
        };
    } else {
        return state;
    }
}

export function clearErrorState(state: ApplicationState, action: Action): ApplicationState {
    //TODO filter out errors in 'errors' param by UUID
    let component = getStatePropertyNameForActionName(action);
    if (component) {
        return {
            ...state,
            errorStates: {...state.errorStates, [component]: []},
        };
    } else {
        return state;
    }
}

export function clearFormState(state: ApplicationState, action: Action): ApplicationState {
    let component = getStatePropertyNameForActionName(action);
    if (component) {
        return {
            ...state,
            formStates: {...state.formStates, [component]: getDefaultFormState()},
        };
    } else {
        return state;
    }
}
