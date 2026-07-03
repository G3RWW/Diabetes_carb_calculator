"use client";

import { useState } from "react";
import {useEffect} from "react";
import {Html5Qrcode} from "html5-qrcode";
import styles from "./add.module.css"

export default function AddPage() 
{ 
    //barkodiniam ivedimui (barcode input)
    const [barcode, setBarcode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // QR/Barkodo kodo nuskaitymui (QR/Barcode code scanning)
    const [scanning, setScanning] = useState(false);
    // Rankiniam ivedimui (manual input)
    const [manualName, setManualName] = useState("");
    const [manualCarbs, setManualCarbs] = useState("");
    const [manualLoading, setManualLoading] = useState(false);
    const [manualSaved, setManualSaved] = useState(false);
    const [ManualError, setManualError] = useState<string | null>(null);

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

    async function handleManualAdd() {
      setManualLoading(true);
      setManualSaved(false);
      setManualError(null); // you'll need to add this state too

      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: manualName, carbsPer100: parseFloat(manualCarbs) }),
        });

        const data = await response.json();

        if (!response.ok) {
          setManualError(data.error || "Failed to save product");
        } else {
          setManualName("");
          setManualCarbs("");
          setManualSaved(true);
        }
      } catch (err) {
        setManualError("Network error");
      } finally {
        setManualLoading(false);
      }
    }

    useEffect(() =>
    {
      if(!scanning) return;

      const scanner = new Html5Qrcode("barcode-reader");

      scanner
      .start(
    { facingMode: "environment" }, // back to just one key here
    {
      fps: 10,
      qrbox: { width: 250, height: 150 },
      videoConstraints: {
        facingMode: "environment",
        advanced: [{ focusMode: "continuous" }],
      } as MediaTrackConstraints,
    },
    (decodedText) => {
      setBarcode(decodedText);
      setScanning(false);
    },
    () => {}
  )

      .catch((err) =>
      {
        console.error("Error starting the scanner:", err);
        setScanning(false);
      });

      return () => 
      {
        scanner.stop().catch(() => {}); // sustabdyti skeneri, kai komponentas atjungiama (stop the scanner when the component unmounts)
      }

    }, [scanning]);

    return (
    <div>
      <h1>Add Product</h1>

      <hr />
      <div className={styles.form}>
        <button onClick={() => setScanning((s) => !s)}>
          {scanning ? "Stop Scanning" : "Scan Barcode"}
        </button>
        <p> or </p>
        {scanning && <div id="barcode-reader" style={{width: 300}}></div>}
        
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

      <hr />

      <h1>Manual Add</h1>

      <div className={styles.form}>
        <input
          type = "text"
          value = {manualName}
          onChange = {(e) => setManualName(e.target.value)}
          placeholder = "Enter product name"
        />

        <input
          type = "number"
          value = {manualCarbs}
          onChange = {(e) => setManualCarbs(e.target.value)}
          placeholder = "Enter carbs per 100g"
        />

        <button onClick={handleManualAdd} disabled={manualLoading}>
          {manualLoading ? "Saving..." : "Save"}
        </button>
        {manualSaved && <p className={styles.success}>Product saved successfully!</p>}
      </div>
    </div>
    
  );
}