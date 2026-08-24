import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {
  AdminCommerceOfferRevision,
  AdminCommerceProductRevision,
  AdminCommerceService,
} from '../../../shared/services/admin-commerce.service';

@Component({
    selector: 'yrx-admin-commerce',
    templateUrl: './admin-commerce.component.html',
    styleUrls: ['./admin-commerce.component.scss'],
    standalone: false
})
export class AdminCommerceComponent implements OnInit {
  public products: AdminCommerceProductRevision[] = [];
  public offers: AdminCommerceOfferRevision[] = [];
  public productCode = '';
  public offerCode = '';
  public loading = true;

  constructor(
    private readonly commerce: AdminCommerceService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void { this.load(); }

  public load(): void {
    this.loading = true;
    forkJoin({
      products: this.commerce.products(this.productCode.trim() || undefined),
      offers: this.commerce.offers(this.offerCode.trim() || undefined),
    }).pipe(
      tap(result => {
        this.products = result.products.items;
        this.offers = result.offers.items;
      }),
      catchError(error => {
        this.snackBar.open(error?.error?.message ?? 'Не удалось загрузить commerce-каталог', 'Закрыть');
        return of(null);
      }),
      finalize(() => this.loading = false),
    ).subscribe();
  }

  public requirement(value: unknown): string {
    return value === null ? 'без требований' : JSON.stringify(value);
  }
}
