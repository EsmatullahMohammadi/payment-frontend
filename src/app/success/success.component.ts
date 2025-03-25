
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  template: `<h2>Payment Successful! 🎉</h2>`,
})
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParams['session_id'];
    console.log('Payment successful. Session ID:', sessionId);
    // You can send sessionId to your backend to verify the payment
  }
}
