import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {MyErrorStateMatcher} from "../../helper/MyErrorStateMatcher";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Categories} from "../../models/Categories";
import {CategorieService} from "../../service/categorie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  catForm: FormGroup;
  categorie: Categories;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;
  matcher = new MyErrorStateMatcher();
  nom = new FormControl('',
    [Validators.required] );
  description = new FormControl('');
  error = '';

  constructor(public fb: FormBuilder,
              private  categorieService: CategorieService,
              private location: Location,
              public dialogRef: MatDialogRef<AddCategorieComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }

  initForm() {
    this.catForm = this.fb.group({
      nom: new FormControl('',[Validators.required] ),
      description: new FormControl(''),
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.catForm.controls;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.catForm.controls[controlName].hasError(errorName);
  }
  public createCategorie = (createCategorieFormValue) => {
    console.log('voir info', this.catForm.value);
    if (this.catForm.valid) {
      this.onSubmit(createCategorieFormValue);
    }
  }

  onSubmit(createCategorieFormValue): void{
    console.log('voir les valeurs assignés', createCategorieFormValue.value);
    let  categories: Categories = {
      nom: createCategorieFormValue.nom,
      description: createCategorieFormValue.description,
    };
    this.categorieService.ajoutCategorie(categories).subscribe(data => {
        this.categorie = data.body;

        if (data.status === 0){
          this.dialogRef.close(this.categorie);
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
    this.router.navigate(['cat']);
  }
}
