import {BaseContainer} from "../base/base-container.component";
// import {select} from "@ngrx/store";
// import {Observable} from "rxjs";
// import {vmPersonnelList} from "../../conversion/models";
// import {selectPersonnel} from "../../store/personnel/personnel.selectors";
// import {ErrorState, LoadState} from "../../store/application/application.state";
// import {
//     selectPersonnelErrorState,
//     selectPersonnelLoadState,
//     selectSearchState
// } from "../../store/application/application.selectors";
// import {SEARCH_PERSONNEL_COMPONENT_ID} from "../../store/personnel/personnel.state";
// import {SearchState} from "@wf1/core-ui";

export class HomeContainer extends BaseContainer {
    // collection$: Observable<vmPersonnelList> = this.store.pipe(select(selectPersonnel()));
    // searchState$: Observable<SearchState> = this.store.pipe(select(selectSearchState(SEARCH_PERSONNEL_COMPONENT_ID)));
    // loadState$: Observable<LoadState> = this.store.pipe(select(selectPersonnelLoadState()));
    // errorState$: Observable<ErrorState[]> = this.store.pipe(select(selectPersonnelErrorState()));
}
