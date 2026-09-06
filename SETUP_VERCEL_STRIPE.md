# Setup: Stripe Checkout + Vercel + Resend para PI Consultoria

## Resumen del flux

1. **Client clic "Iniciar Revisió"** → Modal de formulari
2. **Client completa dades** (nom, email, programa)
3. **Client clic "Pagar"** → Redirige a Stripe Checkout (hosted)
4. **Pagament exitós** → Redirige a pàgina de success
5. **Emails automàtics** s'envien a:
   - Cliente: instruccions d'on enviar proposta
   - Kirsten: notificació que ha rebut pagament

---

## PART 1: Crear Projecte a Vercel

### 1.1 Inicialitzar projecte
```bash
npm init -y
npm install stripe resend
```

### 1.2 Estructura de carpetes
```
pi-consultoria-web/
├── vercel.json
├── package.json
├── api/
│   ├── create-checkout.js
│   └── success.js
├── public/
│   └── revisions-propostes.html
└── ...altres fitxers...
```

### 1.3 Fitxer `vercel.json`
```json
{
  "functions": {
    "api/create-checkout.js": {
      "memory": 1024,
      "maxDuration": 30
    },
    "api/success.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

---

## PART 2: Obtenir Claus d'API

### 2.1 STRIPE
1. Ves a https://dashboard.stripe.com/login
2. Registra't o accedeix
3. Al dashboard, busca **"API Keys"** a l'esquerra
4. Veuràs:
   - **Publishable key** (comença amb `pk_test_...` o `pk_live_...`)
   - **Secret key** (comença amb `sk_test_...` o `sk_live_...`)
5. **GUARDAR ALS SECRETS DE VERCEL** (veure Pas 3.1)

### 2.2 RESEND (para enviar emails)
1. Ves a https://resend.com
2. Registra't gratuitament
3. Va a **"API Keys"** al dashboard
4. Copia la clau d'API
5. **GUARDAR ALS SECRETS DE VERCEL** (veure Pas 3.1)

### 2.3 EMAIL DE KIRSTEN
- Necessites el teu email: `piconsultoria@piconsultoria.eu`
- **OPCIONAl**: Verifica el domini a Resend perquè no marque com spam

---

## PART 3: Deploy a Vercel

### 3.1 Configurar Variables d'Entorn
1. Accedeix a https://vercel.com i connecta't
2. Importa el teu repositori GitHub (o crea-ne un)
3. A "Settings" → "Environment Variables", afegeix:

```
STRIPE_SECRET_KEY = sk_test_... (o sk_live_... en producció)
RESEND_API_KEY = re_xxxxx
KIRSTEN_EMAIL = piconsultoria@piconsultoria.eu
VERCEL_URL = https://piconsultoria.eu (o el teu domain)
```

### 3.2 Fer Deploy
```bash
# Inicialitza Vercel
npx vercel

# Selecciona opcions per defecte, connecta GitHub repo
# I automaticament es desplega quan fas `git push`
```

O manualment:
1. Entra a Vercel dashboard
2. Selecciona el projecte
3. "Deployments" → "Deploy" → puja els fitxers

---

## PART 4: Connectar HTML a Backend

### 4.1 URL del Checkout
L'HTML necessita cridar a `/api/create-checkout` que *ja* està a l'HTML actualitzat.

**Verifica que l'HTML tingui:**
```javascript
const response = await fetch('/api/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: name,
    email: email,
    program: program
  })
});
```

---

## PART 5: Provar en Local (Opcional)

```bash
# Instal·lar Vercel CLI
npm install -g vercel

# Copiar variables d'entorn local
# Crea fitxer .env.local:
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
KIRSTEN_EMAIL=piconsultoria@piconsultoria.eu

# Executar en local
vercel dev

# Accedir a http://localhost:3000/revisions-propostes.html
```

---

## PART 6: Testejar el Flux

### 6.1 Ambiente de TEST (Recommended)
1. Usa `pk_test_` i `sk_test_` de Stripe
2. Tarjeta de test de Stripe:
   - **Numero**: 4242 4242 4242 4242
   - **Data**: 12/34
   - **CVC**: 123
3. Clica "Pagar"
4. Hauria de redirigir a success page
5. Revisa que Kirsten rebi email a `piconsultoria@piconsultoria.eu`

### 6.2 Switchear a LIVE
Quan estigueu segurs:
1. Vai a Stripe dashboard
2. Canvia a **Live Keys** (activa mode live)
3. Copia `pk_live_` i `sk_live_`
4. Actualitza Vercel variables d'entorn
5. Els clients pagaran REALMENT

---

## PART 7: Configuració de Dominis

### 7.1 Email Sender (Opcional pero Recomanat)
Perquè els emails no vagin a spam:
1. Va a Resend dashboard
2. "Domains" → "Add Domain"
3. Afegeix `noreply@piconsultoria.eu`
4. Segueix instruccions de DNS (afegir registres SPF/DKIM)
5. Verifica el domini

### 7.2 Stripe Webhook (OPCIONAL - per futur)
Si més tard vols processar pagaments asincronament:
1. Stripe dashboard → "Webhooks"
2. Endpoint URL: `https://tu-domain.vercel.app/api/webhook`
3. Escull events: `checkout.session.completed`

---

## PART 8: Checklist de Producció

- [ ] `STRIPE_SECRET_KEY` = clau LIVE (sk_live_...)
- [ ] `RESEND_API_KEY` = clau de Resend
- [ ] `KIRSTEN_EMAIL` = email correcte
- [ ] Verifica que els emails arribin a Kirsten (check spam)
- [ ] HTML apunta a `/api/create-checkout` (ja fet)
- [ ] Stripe en mode LIVE
- [ ] Testeja amb tarjeta real (o 4242 si és sandbox)

---

## Troubleshooting

### "Error creant sessió"
- Verifica que `STRIPE_SECRET_KEY` és correcta a Vercel
- Comprova que el secret key comença amb `sk_`

### "Email no arriba"
- Verifica que `RESEND_API_KEY` és correcta
- Comprova que `KIRSTEN_EMAIL` és correcta
- Vai a spam a la bandeja de Kirsten

### "Redirect al success falla"
- Verifica que `VERCEL_URL` és el domain correcte
- Assegura't que `/api/success` existeix

### Stripe en mode TEST pero vols LIVE
- Vai a Stripe dashboard → "Developers" → "API Keys"
- Canvia a "Live Data"
- Copia claus LIVE (pk_live_, sk_live_)

---

## Suport

Si tens problemes:
1. Revisa logs de Vercel: `vercel logs`
2. Verifica variables d'entorn: `vercel env ls`
3. Contacta Stripe support: support@stripe.com
4. Contacta Resend support: support@resend.com

---

**Data de creació**: Agost 2026  
**Versió**: 1.0  
**Mantenedora**: PI Consultoria
