import {Component, Inject, OnInit} from '@angular/core';
import {Produits} from "../../models/Produits";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ProduitService} from "../../service/produit.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-produuit',
  templateUrl: './update-produuit.component.html',
  styleUrls: ['./update-produuit.component.scss']
})
export class UpdateProduuitComponent implements OnInit {
  produit: Produits;
  produitForm: FormGroup;
  produits: Produits[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private produitService: ProduitService,
               private  fb: FormBuilder, private  router: Router,
               @Inject(MAT_DIALOG_DATA) public data: Produits,
               private snackBar: MatSnackBar,
               public dialogRef: MatDialogRef<UpdateProduuitComponent>) { }

  ngOnInit(): void {
    this.produitService.getProduitById(this.data['produit'])
      .subscribe(res => {
        console.log(res.body);
        this.produit = res.body;
        this.produitForm = this.fb.group({
          id: this.produit.id,
          version: this.produit.version ,
          nom: this.produit.nom,
          description: this.produit.description,
          categories: this.produit.categories,
        });
      });
  }

  onSubmit() {
    let formValue = this.produitForm.value;
    this.produit = this.produitForm.value;
    this.produitService.modifPduit(this.produit).subscribe(data => {
      if (data){
        this.produit = data.body;
        this.dialogRef.close(this.produit);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    this.router.navigate(['prod']);

  }
}
