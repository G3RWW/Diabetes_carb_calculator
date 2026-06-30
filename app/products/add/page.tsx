"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./add.module.css"

export default function AddPage() 
{
    const [barcode, setBarcode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLookup() 
    {
        setLoading(true);
        setError(null);
        setResult(null);

        try 
        {
            const response = await fetch(`/api/products/lookup?barcode=${barcode}`);
            const data = await response.json();

            if(!response.ok)
            {
                setError(data.error || "An error occurred while looking up the barcode.");
            }
            else 
            {
                setResult(data);
            }
        }

        catch (err)
        {
            setError("Network error occurred while looking up the barcode.");
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
    <div>
      <h1>Add Product</h1>

      <div className={styles.form}>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
        />
        <button onClick={handleLookup} disabled={loading}>
          {loading ? "Looking up..." : "Lookup"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <div className={styles.result}>
          <div className={styles.resultRow}>Name: {result.name}</div>
          <div className={styles.resultRow}>Carbs: {result.carbsPer100}g</div>
        </div>
      )}
    </div>
  );
}