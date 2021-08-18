import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
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
  productsForm: FormGroup;
  search = new FormControl();

  constructor(private productsService: ProductsService,
    private productsQuery: ProductsQuery,
    private formsManager: NgFormsManager,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      search: '',
    });

    this.productsService
    .getProducts()
    .pipe(
      untilDestroyed(this),
      tap(() => (this.count = this.productsQuery.getCount()))
      ).subscribe();

    this.formsManager.upsert('products', this.productsForm);

    this.loading$ = this.productsQuery.selectLoading();

    this.products$ = this.formsManager.valueChanges<string>('products', 'search').pipe(
      startWith(''),
      switchMap((value) => this.productsQuery.getProducts(value)
      )
    );

  }

  ngOnDestroy() {
    this.formsManager.unsubscribe('products');
  }
}
