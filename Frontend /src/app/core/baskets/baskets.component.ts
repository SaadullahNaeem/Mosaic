import { single, multi } from '../services/pie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
	single: any[];
	multi: any[];
	view: any[] = [700, 400];
	showLegend = true;

	colorScheme = {
		domain: ['#F7931A', '#019BD5', '#5C6AC1']
	};

	  showLabels = true;
	  explodeSlices = false;
	  doughnut = false;
	  showXAxis = true;
  	showYAxis = true;
  	gradient = false;
  	showlegend = true;
  	showXAxisLabel = true;
  	xAxisLabel = 'Country';
  	showYAxisLabel = true;
  	yAxisLabel = 'Population';

  constructor() {
  	Object.assign(this, {single, multi})
  }

  ngOnInit() {
  }

}
