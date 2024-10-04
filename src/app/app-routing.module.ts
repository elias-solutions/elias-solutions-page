import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './body/start/start.component';
import { ImpressumComponent } from './body/impressum/impressum.component';
import { ProjectRequestComponent } from './body/project-request/project-request.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'project-request', component: ProjectRequestComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
