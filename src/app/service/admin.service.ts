import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Employe} from "../models/Employe";
import {Admin} from "../models/Admin";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private employeCreerSource = new Subject<Resultat<Employe>>();
  private employeModifSource = new Subject<Resultat<Employe>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  employeCreer$ = this.employeCreerSource.asObservable();
  employeModif$ = this.employeModifSource.asObservable();
  employeFiltre$ = this.employeFiltreSource.asObservable();
  employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getAdminById(id: Admin): Observable<Resultat<Admin>> {
    return this.http.get<Resultat<Admin>>(`${environment.apiUrl}/api/admin/${id}`);
  }

  employeCreer(res: Resultat<Employe>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }

  employeModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('EmployeService: ' + message);

  }
  ///////////////////////////////////////////
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
