import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Articles} from "../models/Articles";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment.prod";
import {Image} from "../models/Image";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
// observables sources
  private articlesCreerSource = new Subject<Resultat<Articles>>();
  private articlesModifSource = new Subject<Resultat<Articles>>();
  private articlesFiltreSource = new Subject<string>();
  private articlesSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.articlesCreerSource.asObservable();
  travauxModif$ = this.articlesModifSource.asObservable();
  travauxFiltre$ = this.articlesFiltreSource.asObservable();
  travauxSupprime$ = this.articlesSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllArticle(): Observable<Resultat<Articles[]>> {
    return this.http.get<Resultat<Articles[]>>(`${environment.apiUrl}/api/article`);
  }

  ajoutArticles(article: Articles): Observable<Resultat<Articles>> {
    console.log('methode du service qui ajoute  article', article);
    return this.http.post<Resultat<Articles>>(`${environment.apiUrl}/api/article`, article);
  }
  modifArticles(article: Articles): Observable<Resultat<Articles>> {
    console.log('methode du service qui modifier article', article);
    return this.http.put<Resultat<Articles>>(`${environment.apiUrl}/api/article`, article);
  }
  getArticlesById(id: number): Observable<Resultat<Articles>> {
    return this.http.get<Resultat<Articles>>(`${environment.apiUrl}/api/article/${id}`);
  }
  getArticlesByNom(libelle: string): Observable<Resultat<Articles>> {
    return this.http.get<Resultat<Articles>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  supprimerArticles(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/article/${id}`);

  }
  getPhotoByIdTravaux(id: number): Observable<Resultat<Image[]>> {
    return this.http.get<Resultat<Image[]>>(`${environment.apiUrl}/api/photo/${id}`);
  }

  public upload(formData, id) {
    console.log('dans le service', formData);
    return this.http.post<any>(`${environment.apiUrl}/api/travauxPhoto/?id=${id}`, formData,   {
      reportProgress: true,
      observe: 'events'
    });
  }


  articlesCreer(res: Resultat<Articles>) {
    console.log('categorie a ete  creer correctement essaie source');
    this.articlesCreerSource.next(res);
  }

  articlesModif(res: Resultat<Articles>) {
    this.articlesModifSource.next(res);
  }

  filtreArticles(text: string) {
    this.articlesFiltreSource.next(text);
  }

  articlesSupprime(res: Resultat<boolean>) {
    this.articlesSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('articleService: ' + message);

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
