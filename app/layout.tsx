import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <h1>Diabeto skaičiuoklė</h1>
          </header>

          <main className="app-content">{children}</main>

          <nav className="app-nav">
            <Link href="/">Diary</Link>
            <Link href="/products/add">Add</Link>
            <Link href="/products">Products</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}