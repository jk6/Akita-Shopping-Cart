import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/state/product.model';
import { ProductsQuery } from 'src/state/products.query';
import { ProductsService } from 'src/state/products.service';

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  search = new FormControl();

  initialProducts;

  constructor(private productsService: ProductsService,
      private productsQuery: ProductsQuery) { }

  ngOnInit(): void {
    // if (this.productsQuery.getHasCache) {
      this.productsService.get().pipe(
        untilDestroyed(this),
        tap((res => {
          this.initialProducts = res;
          this.productsService.stopLoading();
        })
      )).subscribe();
    // }

    this.loading$ = this.productsQuery.selectLoading();

    this.products$ = this.search.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.productsQuery.selectAll({
        filterBy: entity => entity.title.toLowerCase().includes(value)
      }))
    );
  }

}
