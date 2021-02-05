import {Action, ActionReducerMap} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";

import {applicationReducer} from "./application/application.reducer";
import {ApplicationEffects} from "./application/application.effects";
import {ApplicationState, PagingSearchState} from "./application/application.state";

export const rootReducers: ActionReducerMap<any> = {
    router: routerReducer,
    application: applicationReducer,
};

export interface RootState {
    application?: ApplicationState;
    searchPersonnel?: PagingSearchState;
    searchGroupMembers?: PagingSearchState;
    searchGroups?: PagingSearchState;
    searchAssignments?: PagingSearchState;
    searchPersonnelResources?: PagingSearchState;
    searchGroupsResources?: PagingSearchState;
    searchAssignmentsDialog?: PagingSearchState;
    searchAssignmentDetailResources?: PagingSearchState;
    searchAssignmentResources?: PagingSearchState;
}

export const initialRootState: RootState = {
};

export const rootEffects: any[] = [
    ApplicationEffects,
];

export interface LabeledAction extends Action {
    displayLabel: string;
}

