import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './core/main/main.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NewsComponent } from './pages/news/news.component';
import { SupportComponent } from './pages/support/support.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { AboutComponent } from './pages/about/about.component';
import { CareersComponent } from './pages/careers/careers.component';
import { BasketsComponent } from './core/baskets/baskets.component';
import { FaqComponent } from './pages/faq/faq.component';
import { WalletsComponent } from './pages/wallets/wallets.component';
import { HistoryComponent } from './pages/history/history.component';

const routes : Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: BasketsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'wallets', component: WalletsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'markets', component: MarketsComponent },
      { path: '', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
