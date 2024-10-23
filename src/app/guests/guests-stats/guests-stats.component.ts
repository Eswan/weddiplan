import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GuestsService } from '../guests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATUS } from '../guest';
import { Chart } from 'angular-highcharts';
import pieChartOptions from '../../shared/pieChartOptions';

@Component({
  selector: 'app-guests-stats',
  templateUrl: './guests-stats.component.html',
  styleUrls: ['./guests-stats.component.scss']
})
export class GuestsStatsComponent {
  chartGuests: Chart;
  constructor() {
    this.chartGuests = new Chart({
      ...pieChartOptions,
      series: [{
        type: 'pie',
        name: 'Invités',
        data: [{
          name: 'Présence confirmée',
          y: 27
        }, {
          name: 'En attente',
          y: 4
        }, {
          name: 'Décliné',
          y: 6
        }]
      }]
    });
  }

  close() {

  }
}
