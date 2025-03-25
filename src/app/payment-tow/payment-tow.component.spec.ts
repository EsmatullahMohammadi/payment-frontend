import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTowComponent } from './payment-tow.component';

describe('PaymentTowComponent', () => {
  let component: PaymentTowComponent;
  let fixture: ComponentFixture<PaymentTowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
