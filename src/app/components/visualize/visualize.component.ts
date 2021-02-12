import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import { VisualizeService } from "../../services";
// import {AppConfigService} from "../services/app-config.service";

declare var visualize: any; // Loaded by Visualize.JS api in the project's angular.json file.

interface ReportConfig {
  resource: string;
  container: string;
  error: any;
  params?: any;
}

@Component({
  selector: 'visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit, AfterViewInit {

  @Input() elementId: string;
  @Input() reportPath: string;
  @Input() reportParams?: any;
  @Input() supportedExportFormats?: string[];

  currentPage = 1;

  private report: any;
  private dashboard: any;

  static handleError(err) {
    console.error(err);
  }

  constructor(
    protected visualizeService: VisualizeService
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    var self = this
    // const config = this.appConfig.getConfig();
    // if (!config || !config.externalAppConfig || !config.externalAppConfig.jasper) {
    //   throw new Error('Could not find Jasper configuration settings in application configuration');
    // }
    //   let themeHref = `${config.externalAppConfig.jasper.url}/_themes/${config.externalAppConfig.jasper.themeHash}/theme.css`.split("/").slice(0, -1).join("/");

    //   visualize.config({
    //       server : config.externalAppConfig.jasper.url,
    //       scripts : `runtime/${config.externalAppConfig.jasper.scriptsHash}/optimized-scripts`,
    //       logEnabled: true,
    //       logLevel: "error",
    //       _showInputControls: "true" === "true",
    //       theme: {
    //           href: themeHref
    //       }
    //   });
    // new Promise((resolve, reject) => {

    window[ 'visualize' ]( {
      // server: config.externalAppConfig.jasper.url
    }, function ( vis ) {
      // let reportConfig: any = {
      //   resource: self.reportPath,
      //   container: `#${self.elementId}`,
      //   error: VisualizeComponent.handleError,
      // };
      // if (self.reportParams) {
      //   reportConfig.params = self.reportParams;
      // }
      // self.report = vis.report(reportConfig);
    // }).then(result => this.report = result)
    //   .catch(error => console.error(error));

    self.dashboard = vis.dashboard( {
      resource: self.reportPath,
      container: `#${self.elementId}`,
      error: VisualizeComponent.handleError,
  } )
});
}

  isExportFormatSupported(format: string) {
    if (format) {
      if (this.supportedExportFormats && this.supportedExportFormats.length > 0) {
        return this.supportedExportFormats.includes(format);
      }
    }
    return false;
  }

  exportToPDF() {
    this.export('pdf');
  }

  exportToExcel() {
    this.export('csv');
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage -= 1;
      this.report.pages(this.currentPage).run().fail((err) => console.error(err));
    }
  }

  nextPage() {
    this.currentPage += 1;
    this.report.pages(this.currentPage).run().fail((err) => {
      if (err.errorCode === 'page.number.out.of.range') {
        this.currentPage -= 1;
      } else {
        console.error(err);
      }
    });
  }

  private export(outputFormat: string) {
    let params = { outputFormat: outputFormat,
                   ignorePagination: outputFormat === 'csv' ? true : false
                 };
    this.report.export(params)
      .done(function (link) {
        window.open(link.href); // open new window to download report
      })
      .fail(function (err) {
        alert(err.message);
      });
  }
}
