"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp()
  {
    setLoading(true);
    setError(null);

     try {
      const response = await fetch("/api/signup", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

      const data = await response.json();

      if (!response.ok) 
        {
            setError(data.error || "Something went wrong");
        } 
      else 
        {
            router.push("/login");
        }
    } 
    catch (err)
    {
      setError("Network error");
    } 
    finally 
    {
      setLoading(false);
    }
  }


 return (
    <main style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}