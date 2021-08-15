import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/state/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() add = new EventEmitter<Product>();
  @Output() subtract = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}
}
