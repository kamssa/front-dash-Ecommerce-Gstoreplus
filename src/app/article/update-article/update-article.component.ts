import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../service/article.service";
import {Articles} from "../../models/Articles";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  article: Articles;
  artcleForm: FormGroup;
  articles: Articles[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private articleService: ArticleService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Articles,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateArticleComponent>) { }

  ngOnInit(): void {
    this.articleService.getArticlesById(this.data['article'])
      .subscribe(res => {
        console.log(res.body);
        this.article = res.body;
        this.artcleForm = this.fb.group({
          id: this.article.id,
          version: this.article.version ,
          code: this.article.code ,
          nom: this.article.nom,
          prixUnitaire: this.article.prixUnitaire,
          description: this.article.description,
          produits: this.article.produits,
        });
      });
  }

  onSubmit() {
    let formValue = this.artcleForm.value;
    this.article = this.artcleForm.value;
    this.articleService.modifArticles(this.article).subscribe(data => {
      if (data){
        this.article = data.body;
        this.dialogRef.close(this.article);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['article']);

  }
}
