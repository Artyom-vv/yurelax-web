import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {AdminCommerceService} from './admin-commerce.service';
import {PlatformSessionService} from './platform-session.service';

describe('AdminCommerceService', () => {
  let service: AdminCommerceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [
      AdminCommerceService,
      {provide: PlatformSessionService, useValue: {status: () => of({csrfToken: 'csrf-token'})}},
    ]});
    service = TestBed.inject(AdminCommerceService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('reads only allow-listed product and offer history', () => {
    service.references().subscribe();
    const references = http.expectOne('/api/admin/commerce/references');
    expect(references.request.method).toBe('GET');
    references.flush({currencies: [], games: [], statistics: [], providers: [], progressions: []});

    service.products('hunt.class.archer').subscribe();
    const products = http.expectOne('/api/admin/commerce/products?productCode=hunt.class.archer');
    expect(products.request.method).toBe('GET');
    products.flush({items: [], page: {nextCursor: null, hasMore: false}});

    service.offers('hunt.class.archer.buy').subscribe();
    const offers = http.expectOne('/api/admin/commerce/offers?offerCode=hunt.class.archer.buy');
    expect(offers.request.method).toBe('GET');
    offers.flush({items: [], page: {nextCursor: null, hasMore: false}});
  });

  it('publishes and retires only through CSRF-protected allow-listed routes', () => {
    service.publishProduct({
      code: 'hunt.class.archer', name: 'Лучник', description: 'Доступ к классу', version: 1,
      kind: 'PERMISSION', grants: [{providerCode: 'hunt', grantKey: 'class.archer', gameCode: 'hunt',
        deliveryMode: 'ENTITLEMENT', ownershipPolicy: 'DENY_DUPLICATE', lifetime: {kind: 'PERMANENT'},
        activationPolicy: null, payload: {classCode: 'archer'}}],
    }).subscribe();
    const product = http.expectOne('/api/admin/commerce/products');
    expect(product.request.method).toBe('POST');
    expect(product.request.headers.get('x-csrf-token')).toBe('csrf-token');
    expect(product.request.headers.has('idempotency-key')).toBe(true);
    product.flush({});

    service.publishOffer({code: 'hunt.class.archer.buy', version: 1, productCode: 'hunt.class.archer',
      productVersion: 1, gameCode: 'hunt', effectiveFrom: '2026-08-24T00:00:00.000Z', effectiveUntil: null,
      requirement: {kind: 'PROGRESSION_LEVEL', progressionCode: 'account.level', minimumLevel: 3},
      prices: [{currencyCode: 'gems', amount: '500'}]}).subscribe();
    const offer = http.expectOne('/api/admin/commerce/offers');
    expect(offer.request.method).toBe('POST');
    offer.flush({});

    service.retireOffer('offer/id', 'rotation ended').subscribe();
    const retirement = http.expectOne('/api/admin/commerce/offers/offer%2Fid/retirement');
    expect(retirement.request.body).toEqual({reason: 'rotation ended'});
    retirement.flush({});
  });
});
