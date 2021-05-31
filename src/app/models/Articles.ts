import {Produits} from "./Produits";

export class Articles {
  constructor( public id ?: number,
               public version?: number,
               public code?: string,
               public nom?: string,
               public description ?: string,
               public prixUnitaire?: number,
               public imagePath?: string,
               public produits?: Produits
               ) {
  }
}
