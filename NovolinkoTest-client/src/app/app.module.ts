import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { AdminComponent } from './admin/admin.component';
import { ChooseAdminOptionComponent } from './choose-admin-option/choose-admin-option.component';
import { EditListApplicationComponent } from './edit-list-application/edit-list-application.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'tickets', component: TicketListComponent },
  { path: 'createTicket', component: TicketFormComponent },
  { path: 'chooseAdminOption', component: ChooseAdminOptionComponent },
  { path: 'editListApplication', component: EditListApplicationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketListComponent,
    TicketFormComponent,
    AdminComponent,
    ChooseAdminOptionComponent,
    EditListApplicationComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
