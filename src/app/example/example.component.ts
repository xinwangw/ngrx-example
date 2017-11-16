import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  currentTime = Date.now();
  constructor() { }

  ngOnInit() {
  }

  stop(ele) {
    console.log(ele);
    ele.stop();
  }

}
