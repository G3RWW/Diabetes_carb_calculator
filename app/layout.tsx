import AuthProvider from "./components/AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "./components/Nav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="app-shell">
            <header className="app-header">
              <h1>Carb Calculator</h1>
              <Nav />
            </header>

            <main className="app-content">{children}</main>
            <nav className="app-nav">
              <p>© 2026 Dovydas. G</p>
            </nav>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}