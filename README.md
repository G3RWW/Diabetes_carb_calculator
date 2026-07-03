# Diabeto Skaičiuoklė

A carb-tracking diary. Sign up, add food products (by barcode scan or manual entry), log how many grams you're eating, and it tracks the carbohydrate total for each entry.

## Features

- **Barcode scanning** — use your phone's camera to scan a product barcode, which looks it up automatically via [Open Food Facts](https://world.openfoodfacts.org/).
- **Manual product entry** — add products by name and carbs-per-100g when a barcode isn't found or available.
- **User accounts** — sign up with email/password. Barcode-sourced products are shared across all users; manually entered products and diary entries are private to each account.
- **Diary/calculator** — pick a product, enter grams, and it computes and logs the carb total.
- **Mobile-friendly** — responsive layout, works well on phones (where barcode scanning actually happens).

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm (comes with Node.js)

## Setup

1. Clone the repository and install dependencies:

```bash
git clone 
cd diabeto_skaiciuokle
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env
```

(On Windows, use `copy .env.example .env`.)

You'll need two variables in `.env`:
DATABASE_URL="file:./dev.db"
AUTH_SECRET="generate this — see below"

Generate `AUTH_SECRET` with:

```bash
npx auth secret
```

3. Generate the Prisma client and create the database:

```bash
npx prisma generate
npx prisma migrate dev
```

This creates a local `dev.db` file with the `User`, `Product`, and `Entry` tables — no accounts or products yet.

4. Start the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000). You'll be redirected to sign up / log in before using the app.

### Testing barcode scanning on your phone

Camera access requires HTTPS (or `localhost`, which a phone can't use directly over your local network). Run the dev server with:

```bash
npm run dev -- --experimental-https
```

Then open the `Network` URL it prints (e.g. `https://192.168.x.x:3000`) on your phone, on the same Wi-Fi network. Your phone's browser will warn about the self-signed certificate — this is expected in dev; proceed anyway.

## Using the app

- **Sign up / Log in** — required before adding products or logging entries.
- **Add a product** — via the **Add** page, either scan a barcode or enter details manually.
  - Barcode-sourced products are visible to everyone.
  - Manually entered products are private to your account.
- **Log an entry** — from the home/calculator page, pick a product and enter grams; the carb total is calculated and saved to your diary.

## Tech stack

- Next.js (App Router, Turbopack)
- Prisma + SQLite
- Auth.js (NextAuth v5) — email/password authentication
- bcrypt — password hashing
- html5-qrcode — camera-based barcode scanning
- TypeScript
