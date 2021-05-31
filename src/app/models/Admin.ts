import {Adresse} from './Adresse';
import {Personne} from './Personne';

export class Admin extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public titre?: string,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public telephone ?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public actived?: boolean,
              public adresse ?: Adresse,
              public  type?: string) {
              super(id, version, titre, nom, prenom, email, telephone, password, fonction, nomComplet, actived, adresse, type);
  }
}
