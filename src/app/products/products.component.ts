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
    // if (this.productsQuery.getHasCache) {
    this.productsService
      .getProducts()
      .pipe(
        untilDestroyed(this),
        tap(() => (this.count = this.productsQuery.getCount()))
      )
      .subscribe();
    // }
    // else {
    //   console.log('got that cache');
    // }

    this.loading$ = this.productsQuery.selectLoading();

    this.products$ = this.search.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.productsQuery.selectAll({
          filterBy: (entity) => entity.title.toLowerCase().includes(value),
        })
      )
    );
  }
}
