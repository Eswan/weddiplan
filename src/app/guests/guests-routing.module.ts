import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestsPage } from './guests.page';
import { GuestsStatsComponent } from './guests-stats/guests-stats.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: GuestsPage
    }, {
      path: 'stats',
      component: GuestsStatsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestsPageRoutingModule {}
