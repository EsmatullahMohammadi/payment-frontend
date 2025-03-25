import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
