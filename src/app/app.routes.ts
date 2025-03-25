import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadComponent: ()=> import('./home/home.component').then((m)=>m.HomeComponent)
	},
	{
		path: 'subscription',
		loadComponent: ()=> import('./subscription/subscription.component').then((m)=>m.SubscriptionComponent)
	},
	{
		path: 'payment',
		loadComponent: ()=> import('./payment/payment.component').then((m)=>m.PaymentComponent)
	},
	{
		path: 'payment-two',
		loadComponent: ()=> import('./payment-tow/payment-tow.component').then((m)=>m.PaymentTowComponent)
	},
	];
