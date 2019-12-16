import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataImportService {

  public static inputFile: string;

  constructor() { }

  public static transformFileToHeadersAndDataEntries(file): {headers: string[], entries: string[][]} {
    // load data
    TableDataImportService.inputFile = this.loadTableDataFromFile(file);
    // split file into lines
    const textSplittedInLines = this.splitFileIntoLines(TableDataImportService.inputFile, '\n');
    // seperate header from data
    const seperatedHeaderAndEntries = this.seperateHeaderFromEntries(textSplittedInLines);
    // transform lines into entries
    const headers = this.transformLinesIntoEntries([seperatedHeaderAndEntries.header], ';')[0];
    const entries = this.transformLinesIntoEntries(seperatedHeaderAndEntries.entries, ';');
    return {headers, entries};
  }

  public static loadTableDataFromFile(file: string): string {
    if (file) {
      return file;
    } else {
      throw Error('File not found. Program aborted.');
    }
  }

  public static splitFileIntoLines(file: string, splitCharacter: string): string [] {
    return file.split(splitCharacter);
  }

  public static seperateHeaderFromEntries(tableData: string []): { header: string, entries: string [] } {
    const header = tableData[0];
    const entries = tableData.splice(1);
    return { header, entries }
  }

  public static transformLinesIntoEntries(lines: string [], splitCharacter: string): string[][] {
    const result = [];
    lines.forEach( line => result.push(line.split(splitCharacter)));
    return result;
  }

}
