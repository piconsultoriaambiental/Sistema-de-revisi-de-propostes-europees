# 🎯 Guia de Setup per a Kirsten (SIN CÓDIGO)

## ⏱️ Temps Total: 45 minuts

---

## PART 1: Obrir Comptes Online (15 min)

### Pas 1.1: Crear Compte a GitHub
1. Ves a https://github.com
2. Clica **"Sign up"** (part superior dreta)
3. Completa:
   - Email: (la teva)
   - Password: (segura)
   - Username: (ex: `kirsten-pi-consultoria`)
4. Verifica email (GitHub t'enviarà email de confirmació)
5. **GUARDAR**: Username i password

### Pas 1.2: Crear Compte a Stripe
1. Ves a https://dashboard.stripe.com/register
2. Completa:
   - Email: piconsultoria@piconsultoria.eu
   - Password: (segura)
   - País: Espanya
3. Verifica el numero de telèfon (rebràs SMS)
4. Una vegada dins, vai a **"Developers"** (menú esquerra)
5. Clica **"API Keys"**
6. Veuràs dues claus:
   - **Publishable key** (comença amb `pk_test_`)
   - **Secret key** (comença amb `sk_test_`)
7. **COPIAR i GUARDAR ambdues claus en un fitxer de text**

### Pas 1.3: Crear Compte a Resend (para emails)
1. Ves a https://resend.com
2. Clica **"Sign up"**
3. Completa email i password
4. Verifica email
5. Una vegada dins, vai a **"API Keys"** (menú esquerra)
6. Veuràs una clau API
7. **COPIAR i GUARDAR en el fitxer de text**

### Pas 1.4: Crear Compte a Vercel
1. Ves a https://vercel.com
2. Clica **"Sign up"**
3. Escull **"Continue with GitHub"**
4. GitHub t'demanarà permís → **"Authorize vercel"**
5. Completa nom i email
6. **JA HAS ACABAT AQUESTA PART**

---

## PART 2: Setup del Repositori GitHub (10 min)

### Pas 2.1: Jo creo el repositori
1. (Jo ja l'he creat per tu)
2. Tu rebràs un link: `https://github.com/xxxx/pi-consultoria-revisions`

### Pas 2.2: Tu accedeixs al repositori
1. Ves al link que t'envío
2. Veuràs tots els fitxers
3. Assegura't que estàs connectat amb el teu compte GitHub

---

## PART 3: Connectar GitHub a Vercel (15 min)

### Pas 3.1: Connectar Repositori
1. Ves a https://vercel.com
2. Login amb GitHub (ja hauria d'estar connectat)
3. Clica **"New Project"** (part superior dreta)
4. Veuràs la llista de repositoris GitHub
5. Busca `pi-consultoria-revisions`
6. Clica **"Import"**

### Pas 3.2: Afegir Variables d'Entorn
1. Vercel te demana "Environment Variables"
2. Afegeix aquestes variables (les vais guardar antes):

```
STRIPE_SECRET_KEY = sk_test_xxxxx (copiar de Stripe dashboard)
RESEND_API_KEY = re_xxxxx (copiar de Resend)
KIRSTEN_EMAIL = piconsultoria@piconsultoria.eu
VERCEL_URL = https://piconsultoria.eu
```

3. Per cada una:
   - Clica **"Add Environment Variable"**
   - Escriu la clau (ex: `STRIPE_SECRET_KEY`)
   - Escriu el valor (ex: `sk_test_xxxxx`)
   - Clica "Save"

### Pas 3.3: Deploy
1. Clica **"Deploy"** (botó gran)
2. Vercel començarà a compilar (traurà 1-2 minuts)
3. Quan vegi **"✓ Ready"** en verd, ja està live!
4. Vercel t'es donarà una URL (ex: `https://pi-consultoria.vercel.app`)

---

## PART 4: Provar que Funciona (5 min)

### Pas 4.1: Accedir a la Pàgina
1. Ves a la URL que Vercel t'ha donat (ex: `https://pi-consultoria.vercel.app/public/revisions-propostes.html`)
2. Hauries de veure la pàgina de venda de revisions

### Pas 4.2: Provar Pagament
1. Clica **"Iniciar Revisió"**
2. Completa formulari:
   - Nom: `Test User`
   - Email: (el teu)
   - Programa: `Horizon Europe`
3. Clica **"Pagar 900€"**
4. (Redirige a Stripe Checkout)
5. **Tarjeta de TEST** (no paga real):
   - Número: `4242 4242 4242 4242`
   - Data: `12/34`
   - CVC: `123`
   - Nom: `Test User`
6. Clica **"Pagar"**
7. Hauries de veure pàgina de success
8. Verifica email (check spam folder!)

**Si veus email a la teva bandeja → ✅ Tot funciona!**

---

## PART 5: Cambiar Coses (El Millor Part!)

### Scenario 1: Cambiar el Preu de 900€ a Altra Cosa

1. Ves a https://github.com/xxxx/pi-consultoria-revisions (el teu repositori)
2. Busca carpeta `api` → obri `create-checkout.js`
3. Clica el **llapis ✎️** (Edit)
4. Busca la línia: `unit_amount: 90000` (representa 900€)
5. Cambiar número:
   - 1000€ → `unit_amount: 100000`
   - 500€ → `unit_amount: 50000`
6. Scroll baix
7. Clica **"Commit changes"** (green button)
8. Escriu descripció (ex: "Cambiar preu a 1000€")
9. Clica **"Commit changes"** de nou
10. **En 30 segons, Vercel auto-redeploy!**

### Scenario 2: Cambiar Text de la Pàgina

1. Ves al repositori GitHub
2. Clica `public` → `revisions-propostes.html`
3. Clica el **llapis ✎️**
4. Busca el text que vols cambiar (ex: "Feedback Expert per a Propostes Europees")
5. Cambiar el text
6. Scroll baix → **"Commit changes"**
7. **Live en 30 seg!**

### Scenario 3: Cambiar Email de Notificació

1. Ves a https://vercel.com
2. Clica el projecte `pi-consultoria`
3. Vai a **"Settings"** (menú superior)
4. Busca **"Environment Variables"**
5. Busca `KIRSTEN_EMAIL`
6. Clica el **llapis ✎️**
7. Cambiar email
8. Clica **"Save"**
9. Vercel auto-redeploy

---

## 🎮 Exemplos de Cambis Comuns

### "Vull cambiar el preu a 1200€"
```
Fitxer: api/create-checkout.js
Busca: unit_amount: 90000
Cambiar a: unit_amount: 120000
Commit
```

### "Vull afegir més idiomas (anglès)"
```
Fitxer: public/revisions-propostes.html
Busca: <html lang="ca">
Cambiar a: <html lang="ca-en"> (o crear nova página en-revisions-propostes.html)
Commit
```

### "Vull cambiar el programa de "LIFE" a "Erasmus""
```
Fitxer: public/revisions-propostes.html
Busca: <option value="LIFE">LIFE</option>
Cambiar a: <option value="Erasmus">Erasmus</option>
Commit
```

---

## 🚀 Quan Estigui LIVE (Mode de Verdad)

Un cop tot funcioni en TEST (amb tarjeta 4242...):

### Pas 1: Obtenir Claus LIVE de Stripe
1. Ves a https://dashboard.stripe.com
2. Menú esquerra → **"Developers"**
3. Clica **"API Keys"** → **"Live Data"** (toggle part superior)
4. Veuràs noves claus:
   - `pk_live_xxxxx`
   - `sk_live_xxxxx`
5. **COPIAR la clau `sk_live_`**

### Pas 2: Actualitzar Variable a Vercel
1. Vercel dashboard → Settings → Environment Variables
2. Busca `STRIPE_SECRET_KEY`
3. Cambiar el valor de `sk_test_` a `sk_live_`
4. Save
5. **EN VERD: Els clients ara pagaran de VERDAD**

---

## ⚠️ Coses Importants

1. **SK_TEST vs SK_LIVE**: No mesclis-les!
   - Test = simulació (no costa diners)
   - Live = real (costa diners)

2. **Cambiar Coses**: Sempre via GitHub
   - Edit → Commit → Auto-redeploy (30 seg)
   - NO editis directament a Vercel

3. **Emails**: Si no arriben:
   - Check spam folder
   - Verifica que Resend API key és correcta
   - Asegura't que `KIRSTEN_EMAIL` és correcta

4. **Histórico de Cambis**: GitHub guarda TOT
   - Pots veure qui va cambiar què quan
   - Pots tornar a versió anterior si algo falla

---

## 🆘 Problemes?

### "Vercel dice "Build failed""
1. Vai a Vercel dashboard → Deployments → veure logs
2. Busca l'error (normalment és falta de variable d'entorn)
3. Verifica que totes les variables d'entorn estàn ben escrites

### "Email no arriba"
1. Check spam folder
2. Verifica que `KIRSTEN_EMAIL` és correcta a Vercel
3. Verifica que `RESEND_API_KEY` és correcta a Vercel

### "Stripe page no carrega"
1. Verifica que `STRIPE_SECRET_KEY` comença amb `sk_` (no `pk_`)
2. Verifica que és `sk_test_` si estàs en TEST o `sk_live_` si és LIVE

### "Pàgina de venda no es veu"
1. Verifica que l'URL és: `https://xxx.vercel.app/public/revisions-propostes.html`
2. Comprova que `public/` està dins

---

## 📞 Nexts Steps

1. **Setembre**: Linkear aquesta pàgina des de la pàgina principal (index.html)
2. **Setembre**: Testejar amb 2-3 clients de confiança (en TEST)
3. **Octubre**: Passar a LIVE quan estiguem segurs

---

## ✅ Checklist Final

- [ ] He creat comptes GitHub, Stripe, Resend, Vercel
- [ ] He conectat GitHub a Vercel
- [ ] He afegit les variables d'entorn (STRIPE_SECRET_KEY, etc.)
- [ ] Vercel diu "✓ Ready" (deploy exitós)
- [ ] He accedit a la URL de Vercel
- [ ] He provat pagament amb tarjeta 4242
- [ ] He rebut emails (check spam!)
- [ ] He fet un cambio pequeño al GitHub (ex: cambiar preu) i he vist que Vercel auto-redeploy

**Si totes les caselles estan ✓ → JA ESTÀS LLESTA!**

---

**PREGUNTES?** Contacta: piconsultoria@piconsultoria.eu

**Última Actualització**: Agost 2026
