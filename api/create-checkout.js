// vercel/functions/create-checkout.js
// Crea una sessió de Stripe Checkout i redirigeix al client

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, program } = req.body;

  // Validació bàsica
  if (!name || !email || !program) {
    return res.status(400).json({ error: 'Falten dades' });
  }

  try {
    // Crea sessió de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Revisió de Proposta Europea',
              description: `Programa: ${program}`,
              images: ['https://piconsultoria.eu/pi-logo.png'], // Opcional: afegeix logo
            },
            unit_amount: 90000, // 900€ en cèntims
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&program=${encodeURIComponent(program)}`,
      cancel_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/revisions-propostes.html`,
      customer_email: email,
      metadata: {
        client_name: name,
        client_email: email,
        program: program,
      },
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Error creant sessió de pagament' });
  }
}
