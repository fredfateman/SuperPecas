import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrosComponent } from './carros/carros.component';
import { PecasComponent } from './pecas/pecas.component';
import { HomeComponent } from './home/home.component';
import { CarroEditComponent } from './carros/carro-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'carros', component: CarrosComponent },
  { path: 'carros/adicionar', component: CarroEditComponent, data: { type: 'adicionar' } },
  { path: 'carros/editar/:id', component: CarroEditComponent, data: { type: 'editar' }  },
  { path: 'pecas', component: PecasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
