import "./globals.css";
import { Navbar } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  title: "Jain Foods | Authentic Indian Namkeen & Snacks - Traditional Taste",
  description: "Experience the authentic taste of traditional Indian namkeen and snacks. Crafted with pure ingredients, time-honored recipes, and commitment to quality. 100% pure, no preservatives. Free shipping on orders above ₹999.",
  keywords: "Jain Foods, Indian namkeen, traditional snacks, authentic namkeen, pure ingredients, Jain snacks, Indian snacks online, namkeen delivery, traditional Indian food, pure namkeen, no preservatives",
  authors: [{ name: "Jain Foods" }],
  openGraph: {
    title: "Jain Foods | Authentic Indian Namkeen & Snacks - Traditional Taste",
    description: "Experience the authentic taste of traditional Indian namkeen and snacks. Crafted with pure ingredients, time-honored recipes, and commitment to quality.",
    type: "website",
    locale: "en_IN",
    siteName: "Jain Foods",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jain Foods | Authentic Indian Namkeen & Snacks",
    description: "Experience the authentic taste of traditional Indian namkeen and snacks. Crafted with pure ingredients and time-honored recipes.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
