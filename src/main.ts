
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      provideNgxStripe('pk_test_51R5nrEGLj0fy4RNhuZ6jwREJW6nWgKwBM9PWgT0fQiPNwpOM9USeGlhtgQ6ZhkG5h0rM5i9XqrZwpnuAcVmSvoWe00fHnR9pem') // Replace with your Stripe publishable key
    ]
  }).catch(err => console.error(err));
  