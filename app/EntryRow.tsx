"use client";
import {useRouter} from "next/navigation";
import {useState} from "react";

type Entry = {
    id: string;
    productId: string | null;
    carbsTotal: number;
    amountGrams: number;
}

type Product = {
    id: string;
    name: string;
    carbsPer100: number;
}

export default function EntryRow({ entry, products }: { entry: Entry, products: Product[] })
{
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() 
    {
        setDeleting(true);
        await fetch(`/api/entries/${entry.id}`, { method: "DELETE" });
        router.refresh();
    }

    const productName = products.find((p) => p.id === entry.productId)?.name || "Unknown product";

    return (
        <li>
            {entry.amountGrams}g of {productName} - {entry.carbsTotal.toFixed(1)} carbs
            <button onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
            </button>
        </li>
    );

}