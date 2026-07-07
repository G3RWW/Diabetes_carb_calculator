import { prisma } from "@/lib/prisma";
import { Entry } from "@prisma/client";
import { auth } from "@/auth";
import AddEntryForm from "./AddEntryForm";
import EntryRow from "./EntryRow";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  const [entries, products] = await Promise.all([
    prisma.entry.findMany({
      where: { userId },
      orderBy: { loggedAt: "desc" },
      take: 10,
    }),
    prisma.product.findMany({
      where: {
        OR: [{ userId: null }, { userId }],
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const total = entries.reduce((sum: number, e) => sum + e.carbsTotal, 0);

  return (
    <main>
      <h1>Calculator</h1>
      <AddEntryForm products={products} />
      <p>Total: {total.toFixed(1)}g carbs</p>
      {entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} products={products} />
          ))}
        </ul>
      )}
    </main>
  );
}