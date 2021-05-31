import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Personne} from "../models/Personne";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  submitted = false;
  loading = false;
  pwdPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$';
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  //spinner = faSpinner;
  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



// convenience getter for easy access to form fields
  get f() { return this.connexionForm.controls; }
  initForm(): void {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    });

  }

  onSubmit() {
    if (navigator.onLine){
      this.submitted = true;
      // stop here if form is invalid
      if (this.connexionForm.invalid) {
        return;
      }
      this.loading = true;
      const email = this.connexionForm.get('email').value;
      const password = this.connexionForm.get('password').value;
      this.loading = true;
      const  admin = new Personne(
        null,
        null,
        null,
        null,
        null,
        email,
        null,
        password,
        null,
        null,
        null,
        null,
        'AD'

      );
      this.authService.login(admin).subscribe(data => {
          if (data.body){
            this.snackBar.open('Succès de la connexion!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }else {
            this.isuAth = false;
          }
          this.router.navigate(['dashboard']);
        },
        error => {
          this.error = "E-mail ou mot de passe oublié! Réessayez svp";
          this.loading = false;
        });
    }else {
      this.error = 'Vérifiez votre connexion internet s\'il vous plaît';
    }

  }
}
