import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-circle-percentage',
  templateUrl: './circle-percentage.component.html',
  styleUrls: ['./circle-percentage.component.scss'],
})
export class CirclePercentageComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() total: number = 100;
  @Input() color: string = '#00ff99'; // Default to the green accent color

  progressValue: number = 0;
  circumference: number = 2 * Math.PI * 54; // Circumference of the circle
  progressColor: string = '';

  ngOnChanges() {
    // Ensure value and total are set correctly
    this.progressValue = (this.value / this.total) * 100;

    // Set the progress color based on input color
    this.progressColor = this.color;
  }
}
