import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductsState, ProductsStore } from './products.store';

@Injectable({ providedIn: 'root' })
export class ProductsQuery extends QueryEntity<ProductsState> {
  constructor(protected store: ProductsStore) {
    super(store);
  }

  getProducts(value: string) {
    console.log(value);
    return this.selectAll({
      filterBy: (entity) => entity.title.toLowerCase().includes(value),
    });
  }
}
