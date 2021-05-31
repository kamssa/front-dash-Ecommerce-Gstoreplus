import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ConnexionComponent} from "./connexion/connexion.component";
import {ListCategorieComponent} from "./categorie/list-categorie/list-categorie.component";
import {ListeProduitComponent} from "./produit/liste-produit/liste-produit.component";
import {ListeArticleComponent} from "./article/liste-article/liste-article.component";
import {AuthGuardService} from "./helper/auth-guard.service";

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    },
      {path: 'cat', component: ListCategorieComponent},
      {path: 'prod', component: ListeProduitComponent},
      {path: 'article', component: ListeArticleComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
