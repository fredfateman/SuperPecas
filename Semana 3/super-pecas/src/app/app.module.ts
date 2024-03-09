import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CarrosComponent } from './carros/carros.component';
import { PecasComponent } from './pecas/pecas.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { CarrosService } from '../service/carros.service';
import { CarroEditComponent } from './carros/carro-edit.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { RemoverCarroDialog } from './carros/remover-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { PecasService } from '../service/pecas.service';
import { PecasEditComponent } from './pecas/pecas-edit.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CarrosComponent,
    CarroEditComponent,
    RemoverCarroDialog,
    PecasComponent,
    PecasEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    CanvasJSAngularChartsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    CarrosService, 
    PecasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
