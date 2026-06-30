import { prisma } from "@/lib/prisma";
import Link from "next/link";
import styles from "./products.module.css";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
  <div>
    <div className={styles.header}>
      <h1>Products</h1>
      <Link href="/products/add">Add new</Link>
    </div>

    {products.length === 0 ? (
      <p>No products yet.</p>
    ) : (
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.row}>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.brand}>{product.brand}</span>
            <span className={styles.carbs}>{product.carbsPer100}g / 100</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}