import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService, ID } from '@datorama/akita';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { noop, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsQuery } from './products.query';
import { ProductsState, ProductsStore } from './products.store';

let url = '/';

@Injectable({ providedIn: 'root' })
export class ProductsService extends NgEntityService<ProductsState> {

  constructor(private productsStore: ProductsStore,
              private productsQuery: ProductsQuery) {
                super(productsStore);
  }


  getProducts(): Observable<Array<Product>> {
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

  addProduct (product: Product) {
    this.productsStore.add(product);
  }

  updateProduct (id, product: Partial<Product>) {
    this.productsStore.update(id, product);
  }

  removeProduct(id: ID) {
    this.productsStore.remove(id);
  }

  stopLoading(): void {
    this.productsStore.setLoading(false);
  }

}
