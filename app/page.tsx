import { prisma } from "@/lib/prisma";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: { loggedAt: "desc" },
    take: 10,
  });

  return (
    <main>
      <h1>Diary</h1>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.customName ?? "Product"} — {entry.carbsTotal}g carbs
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}