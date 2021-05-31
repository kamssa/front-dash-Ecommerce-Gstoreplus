import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Produits} from "../../models/Produits";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ProduitService} from "../../service/produit.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {AddProduitComponent} from "../add-produit/add-produit.component";
import {UpdateProduuitComponent} from "../update-produuit/update-produuit.component";

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'categorie', 'update', 'supprimer'];
  dataSource: MatTableDataSource<Produits>;
  produits: Produits[];
  produit: Produits;
  receptacle: any = [];
  url: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private produitService: ProduitService,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar,
              private  dialogService: DialogConfirmService) {
  }
  ngOnInit(): void {

    this.produitService.getAllProduit().subscribe(data => {
      this.produits = data.body;
      console.log('Voir ce qui se passe', data.body);
      if (data.body){
        this.produits.forEach(value => {
          let opp : Produits = value;
          /*this.imageService.getImageByIdTerrain(opp.id).subscribe(resultat => {
            console.log('voir image', resultat);
            this.terrainService.downloadImage(resultat.body.imageId).subscribe(res => {
              console.log(res.url);
              opp.path = res.url;
            });

          });*/
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
    const dialogRef = this.dialog.open(AddProduitComponent, {
      width: '650px',
      data: this.produit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.produit = result;
      if (this.produit){
        this.receptacle.unshift(this.produit);
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Produits>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    this.dialog.open(UpdateProduuitComponent,{
      data: {
        produit: id
      }
    });
  }
  redirectToDelete(id: any) {
    this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
      .afterClosed().subscribe(res => {
      if (res){
        console.log(id);
        this.produitService.supprimerProduit(id).subscribe(data => {
          console.log(data);
          this._snackBar.open('Succès de l\'opération!', '', {
            duration: 3000,
            verticalPosition: 'top',

          });
        });

      }
    });

  }

}
