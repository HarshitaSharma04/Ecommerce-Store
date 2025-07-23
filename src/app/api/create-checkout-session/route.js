import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const items = [
    {
      name: "Test Product A",
      price: 1999, // $19.99
      quantity: 1,
    },
    {
      name: "Test Product B",
      price: 4999, // $49.99
      quantity: 2,
    },
  ];

//   const { items } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // USD in cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    console.log("session:", session)

    // return Response.json({ url: session.url });
    return Response.json(session);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
