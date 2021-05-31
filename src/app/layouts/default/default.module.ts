import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from '../../modules/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {PostComponent} from '../../modules/post/post.component';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AddCategorieComponent} from "../../categorie/add-categorie/add-categorie.component";
import {ListCategorieComponent} from "../../categorie/list-categorie/list-categorie.component";
import {UpdateCategorieComponent} from "../../categorie/update-categorie/update-categorie.component";
import {ModalCategorieComponent} from "../../categorie/modal-categorie/modal-categorie.component";
import {ProduitComponent} from "../../produit/produit/produit.component";
import {ListeProduitComponent} from "../../produit/liste-produit/liste-produit.component";
import {UpdateProduuitComponent} from "../../produit/update-produuit/update-produuit.component";
import {ModalProduitComponent} from "../../produit/modal-produit/modal-produit.component";
import {AddArticleComponent} from "../../article/add-article/add-article.component";
import {UpdateArticleComponent} from "../../article/update-article/update-article.component";
import {ModalArticleComponent} from "../../article/modal-article/modal-article.component";
import {ErrorDialogComponent} from "../../service/shared/dialogs/error-dialog/error-dialog.component";
import {SuccessDialogComponent} from "../../service/shared/dialogs/success-dialog/success-dialog.component";
import {MatConfirmDialogComponent} from "../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    UpdateCategorieComponent,
    ModalCategorieComponent,
    ProduitComponent,
    ListeProduitComponent,
    UpdateProduuitComponent,
    ModalProduitComponent,
    AddArticleComponent,
    UpdateArticleComponent,
    ModalArticleComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class DefaultModule { }
