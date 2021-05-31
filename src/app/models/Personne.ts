import {Adresse} from './Adresse';

export class Personne {
  constructor(public id?: number,
              public version?: number,
              public titre?: string,
              public nom?: string,
              public prenom?: string,
              public email?: string,
              public telephone?: string,
              public password?: string,
              public fonction?: string,
              public nomComplet?: string,
              public actived?: boolean,
              public adresse?: Adresse,
              public type?: string,
              public roles?: []) {}

}
