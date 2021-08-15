import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsQuery } from './products.query';
import { ProductsState, ProductsStore } from './products.store';

@Injectable({ providedIn: 'root' })
export class ProductsService extends NgEntityService<ProductsState> {
  url: string;

  constructor(
    private productsStore: ProductsStore,
    private productsQuery: ProductsQuery
  ) {
    super(productsStore);
  }

  getProducts(): Observable<Product[]> {
    this.url = `${this.baseUrl}/products`;

    return this.getHttp().get<Product[]>(this.url).pipe(
      tap((response: Product[]) => {
        this.productsStore.set(response);
        this.productsStore.setLoading(false);
        }
      ));
  }

  addProduct(product: Product) {
    this.productsStore.add(product);
  }

  updateProduct(id, product: Partial<Product>) {
    this.productsStore.update(id, product);
  }

  removeProduct(id: ID) {
    this.productsStore.remove(id);
  }
}
