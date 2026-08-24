import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AdminCommerceService} from './admin-commerce.service';

describe('AdminCommerceService', () => {
  let service: AdminCommerceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [AdminCommerceService]});
    service = TestBed.inject(AdminCommerceService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('reads only allow-listed product and offer history', () => {
    service.products('hunt.class.archer').subscribe();
    const products = http.expectOne('/api/admin/commerce/products?productCode=hunt.class.archer');
    expect(products.request.method).toBe('GET');
    products.flush({items: [], page: {nextCursor: null, hasMore: false}});

    service.offers('hunt.class.archer.buy').subscribe();
    const offers = http.expectOne('/api/admin/commerce/offers?offerCode=hunt.class.archer.buy');
    expect(offers.request.method).toBe('GET');
    offers.flush({items: [], page: {nextCursor: null, hasMore: false}});
  });
});
