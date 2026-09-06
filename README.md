# PI Consultoria — Revisió de Propostes Europees

Sistema de venda en línia per a revisions de propostes de finançament europeu.

**🎯 Característiques:**
- Pàgina de venda responsiva amb branding PI Consultoria
- Pagament automàtic via Stripe Checkout
- Emails automàtics al client i a Kirsten
- Deploy automàtic a Vercel quan cambies coses al GitHub

---

## 📁 Estructura

```
pi-consultoria-revisions/
├── api/
│   ├── create-checkout.js       ← Crea sessió de pagament
│   └── success.js                ← Processa pagament i envia emails
├── public/
│   └── revisions-propostes.html  ← Pàgina de venda
├── package.json                  ← Dependències
├── .gitignore
├── KIRSTEN_GUIDE.md              ← LÉGEIX AQUEST (guia simple)
├── SETUP_VERCEL_STRIPE.md        ← Guia tècnica
└── README.md                     ← AQUEST FITXER
```

---

## 🚀 Inici Ràpid

### Per a Kirsten (NO programes)
1. **Llegeix**: `KIRSTEN_GUIDE.md` (instruccions passo-a-passo)
2. **Setup**: 45 minuts totals
3. **Cambiar coses**: Super fàcil (veure guia)

### Per a Programadors
1. `npm install`
2. Setup variables d'entorn (veure SETUP_VERCEL_STRIPE.md)
3. `npm run dev` (local) o `npm run deploy` (producció)

---

## ✅ Contacte

- **Kirsten**: piconsultoria@piconsultoria.eu
- **Web**: https://piconsultoria.eu

---

**© 2024 PI Consultoria Ambiental**
