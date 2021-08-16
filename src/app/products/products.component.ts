import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/state/product.model';
import { ProductsQuery } from 'src/state/products.query';
import { ProductsService } from 'src/state/products.service';

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  count: number;
  search = new FormControl();

  constructor(private productsService: ProductsService, private productsQuery: ProductsQuery) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(
        untilDestroyed(this),
        tap(() => (this.count = this.productsQuery.getCount()))
      ).subscribe();

    this.loading$ = this.productsQuery.selectLoading();

    // TODO: get this successfully reacting to value changes
    // and remove filterProducts method
    this.products$ = this.search.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.productsQuery.getProducts(value)
      )
    );
  }

  // use this for filtering products display until valueChanges is working properly
  filterProducts(event: any): void {
    this.products$ = this.productsQuery.getProducts(event.target.value as string);
  }
}
