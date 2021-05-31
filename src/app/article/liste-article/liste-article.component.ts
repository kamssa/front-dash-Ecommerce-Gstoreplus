import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Produits} from "../../models/Produits";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ProduitService} from "../../service/produit.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {AddProduitComponent} from "../../produit/add-produit/add-produit.component";
import {UpdateProduuitComponent} from "../../produit/update-produuit/update-produuit.component";
import {Articles} from "../../models/Articles";
import {ArticleService} from "../../service/article.service";
import {AddArticleComponent} from "../add-article/add-article.component";
import {UpdateArticleComponent} from "../update-article/update-article.component";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ImageComponent} from "../image/image.component";

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.scss']
})
export class ListeArticleComponent implements OnInit {
  displayedColumns: string[] = ['code', 'libelle', 'prix_unitaire', 'images', 'description', 'produit', 'addImages', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Articles>;
  articles: Articles[];
  article: Articles;
  receptacle: any = [];
  url: any;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private articleService: ArticleService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.articleService.getAllArticle().subscribe(data => {
      this.articles = data.body;
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.articles.forEach(value => {
          let opp : Articles = value;
          this.receptacle.push(opp);
        });
      }
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Produits>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddArticleComponent, {
      width: '650px',
      data: this.article
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.article = result;
      if (this.article){
        this.receptacle.unshift(this.article);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Articles>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateArticleComponent,{
      data: {
        article: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.articleService.supprimerArticles(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }


  AddImage(id: any) {
    console.log(id);
    this.dialog.open(ImageComponent,{
      data: {
        article: id
      }
    });
  }

}
