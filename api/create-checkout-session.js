const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      locale: "pt",
      ui_mode: "embedded",
      mode: "subscription",
      line_items: [
        {
          price: "price_1ThT5GIJJ6KVNZQV6QIyf1Jl",
          quantity: 1
        }
      ],
      subscription_data: {
        trial_period_days: 7
      },
      return_url: "https://vagacerta-checkout.vercel.app/sucesso.html?session_id={CHECKOUT_SESSION_ID}"
    });

    res.status(200).json({
      clientSecret: session.client_secret
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};