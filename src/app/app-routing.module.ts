import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './body/start/start.component';
import { ImpressumComponent } from './body/impressum/impressum.component';
import { ContactComponent } from './body/contact/contact.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
