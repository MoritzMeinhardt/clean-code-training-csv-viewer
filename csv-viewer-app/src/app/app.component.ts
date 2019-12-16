import { Component, OnInit } from '@angular/core';
import { TableDataImportService } from "./shared/table-data-import.service";
import { ITERATION1 } from "./csv-mock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'csv-viewer-app';
  public tableData;

  constructor() {}

  ngOnInit(): void {
    this.tableData = TableDataImportService.transformFileToHeadersAndDataEntries(ITERATION1);
  }
}
