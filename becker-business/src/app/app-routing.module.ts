import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {ClientListComponent} from './components/client-list/client-list.component';
import {MentoringComponent} from './components/planks/mentoring/mentoring.component';
import {InternationalComponent} from './components/planks/international/international.component';
import {MetricsComponent} from './components/planks/metrics/metrics.component';
import {StrategyComponent} from './components/planks/strategy/strategy.component';
import {RailwayComponent} from './components/planks/railway/railway.component';
import {PlankHomeComponent} from './components/planks/plank-home/plank-home.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'clients',
    component: ClientListComponent
  },
  {
    path: 'expertise',
    component: PlankHomeComponent,
    children: [
      {
        path: 'mentoring',
        component: MentoringComponent
      },
      {
        path: 'international',
        component: InternationalComponent
      },
      {
        path: 'metrics',
        component: MetricsComponent
      },
      {
        path: 'strategy',
        component: StrategyComponent
      },
      {
        path: 'railway',
        component: RailwayComponent
      },
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
