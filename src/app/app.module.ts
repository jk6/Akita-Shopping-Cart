import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { NgFormsManagerConfig, NG_FORMS_MANAGER_CONFIG } from '@ngneat/forms-manager';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: {
        baseUrl: 'https://fakestoreapi.com',
      },
    },
    {
      provide: NG_FORMS_MANAGER_CONFIG,
      useValue: new NgFormsManagerConfig({
        debounceTime: 0, // default 300. Was slowing down dynamic filter result experience
        storage: {
          key: 'NgFormManager',
        },
      }),
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
