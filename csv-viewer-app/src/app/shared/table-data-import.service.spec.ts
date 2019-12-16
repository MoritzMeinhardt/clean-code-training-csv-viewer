import { TestBed } from '@angular/core/testing';

import { TableDataImportService } from './table-data-import.service';
import { ITERATION1 } from '../csv-mock';


describe('TableDataImportServiceService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({});
      TableDataImportService.inputFile = null;
  });

  it('should be created', () => {
    const service: TableDataImportService = TestBed.get(TableDataImportService);
    expect(service).toBeTruthy();
  });

  describe('loadTableDataFromFile()', () => {
    it('should check if file exits', () => {
      const result = TableDataImportService.loadTableDataFromFile(ITERATION1);
      expect(result).toBeTruthy();
    });

    it('should check if error is raised if file is non existent', () => {
      expect( () => TableDataImportService.loadTableDataFromFile(null))
        .toThrow( Error('File not found. Program aborted.') );
    });
  });

  describe('splitFileIntoLines()', () => {
    it('should split file into 2 lines', () => {
      const result = TableDataImportService.splitFileIntoLines('line1\nline2', '\n');
      expect(result).toEqual(['line1', 'line2']);
    });
  });

  describe('seperateHeaderFromEntries()', () => {
    it('should seperate header from entries', () => {
      const actualResult = TableDataImportService.seperateHeaderFromEntries(['firstName;lastName', 'gustav;duck']);
      const expectedResult = { header: 'firstName;lastName', entries: ['gustav;duck'] };
      expect(actualResult).toEqual(expectedResult);
    })
  });

  describe('transformLinesToEntries()', () => {
    it('should seperate lines into entries', () => {
      const actualResult = TableDataImportService.transformLinesIntoEntries(['alfred;quack', 'gustav;duck'], ';');
      const expectedResult = [['alfred', 'quack'], ['gustav', 'duck']];
      expect(actualResult).toEqual(expectedResult);
    })
  });

  describe('transformFileToHeadersAndDataEntries()', () => {
    it('should transform file into header and data entries', () => {
      const actualResult = TableDataImportService.transformFileToHeadersAndDataEntries('Name;Age;City\n' +
        'Peter;42;NewYork\n' +
        'Paul;57;London');
      const expectedResult = { headers: [ 'Name', 'Age', 'City'], entries: [ [ 'Peter', '42', 'NewYork' ], [ 'Paul', '57', 'London' ]] };
      expect(actualResult).toEqual(expectedResult);
    });
  })
});
