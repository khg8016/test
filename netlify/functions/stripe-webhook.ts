import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { validateEnvVars, requiredEnvVars } from './utils/env';
import { stripe } from './utils/stripe';
import { supabase } from './utils/supabase';

validateEnvVars();

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripeSignature = event.headers['stripe-signature'];

  try {
    if (!stripeSignature) {
      throw new Error('Missing Stripe signature');
    }

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      stripeSignature,
      requiredEnvVars.VITE_STRIPE_WEBHOOK_SECRET
    );

    console.log('Received webhook event:', stripeEvent.type);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      console.log('Session data:', session);
      
      if (session.payment_status === 'paid') {
        const userId = session.client_reference_id;
        if (!userId) {
          throw new Error('Invalid session data: missing user ID');
        }

        // Complete the payment and order
        await supabase.rpc('complete_payment', {
          p_stripe_session_id: session.id,
          p_stripe_payment_intent_id: session.payment_intent as string
        });

        // Add credits to user's balance
        await supabase.rpc('add_credits', {
          p_user_id: userId,
          p_amount: session.amount_total ? session.amount_total : 0,
          p_description: '크레딧 구매'
        });

        console.log(`Payment completed for session ${session.id}`);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error: any) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: error.message || 'Webhook processing failed' 
      })
    };
  }
};