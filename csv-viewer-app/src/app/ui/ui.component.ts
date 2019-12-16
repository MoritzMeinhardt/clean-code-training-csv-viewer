import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  @Input()
  headers: string[];
  @Input()
  entries: string[][];

  constructor() { }

  ngOnInit() {
    console.log(this.headers);
  }

}
