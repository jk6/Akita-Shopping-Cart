import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService, ID } from '@datorama/akita';
import { noop, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsQuery } from './products.query';
import { ProductsState, ProductsStore } from './products.store';

let url = '/';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private productsStore: ProductsStore,
              private productsQuery: ProductsQuery,
              private http: HttpClient) {
  }


  get(): Observable<Array<Product>> {
    // return this.http.get(url).pipe(
    //   tap((response: any) => this.productsStore.set([
    //     {id:  1,
    //     title: 'coffee cup',
    //     description: 'a coffee cup',
    //     price: 14.99}])
    //   ));

    return of([
      {id: '1',
      title: 'coffee cup',
      description: 'a coffee cup',
      price: 14.99}
    ]);

    // return this.productsQuery.getHasCache ? request : of([]);
  }

  add(product: Product) {
    this.productsStore.add(product);
  }

  update(id, product: Partial<Product>) {
    this.productsStore.update(id, product);
  }

  remove(id: ID) {
    this.productsStore.remove(id);
  }

  stopLoading(): void {
    this.productsStore.setLoading(false);
  }

}
