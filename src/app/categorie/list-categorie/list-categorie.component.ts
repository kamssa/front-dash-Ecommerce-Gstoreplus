import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Categories} from "../../models/Categories";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {Admin} from "../../models/Admin";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CategorieService} from "../../service/categorie.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogConfirmService} from "../../helper/dialog-confirm.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AdminService} from "../../service/admin.service";
import {AddCategorieComponent} from "../add-categorie/add-categorie.component";
import {UpdateCategorieComponent} from "../update-categorie/update-categorie.component";
import {ModalCategorieComponent} from "../modal-categorie/modal-categorie.component";

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'update', 'delete'];
  dataSource: MatTableDataSource<Categories>;
  categories: Categories[];
  categorie: Categories;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  admin: Admin;
  roles: [];
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private categorieService: CategorieService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.categorieService.getAllCategorie().subscribe(data => {
      this.categories = data.body;
      this.categories.forEach(value => {
        let opp : Categories = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categories>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
        this.roles = res.body.roles;
        console.log(this.roles);
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
          console.log(this.ROLE_ADMIN);
        });
      });

    }
  }

  public applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '650px',
      data: this.categorie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.categorie = result;
      this.receptacle.unshift(this.categorie);
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categories>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  redirectToUpdate(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(UpdateCategorieComponent,{
      data: {
        categorie: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.categorie = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categories>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }
  redirectToDelete(id: any) {
    if (this.ROLE_NAME === 'ROLE_ADMIN'){

      this.dialogService.openConfirmDialog('Voulez-vous vraiment supprimer l\'élément ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.categorieService.supprimerCategorie(id).subscribe(data => {
            this._snackBar.open('Succès de l\'opération!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'top',

            });
          });

        }
      });

    }else {
      console.log('vous netes pas authorisé');
    }
  }

  openDescription(id: any): void {
    console.log(id);
    const dialogRef = this.dialog.open(ModalCategorieComponent, {
      data: {
        document: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.categorie = result;
      // this.receptacle
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Categories>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
  }

}
