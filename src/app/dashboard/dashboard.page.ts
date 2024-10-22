import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestsService } from '../guests/guests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  totalGuests$: Observable<{
    children: number,
    adults: number
  }>

  constructor(private guestService: GuestsService) {
    this.totalGuests$ = this.guestService.getCounts();
  }
}
