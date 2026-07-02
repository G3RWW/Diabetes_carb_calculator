Diabeto Skaičiuoklė

A simple carb-tracking diary. Pick a food product, enter how many grams you're eating, and it logs the carbohydrate total for that entry.

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm (comes with Node.js)

## Setup

1. Clone the repository and install dependencies:
git clone <your-repo-url>
cd diabeto_skaiciuokle
npm install

2. Create your local environment file:
cp .env.example .env
   (On Windows, use `copy .env.example .env`.)

3. Create the database and tables:
npx prisma migrate dev
   This creates a local `dev.db` file with an empty database — no products or entries yet.

4. Start the app:
npm run dev

5. Open [http://localhost:3000](http://localhost:3000).

## Adding products

There's no starter product list — add your own via the **Products** page, either by:
- entering a barcode (looked up automatically via Open Food Facts), or
- entering a name and carbs-per-100g manually.

## Tech stack

- Next.js (App Router)
- Prisma + SQLite
- TypeScript