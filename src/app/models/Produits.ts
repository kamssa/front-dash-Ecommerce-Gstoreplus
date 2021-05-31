import {Categories} from "./Categories";

export class Produits {
  constructor( public id ?: number,
               public version?: number,
               public nom?: string,
               public description ?: string,
               public categories?: Categories) {
  }
}
