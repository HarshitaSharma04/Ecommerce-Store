import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const items = [
    {
      name: "Test Product A",
      price: 1999,
      quantity: 1,
    },
    {
      name: "Test Product B",
      price: 4999,
      quantity: 2,
    },
  ];

  // Calculate total
  const amount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
