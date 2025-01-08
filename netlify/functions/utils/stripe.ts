import Stripe from 'stripe';
import { requiredEnvVars } from './env';

export const stripe = new Stripe(requiredEnvVars.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27'
});

export function calculateCreditsFromAmount(amountTotal: number | null | undefined): number {
  if (!amountTotal) return 0;
  // Return the amount directly as credits
  return parseInt(amountTotal.toString(), 10);
}