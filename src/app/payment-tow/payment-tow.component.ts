

import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-tow',
  imports: [CommonModule],
  templateUrl: './payment-tow.component.html',
  styleUrl: './payment-tow.component.css',
  standalone: true,
})
export class PaymentTowComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  amount: number = 0;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  showModal: boolean = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] ? + params['amount'] : 0;
      
      if (params['session_id']) {
        this.paymentSuccess = true;
        this.showModal = true;
      } else if (params['cancelled']) {
        this.paymentError = 'Payment was cancelled.';
        this.showModal = true;
      }
    });
    this.pay();
  }

  pay() {
    if (this.amount <= 0) {
      this.paymentError = 'Invalid payment amount';
      this.showModal = true;
      return;
    }

    this.http.post<{ sessionUrl: string }>('http://localhost:3000/payment/create-checkout-session', { amount: this.amount * 100 })
      .subscribe((response) => {
        if (response.sessionUrl) {
          window.location.href = response.sessionUrl; // Redirect to Stripe Checkout
        } else {
          this.paymentError = 'Failed to create session';
          this.showModal = true;
        }
      });
  }

  closeModal() {
    this.showModal = false;
    this.paymentError = '';

    if (this.paymentSuccess) {
      this.router.navigate(['/home']); // Redirect to home or another page
    }
  }
}
