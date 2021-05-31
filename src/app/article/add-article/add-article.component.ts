import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categories} from "../../models/Categories";
import {Produits} from "../../models/Produits";
import {ProduitService} from "../../service/produit.service";
import {CategorieService} from "../../service/categorie.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Articles} from "../../models/Articles";
import {ArticleService} from "../../service/article.service";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  articleForm: FormGroup;
  selectedFiles: FileList;
  error = '';
  message = '';
  produits: Produits[];
  produit: Produits;
  article: Articles;
  selected: string;
  constructor(private  fb: FormBuilder, private produitService: ProduitService,
              private articleService: ArticleService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddArticleComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.produitService.getAllProduit().subscribe(data => {
      console.log(data);
      this.produits = data.body;
    });

    this.initForm();
  }
  ngAfterViewInit(): void {
    if (this.produits){
      this.articleForm = this.fb.group({
        code: ['', Validators.required],
        nom: ['', Validators.required],
        prixUnitaire: ['', Validators.required],
        description: ['', Validators.required],
        produits: this.fb.group({
          id: this.produit.id,
          version: this.produit.version,
          nom: '',
          description: this.produit.description
        }),
      });
    }

  }

  initForm(): void{

    this.articleForm = this.fb.group({
      code: ['', Validators.required],
      nom: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      description: ['', Validators.required],
      produits: this.fb.group({
        id: '',
        version: '',
        nom: '',
        description: ''
      }),
    });


  }

  onSubmit(): void {
    let formValue = this.articleForm.value;
    console.log(formValue);
    let  articles: Articles = {
      code: formValue.code,
      nom: formValue.nom,
      prixUnitaire: formValue.prixUnitaire,
      description: formValue.description,
      produits: {
        id: this.produit.id,
        version: this.produit.version,
        nom: formValue.produits.nom,
        description: this.produit.description
      }
    };
    this.articleService.ajoutArticles(articles).subscribe(data => {
        this.produit = data.body;

        if (data.status === 0){
          this.dialogRef.close(this.article);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }else {
          this.error = data.messages[0];
          console.log( data.messages);
        }

      }, error => {
        this.error = error;
        console.log(this.error);

      }
    );
    this.router.navigate(['article']);

  }
  greetProd(event){
    console.log(event.value);
    this.produitService.getProduitById(event.value).subscribe(data => {
      console.log('Valeur de retour de categorie', data.body);
      this.produit = data.body;

    });
  }


}
