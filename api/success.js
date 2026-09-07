// vercel/functions/success.js
// Processa pagament completat i envia emails automàtics
 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');
 
const resend = new Resend(process.env.RESEND_API_KEY);
 
export default async function handler(req, res) {
  const { session_id, email, name, program } = req.query;
 
  if (!session_id) {
    return res.status(400).json({ error: 'Session ID missing' });
  }
 
  try {
    // Verifica sessió de Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
 
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Pagament no confirmat' });
    }
 
    // Email AL CLIENT
    await resend.emails.send({
      from: 'PI Consultoria <noreply@piconsultoria.eu>',
      to: email,
      subject: '✓ Revisió de Proposta Encarregada | PI Consultoria',
      html: `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: 0 auto; color: #111510;">
          
          <div style="text-align: center; padding: 40px 0; border-bottom: 1px solid #e0e0e0;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0;">Gràcies per encarregar!</h1>
            <p style="font-size: 16px; color: #666; margin: 12px 0 0;">La teva revisió està en bones mans</p>
          </div>
 
          <div style="padding: 40px 0; color: #555;">
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Hola <strong>${name}</strong>,
            </p>
 
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              Hem rebut el teu pagament de <strong>1.089€ (IVA inclòs)</strong> per la revisió de proposta de <strong>${program}</strong>.
            </p>
 
            <div style="background: rgba(22, 43, 30, 0.05); padding: 20px; border-left: 4px solid #274D38; margin: 30px 0; border-radius: 3px;">
              <h3 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #274D38;">Següent Pas</h3>
              <p style="margin: 0; font-size: 16px; line-height: 1.6;">
                Envia't la teva proposta en PDF a <strong>piconsultoria@piconsultoria.eu</strong> amb assumpte:
              </p>
              <p style="margin: 10px 0 0; padding: 10px; background: white; border-radius: 3px; font-family: 'DM Mono', monospace; font-size: 13px; color: #162B1E;">
                [REVISIÓ] - ${name}
              </p>
            </div>
 
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #274D38; margin: 30px 0 12px;">Que inclou la revisió:</h3>
            <ul style="margin: 0; padding-left: 0; font-size: 15px; line-height: 1.8;">
              <li style="margin-bottom: 8px; padding-left: 24px; position: relative;">
                <span style="position: absolute; left: 0;">✓</span>
                Informe PDF amb resum executiu
              </li>
              <li style="margin-bottom: 8px; padding-left: 24px; position: relative;">
                <span style="position: absolute; left: 0;">✓</span>
                Comentaris detallats en-document
              </li>
              <li style="margin-bottom: 8px; padding-left: 24px; position: relative;">
                <span style="position: absolute; left: 0;">✓</span>
                Puntuació estimada als criteris d'avaluació
              </li>
              <li style="margin-bottom: 8px; padding-left: 24px; position: relative;">
                <span style="position: absolute; left: 0;">✓</span>
                Prioritats de millora ordenades per impacte
              </li>
              <li style="padding-left: 24px; position: relative;">
                <span style="position: absolute; left: 0;">✓</span>
                <strong>72 hores hàbils</strong> per rebre el feedback
              </li>
            </ul>
 
            <div style="background: #F2EDE3; padding: 20px; border-radius: 3px; margin: 30px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Preguntes?</strong> Contacta'ns a <strong>piconsultoria@piconsultoria.eu</strong> o 
                <a href="https://wa.me/34XXX" style="color: #274D38; text-decoration: none;">WhatsApp</a>
              </p>
            </div>
 
            <p style="font-size: 14px; color: #999; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <strong>PI Consultoria Ambiental</strong><br>
              Vilafranca del Penedès, Catalunya<br>
              <a href="https://piconsultoria.eu" style="color: #274D38; text-decoration: none;">piconsultoria.eu</a>
            </p>
          </div>
 
        </div>
      `,
    });
 
    // EMAIL A KIRSTEN (NOTIFICACIÓ INTERNA)
    await resend.emails.send({
      from: 'PI Consultoria <noreply@piconsultoria.eu>',
      to: process.env.KIRSTEN_EMAIL || 'piconsultoria@piconsultoria.eu',
      subject: `🎯 Nova Revisió Encarregada: ${name} (${program})`,
      html: `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: 0 auto; color: #111510;">
          
          <h1 style="font-size: 24px; font-weight: bold;">Nova Revisió Encarregada</h1>
 
          <div style="background: #F2EDE3; padding: 20px; border-radius: 3px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>Client:</strong> ${name}</p>
            <p style="margin: 8px 0 0; font-size: 14px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0 0; font-size: 14px;"><strong>Programa:</strong> ${program}</p>
            <p style="margin: 8px 0 0; font-size: 14px;"><strong>Pagament:</strong> 1.089€ (IVA inclòs) ✓</p>
            <p style="margin: 8px 0 0; font-size: 14px;"><strong>Data:</strong> ${new Date().toLocaleDateString('ca-ES')}</p>
          </div>
 
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            El client ha rebut email amb instruccions per enviar la proposta. 
            Quan arribi el PDF, podràs començar la revisió.
          </p>
 
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            Verifica la proposta a la safata d'entrada de piconsultoria@piconsultoria.eu
          </p>
 
        </div>
      `,
    });
 
    // HTML de success visible al client
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ca">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>✓ Pagament Completat | PI Consultoria</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            font-family: 'Outfit', sans-serif;
            background: #F8F7F3;
            color: #111510;
            padding: 40px 20px;
          }
          .container {
            max-width: 700px;
            margin: 0 auto;
            background: white;
            padding: 60px 40px;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(22, 43, 30, 0.1);
          }
          .checkmark {
            width: 80px;
            height: 80px;
            background: #274D38;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            margin: 0 auto 30px;
          }
          h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            font-weight: 800;
            color: #162B1E;
            margin-bottom: 12px;
          }
          .subtitle {
            font-size: 18px;
            color: #666;
            margin-bottom: 40px;
            line-height: 1.6;
          }
          .box {
            background: rgba(22, 43, 30, 0.05);
            padding: 30px;
            border-radius: 3px;
            margin: 40px 0;
            text-align: left;
            border-left: 4px solid #274D38;
          }
          .box h3 {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #274D38;
            margin-bottom: 12px;
          }
          .box p {
            font-size: 16px;
            line-height: 1.8;
            color: #555;
            margin: 8px 0;
          }
          .email-highlight {
            font-family: 'DM Mono', monospace;
            background: white;
            padding: 10px;
            border-radius: 3px;
            margin-top: 12px;
            font-size: 13px;
            color: #162B1E;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: #162B1E;
            color: white;
            text-decoration: none;
            border-radius: 3px;
            font-family: 'DM Mono', monospace;
            font-size: 12px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-top: 30px;
            transition: background 0.3s;
          }
          .button:hover {
            background: #274D38;
          }
          .footer {
            font-size: 12px;
            color: #999;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Pagament Completat</h1>
          <p class="subtitle">
            Gràcies, ${name}! La teva revisió de proposta ha estat encarregada correctament.
          </p>
 
          <div class="box">
            <h3>Següent Pas</h3>
            <p>
              Envia't la teva proposta en PDF a:
            </p>
            <div class="email-highlight">
              <strong>piconsultoria@piconsultoria.eu</strong><br>
              Assumpte: [REVISIÓ] - ${name}
            </div>
            <p style="margin-top: 16px; font-size: 14px;">
              Rebràs el feedback complet en <strong>72 hores hàbils</strong>.
            </p>
          </div>
 
          <div class="box">
            <h3>Resum de la teva comanda</h3>
            <p><strong>Servei:</strong> Revisió de Proposta Europea</p>
            <p><strong>Programa:</strong> ${program}</p>
            <p><strong>Import:</strong> 1.089€ (IVA 21% inclòs)</p>
            <p><strong>Email de confirmació enviat a:</strong> ${email}</p>
          </div>
 
          <div class="box">
            <h3>Qualsevol Pregunta?</h3>
            <p>
              Si tens algun dubte o necessites suport, contacta'ns sense dubtar:
            </p>
            <p style="margin-top: 12px;">
              📧 <strong>piconsultoria@piconsultoria.eu</strong>
            </p>
          </div>
 
          <a href="https://piconsultoria.eu" class="button">Torna a la Web</a>
 
          <div class="footer">
            <p>© 2024 PI Consultoria Ambiental · Vilafranca del Penedès</p>
          </div>
        </div>
      </body>
      </html>
    `);
 
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 40px;">
        <h1>Error Processant Pagament</h1>
        <p>Ha sorgit un problema. Contacta'ns a piconsultoria@piconsultoria.eu</p>
      </body>
      </html>
    `);
  }
}
