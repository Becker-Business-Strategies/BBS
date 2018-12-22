import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {



  constructor() { }

  ngOnInit() {

    const odometer = document.getElementById('odometer');
    const odometer2 = document.getElementById('odometer2');
    const odometer3 = document.getElementById('odometer3');


    setTimeout(function(){
      odometer.innerHTML = '700';
      odometer2.innerHTML = '20';
      odometer3.innerHTML = '30';

    }, 1000);
  }
}
