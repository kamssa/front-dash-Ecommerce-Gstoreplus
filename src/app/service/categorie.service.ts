import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Categories} from "../models/Categories";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
// observables sources
  documents: Document[];
  private categorieCreerSource = new Subject<Resultat<Document>>();
  private categorieModifSource = new Subject<Resultat<Document>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.categorieCreerSource.asObservable();
  travauxModif$ = this.categorieModifSource.asObservable();
  travauxFiltre$ = this.categorieFiltreSource.asObservable();
  travauxSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllCategorie(): Observable<Resultat<Categories[]>> {
    return this.http.get<Resultat<Categories[]>>(`${environment.apiUrl}/api/categories`);
  }

  ajoutCategorie(categorie: Categories): Observable<Resultat<Categories>> {
    console.log('methode du service qui ajoute  categorie', categorie);
    return this.http.post<Resultat<Categories>>(`${environment.apiUrl}/api/categories`, categorie);
  }
  modifCategorie(categorie: Categories): Observable<Resultat<Categories>> {
    console.log('methode du service qui modifier categorie', categorie);
    return this.http.put<Resultat<Categories>>(`${environment.apiUrl}/api/categories`, categorie);
  }
  getCategorieById(id: number): Observable<Resultat<Categories>> {
    return this.http.get<Resultat<Categories>>(`${environment.apiUrl}/api/categories/${id}`);
  }
  getCategorieByNom(nom: string): Observable<Resultat<Categories>> {
    return this.http.get<Resultat<Categories>>(`${environment.apiUrl}/api/getCategoriesByNom/${nom}`);
  }
  supprimerCategorie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/categories/${id}`);

  }

  categorieCreer(res: Resultat<Document>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Document>) {
    this.categorieModifSource.next(res);
  }

  filtrecategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

  }

  ///////////////////////////////////////////
  // recuper les erreurs


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
