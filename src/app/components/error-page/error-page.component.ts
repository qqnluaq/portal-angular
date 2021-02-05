import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {ParamMap} from "@angular/router";
import {BaseComponent} from "../common/base/base.component";
import {ResourcesRoutes} from "../../utils";

@Component({
  selector: 'wfrm-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent extends BaseComponent implements OnInit, OnDestroy {

  private sub;
  errorMsg;

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(
      (params: ParamMap) => {
        if (params && params['message']) {
          this.errorMsg = unescape(params['message']);
        }
      }
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  returnToHome() {
    this.router.navigate([ResourcesRoutes.LANDING] );
  }
}
