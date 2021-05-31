import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Produits} from "../models/Produits";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
// observables sources
  private produitsCreerSource = new Subject<Resultat<Produits>>();
  private produitModifSource = new Subject<Resultat<Produits>>();
  private produitFiltreSource = new Subject<string>();
  private produitSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.produitsCreerSource.asObservable();
  travauxModif$ = this.produitModifSource.asObservable();
  travauxFiltre$ = this.produitFiltreSource.asObservable();
  travauxSupprime$ = this.produitSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllProduit(): Observable<Resultat<Produits[]>> {
    return this.http.get<Resultat<Produits[]>>(`${environment.apiUrl}/api/produit`);
  }

  ajoutProduit(produit: Produits): Observable<Resultat<Produits>> {
    console.log('methode du service qui ajoute  produit', produit);
    return this.http.post<Resultat<Produits>>(`${environment.apiUrl}/api/produit`, produit);
  }
  modifPduit(produit: Produits): Observable<Resultat<Produits>> {
    console.log('methode du service qui modifier produit', produit);
    return this.http.put<Resultat<Produits>>(`${environment.apiUrl}/api/produit`, produit);
  }
  getProduitById(id: number): Observable<Resultat<Produits>> {
    return this.http.get<Resultat<Produits>>(`${environment.apiUrl}/api/produit/${id}`);
  }
  getProduitByNom(libelle: string): Observable<Resultat<Produits>> {
     return this.http.get<Resultat<Produits>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  supprimerProduit(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/produit/${id}`);

  }

  produitsCreer(res: Resultat<Produits>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.produitsCreerSource.next(res);
  }

  produitModif(res: Resultat<Produits>) {
    this.produitModifSource.next(res);
  }

  filtreProduit(text: string) {
    this.produitFiltreSource.next(text);
  }

  produitSupprime(res: Resultat<boolean>) {
    this.produitSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('produitService: ' + message);

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
