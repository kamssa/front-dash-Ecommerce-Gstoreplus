import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Produits} from "../../models/Produits";
import {Categories} from "../../models/Categories";
import {ProduitService} from "../../service/produit.service";
import {CategorieService} from "../../service/categorie.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  produitForm: FormGroup;
  selectedFiles: FileList;
  error = '';
  message = '';
  categories: Categories[];
  categorie: Categories;
  produit: Produits;
  selected: string;
  constructor(private  fb: FormBuilder, private produitService: ProduitService,
              private categorieService: CategorieService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<AddProduitComponent>,
              private  router: Router, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void{
    this.categorieService.getAllCategorie().subscribe(data => {
      console.log(data);
      this.categories = data.body;
    });

    this.initForm();
  }
  ngAfterViewInit(): void {
    if (this.categories){
      this.produitForm = this.fb.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        categories: this.fb.group({
          id: this.categorie.id,
          version: this.categorie.version,
          nom: '',
          description: this.categorie.description
        }),
      });
    }

  }

  initForm(): void{

    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      categories: this.fb.group({
        id: '',
        version: '',
        nom: '',
        description: ''
      }),
    });


  }

  onSubmit(): void {
    let formValue = this.produitForm.value;
    console.log(formValue);
    let  produits: Produits = {
      nom: formValue.nom,
      description: formValue.description,
      categories: {
        id: this.categorie.id,
        version: this.categorie.version,
        nom: this.categorie.nom,
        description: this.categorie.description
      }
    };
    this.produitService.ajoutProduit(produits).subscribe(data => {
        this.produit = data.body;

        if (data.status === 0){
          this.dialogRef.close(this.produit);
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
    this.router.navigate(['prod']);

  }
  greetCat(event){
    console.log(event.value);
    this.categorieService.getCategorieById(event.value).subscribe(data => {
      console.log('Valeur de retour de categorie', data.body);

      this.categorie = data.body;

    });
  }

}
