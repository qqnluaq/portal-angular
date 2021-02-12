import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { VisualizeService } from "../../services";

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

    @ViewChild('visualizeContainer') visualizeContainer;

    private dashboard: any;

    constructor(
        protected visualizeService: VisualizeService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        var self = this

        window[ 'visualize' ]( {}, function (vis) {
            self.dashboard = vis.dashboard({
                resource: self.reportPath,
                container: self.visualizeContainer.nativeElement,
                error: function ( err ) {
                    console.error( err )
                }
            } )
        } )
    }

    // isExportFormatSupported(format: string) {
    //     if (format) {
    //         if (this.supportedExportFormats && this.supportedExportFormats.length > 0) {
    //             return this.supportedExportFormats.includes(format);
    //         }
    //     }
    //     return false;
    // }

    // exportToPDF() {
    //     this.export('pdf');
    // }

    // exportToExcel() {
    //     this.export('csv');
    // }

    // previousPage() {
    //     if (this.currentPage !== 1) {
    //         this.currentPage -= 1;
    //         this.report.pages(this.currentPage).run().fail((err) => console.error(err));
    //     }
    // }

    // nextPage() {
    //     this.currentPage += 1;
    //     this.report.pages(this.currentPage).run().fail((err) => {
    //         if (err.errorCode === 'page.number.out.of.range') {
    //             this.currentPage -= 1;
    //         } else {
    //             console.error(err);
    //         }
    //     });
    // }

    // private export(outputFormat: string) {
    //     let params = {
    //         outputFormat: outputFormat,
    //         ignorePagination: outputFormat === 'csv' ? true : false
    //     };
    //     this.report.export(params)
    //         .done(function (link) {
    //             window.open(link.href); // open new window to download report
    //         })
    //         .fail(function (err) {
    //             alert(err.message);
    //         });
    // }
}
