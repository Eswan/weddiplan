import { Component } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { GuestsService } from '../guests/guests.service';
import { BudgetService } from '../budget/budget.service';
import * as moment from 'moment';
import configuration from '../configuration';
import { Chart } from 'angular-highcharts';
import pieChartOptions from '../shared/pieChartOptions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  chartBudgetBase: Chart;
  chartBudgetByCategory: Chart;
  chartGuests: Chart;

  totalGuests$: Observable<{
    children: number,
    adults: number
  }>

  totalBudget$: Observable<number>;

  marriageCountdown$: Observable<{ days: number, hours: number, minutes: number, seconds: number }>;

  constructor(private guestService: GuestsService, private budgetService: BudgetService) {
    this.totalGuests$ = this.guestService.getCounts();
    this.totalBudget$ = this.budgetService.getCount();
    this.marriageCountdown$ = interval(1000).pipe(
      map(() => {
        const now = moment();
        const marriageDate = moment(configuration.marriageDate);
        const diff = marriageDate.diff(now);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      })
    );

    this.chartBudgetBase = new Chart({
      ...pieChartOptions,
      accessibility: {
        point: {
          valueSuffix: '€'
        }
      },
      series: [{
        type: 'pie',
        name: 'Catégories',
        data: [
          {
            name: "Payé",
            y: 15400
          },
          {
            name: "Reste à payer",
            y: 3500
          }
        ]
      }]
    });

    this.chartBudgetByCategory = new Chart({
      ...pieChartOptions,
      accessibility: {
        point: {
          valueSuffix: '€'
        }
      },
      series: [{
        type: 'pie',
        name: 'Dépense',
        data: this.parseBudgetByCategories([
          {
            name: "Robe",
            y: 3000
          },
          {
            name: "Gateau",
            y: 250
          },
          {
            name: "Location voiture",
            y: 500
          },
          {
            name: "Photographe",
            y: 1500
          },
          {
            name: "Traiteur",
            y: 5000
          },
          {
            name: "Lieu de réception",
            y: 4000
          },
          {
            name: "Faire-part",
            y: 300
          },
          {
            name: "Smoking marié",
            y: 200
          },
          {
            name: "Brunch",
            y: 450
          },
          {
            name: "Voyage de noce",
            y: 7000
          }
        ])
      }]
    });

    this.chartGuests = new Chart({
      ...pieChartOptions,
      series: [{
        type: 'pie',
        name: 'Invités',
        data: [{
          name: 'Présence confirmée',
          y: 27
        }, {
          name: 'Intercains',
          y: 4
        }, {
          name: 'Ne seront pas présent',
          y: 6
        }]
      }]
    });
  }

  parseBudgetByCategories(items: { name: string, y: number }[]): { name: string, y: number }[] {
    const itemSorted = items.sort((a, b) => b.y - a.y);
    if (itemSorted.length <= 5) {
      return itemSorted; // Si le tableau a 5 éléments ou moins, on le retourne tel quel
    }

    // On prend les 5 premiers éléments
    const firstSix = itemSorted.slice(0, 5);

    // On calcule la somme des éléments restants
    const remainingSum = itemSorted.slice(5).reduce((acc, curr) => acc + curr.y, 0);

    // On ajoute la somme comme 7ème élément
    firstSix.push({
      name: 'Autres',
      y: remainingSum
    });

    return firstSix;
  }
}
