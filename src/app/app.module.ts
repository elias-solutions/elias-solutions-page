import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BodyComponent } from './body/body.component';
import { StartSideComponent } from './body/start-side/start-side.component';
import { ImpressumComponent } from './body/impressum/impressum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRequestComponent } from './body/project-request/project-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    BodyComponent,
    StartSideComponent,
    ImpressumComponent,
    ProjectRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }