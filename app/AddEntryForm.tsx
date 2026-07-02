"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Produt = {
    id: string;
    name: string;
    carbsPer100: number;
};

export default function AddEntryForm({ products }: { products: Produt[] }) 
{
    const router = useRouter();
    const [selectedId, setSelectedId] = useState("");
    const [grams, setGrams] = useState("");
    const [loading, setLoading] = useState(false);

    const selected = products.find((p) => p.id === selectedId);
    const preview = selected && grams ? (selected.carbsPer100 * Number(grams)) / 100 : 0;

    async function handleAdd() {
        {
            if (!selectedId || !grams) return;
                setLoading(true);
            
            await fetch("/api/entries/add", 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: selectedId, amountGrams: Number(grams) }),
                });
        }
        setGrams("");
        setLoading(false);
        router.refresh();
    }

    return (
        <div>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                <option value="">Select a product</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>

            <input
                type="number"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                placeholder="Amount (grams)"
            />
                        
            {preview && <span> {preview.toFixed(2)} carbs</span>}
        <button onClick={handleAdd} disabled={loading || !selectedId || !grams}>
            Add
        </button>
        </div>
    );
}