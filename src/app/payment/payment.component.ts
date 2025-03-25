import { Component, AfterViewInit, inject, OnInit } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit,AfterViewInit {
  private stripeService = inject(StripeService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  card: any;
  amount: number = 0;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  showModal: boolean = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] ? +params['amount'] : 0;
    });
  }

  ngAfterViewInit() {
    this.stripeService.elements().subscribe((elements) => {
      this.card = elements.create('card');
      this.card.mount('#card-element');
    });
  }
  pay() {
    if (this.amount <= 0) {
      this.paymentError = 'Invalid payment amount';
      this.showModal = true;
      return;
    }

    this.http.post<{ clientSecret: string }>('http://localhost:3000/payments/create-payment-intent', { amount: this.amount * 100 })
      .subscribe((response) => {
        const { clientSecret } = response;
  
        this.stripeService.confirmCardPayment(clientSecret, {
          payment_method: { card: this.card },
        }).subscribe(({ paymentIntent, error }) => {
          if (error) {
            if(error.message){
              this.paymentError = error.message;
            }
            this.paymentSuccess = false;
          } else if (paymentIntent?.status === 'succeeded') {
            this.paymentSuccess = true;
          }
          this.showModal = true;
        });
      });
  }
  closeModal() {
    this.showModal = false;
    this.paymentError = '';
    if (this.paymentSuccess) {
      this.router.navigate(['/payment']); // Redirect after success
      this.paymentSuccess = false;
    }
    
  }
}
