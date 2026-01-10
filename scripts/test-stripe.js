require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.error('❌ STRIPE_SECRET_KEY is missing in .env.local');
  process.exit(1);
}

const stripe = new Stripe(stripeKey);

async function checkStripeConnection() {
  console.log('Checking Stripe connection with key:', stripeKey.substring(0, 8) + '...');
  try {
    const balance = await stripe.balance.retrieve();
    console.log('✅ Stripe Connection Successful!');
    console.log('   Balance Available:', balance.available.map(b => `${b.amount/100} ${b.currency}`).join(', '));
    console.log('   Balance Pending:', balance.pending.map(b => `${b.amount/100} ${b.currency}`).join(', '));
    console.log('   Live Mode:', balance.livemode);
  } catch (error) {
    console.error('❌ Stripe Connection Failed:', error.message);
  }
}

checkStripeConnection();
