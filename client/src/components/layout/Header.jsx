"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  ChevronDown,
  Package,
  LogOut,
  MapPin,
  Truck,
  Shield,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi, cn } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";
import Image from "next/image";
import { toast, Toaster } from "sonner";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, getCartItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileCategoryId, setOpenMobileCategoryId] = useState(null);

  const searchInputRef = useRef(null);
  const navbarRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
    setOpenMobileCategoryId(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <>
      <header ref={navbarRef} className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}>
        <Toaster position="top-center" richColors />

        {/* Top Bar */}
        <div className="bg-[#4A1515] text-[#FAF6F0] hidden md:block">
          <div className="section-container">
            <div className="flex items-center justify-between py-2.5 text-sm">
              <div className="flex items-center gap-8">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  Free Shipping on ₹999+
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  100% Pure & Authentic
                </span>
              </div>
              <div className="flex items-center gap-5">
                <a href="tel:+919959067733" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors font-medium">
                  <Phone className="w-4 h-4" />
                  +91 99590 67733
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-[#6A1E1E] border-b border-[#D4AF37]/30">
          <div className="section-container">
            <div className="flex items-center justify-between h-20">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image src="/logo.png" alt="Jain Foods" width={140} height={50} className="h-20 md:h-24 w-auto" priority />
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex flex-1 max-w-lg mx-10">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      placeholder="Search namkeen, snacks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-14 pr-5 bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-lg text-base text-[#4A1515] placeholder:text-[#7B2D26]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </form>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link href="/products" className={`nav-link ${pathname === "/products" ? "nav-link-active" : ""}`}>
                  All Products
                </Link>

                <div className="relative" onMouseEnter={() => setActiveDropdown("categories")} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`nav-link flex items-center gap-1 ${activeDropdown === "categories" ? "text-[#D4AF37]" : ""}`}>
                    Categories <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "categories" ? "rotate-180" : ""}`} />
                  </button>

                  {activeDropdown === "categories" && (
                    <div className="absolute right-0 top-full pt-2 z-50">
                      <div className="bg-[#FFFEF9] rounded-lg shadow-xl border border-[#D4AF37]/30 py-4 px-4 w-[min(560px,calc(100vw-2rem))]">
                        <div className="grid grid-cols-3 gap-4">
                          {(categories || []).slice(0, 3).map((cat) => (
                            <div key={cat.id} className="border-r border-[#D4AF37]/15 last:border-r-0 last:pr-0 pr-3 first:pl-0 pl-1 min-w-0">
                              <Link href={`/category/${cat.slug}`} className="block py-2 text-sm font-bold text-[#6A1E1E] hover:text-[#D4AF37] transition-colors border-b border-[#D4AF37]/20 mb-2">
                                {cat.name}
                              </Link>
                              {cat.subCategories?.length > 0 ? (
                                <ul className="space-y-1">
                                  {cat.subCategories.map((sub) => (
                                    <li key={sub.id} className="truncate" title={sub.name}>
                                      <Link href={`/products?category=${encodeURIComponent(cat.slug)}&subcategory=${encodeURIComponent(sub.slug)}`} className="block py-1.5 text-xs text-[#7B2D26]/85 hover:text-[#D4AF37] hover:pl-1 transition-all truncate" onClick={() => setActiveDropdown(null)}>
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <Link href={`/category/${cat.slug}`} className="block py-1.5 text-xs text-[#7B2D26]/60 hover:text-[#D4AF37]">View all</Link>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-[#D4AF37]/20 mt-4 pt-3 text-center">
                          <Link href="/categories" className="inline-block text-sm font-semibold text-[#D4AF37] hover:text-[#C4A030] hover:underline" onClick={() => setActiveDropdown(null)}>
                            View All Categories →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/about" className={`nav-link ${pathname === "/about" ? "nav-link-active" : ""}`}>
                  About
                </Link>
                <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "nav-link-active" : ""}`}>
                  Contact
                </Link>
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-1">
                <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2.5 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md transition-colors">
                  <Search className="w-5 h-5" />
                </button>

                <Link href="/wishlist" className="hidden md:flex p-2.5 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>

                <ClientOnly>
                  <Link href="/cart" className="p-2.5 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md transition-colors relative">
                    <ShoppingCart className="w-5 h-5" />
                    {getCartItemCount() > 0 && (
                      <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-[#D4AF37] text-[#4A1515] text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                </ClientOnly>

                {/* Account */}
                <div className="relative hidden md:block" onMouseEnter={() => setActiveDropdown("account")} onMouseLeave={() => setActiveDropdown(null)}>
                  <ClientOnly>
                    <button className="p-2.5 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md transition-colors">
                      {isAuthenticated ? (
                        <div className="w-8 h-8 bg-[#D4AF37] rounded-md flex items-center justify-center text-[#4A1515] font-semibold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </button>

                    {activeDropdown === "account" && (
                      <div className="absolute right-0 top-full pt-2 z-50">
                        <div className="bg-[#FFFEF9] rounded-md shadow-xl border border-[#D4AF37]/30 w-56 overflow-hidden">
                          {isAuthenticated ? (
                            <>
                              <div className="bg-[#FAF6F0] p-4 border-b border-[#D4AF37]/20">
                                <p className="font-semibold text-[#6A1E1E] truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-[#7B2D26]/60 truncate">{user?.email}</p>
                              </div>
                              <div className="py-2">
                                <Link href="/account" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10" onClick={() => setActiveDropdown(null)}>
                                  <User className="w-4 h-4" /> My Profile
                                </Link>
                                <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10" onClick={() => setActiveDropdown(null)}>
                                  <Package className="w-4 h-4" /> My Orders
                                </Link>
                                <Link href="/account/addresses" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10" onClick={() => setActiveDropdown(null)}>
                                  <MapPin className="w-4 h-4" /> Addresses
                                </Link>
                              </div>
                              <div className="border-t border-[#D4AF37]/20 py-2">
                                <button onClick={() => { handleLogout(); setActiveDropdown(null); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                  <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="p-4">
                              <p className="text-sm text-[#7B2D26]/70 mb-3">Sign in to access your account</p>
                              <div className="space-y-2">
                                <Link href="/auth" className="block" onClick={() => setActiveDropdown(null)}>
                                  <Button className="w-full btn-primary h-10">Sign In</Button>
                                </Link>
                                <Link href="/auth?tab=register" className="block" onClick={() => setActiveDropdown(null)}>
                                  <Button variant="outline" className="w-full h-10 btn-outline">Create Account</Button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2.5 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#4A1515]/60 lg:hidden" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-[#FFFEF9] p-4" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D4AF37]/60" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search namkeen, snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 bg-[#FAF6F0] border border-[#D4AF37]/40 rounded-md text-base text-[#4A1515] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B2D26]/60">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-[#4A1515]/60" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#FFFEF9] shadow-2xl flex flex-col">
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[#D4AF37]/20 bg-[#6A1E1E]">
              <Image src="/logo.png" alt="Jain Foods" width={100} height={35} className="h-8 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#FAF6F0]/80 hover:text-[#D4AF37] rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ClientOnly>
              {isAuthenticated ? (
                <div className="flex-shrink-0 p-4 bg-[#FAF6F0] border-b border-[#D4AF37]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-md flex items-center justify-center text-[#4A1515] font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-[#6A1E1E]">{user?.name || "User"}</p>
                      <p className="text-xs text-[#7B2D26]/60">{user?.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0 p-4 border-b border-[#D4AF37]/20 flex gap-2">
                  <Link href="/auth" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full btn-primary">Sign In</Button>
                  </Link>
                  <Link href="/auth?tab=register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full btn-outline">Register</Button>
                  </Link>
                </div>
              )}
            </ClientOnly>

            <div className="flex-1 min-h-0 overflow-y-auto py-4">
              <div className="px-4 space-y-1">
                <Link href="/products" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  All Products
                </Link>
                {/* Mobile: accordion – one category open at a time */}
                {(categories || []).slice(0, 3).map((cat) => (
                  <div key={cat.id} className="rounded-md overflow-hidden border border-[#D4AF37]/15">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 bg-[#FAF6F0]/50 text-[#6A1E1E] font-bold hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 text-left"
                      onClick={() => setOpenMobileCategoryId((prev) => (prev === cat.id ? null : cat.id))}
                    >
                      <span>{cat.name}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform flex-shrink-0 ml-2", openMobileCategoryId === cat.id && "rotate-180")} />
                    </button>
                    {openMobileCategoryId === cat.id && cat.subCategories?.length > 0 && (
                      <div className="pl-4 pr-2 pb-2 pt-0 space-y-0.5 bg-[#FFFEF9]">
                        {cat.subCategories.map((sub) => (
                          <Link key={sub.id} href={`/products?category=${encodeURIComponent(cat.slug)}&subcategory=${encodeURIComponent(sub.slug)}`} className="block py-2 text-sm text-[#7B2D26]/85 hover:text-[#D4AF37] border-b border-[#D4AF37]/10 last:border-0" onClick={() => setIsMenuOpen(false)}>
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/categories" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  View All Categories
                </Link>
                <Link href="/wishlist" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link href="/cart" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  Cart
                </Link>
                <Link href="/about" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
                <Link href="/contact" className="block px-4 py-3 text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </div>

              <ClientOnly>
                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-[#D4AF37]/20 px-4">
                    <p className="px-4 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">Account</p>
                    <Link href="/account" className="block px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md" onClick={() => setIsMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md" onClick={() => setIsMenuOpen(false)}>
                      My Orders
                    </Link>
                    <Link href="/account/addresses" className="block px-4 py-2.5 text-sm text-[#6A1E1E] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-md" onClick={() => setIsMenuOpen(false)}>
                      Addresses
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md">
                      Sign Out
                    </button>
                  </div>
                )}
              </ClientOnly>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#6A1E1E] border-t border-[#D4AF37]/30 z-50 safe-area-pb">
        <div className="grid grid-cols-4">
          <Link href="/" className={`flex flex-col items-center py-2.5 ${pathname === "/" ? "text-[#D4AF37]" : "text-[#FAF6F0]/70"}`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] mt-0.5 font-medium">Home</span>
          </Link>
          <Link href="/categories" className={`flex flex-col items-center py-2.5 ${pathname === "/categories" ? "text-[#D4AF37]" : "text-[#FAF6F0]/70"}`}>
            <Package className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Categories</span>
          </Link>
          <Link href="/cart" className={`flex flex-col items-center py-2.5 relative ${pathname === "/cart" ? "text-[#D4AF37]" : "text-[#FAF6F0]/70"}`}>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <ClientOnly>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 bg-[#D4AF37] text-[#4A1515] text-[8px] font-bold rounded-full flex items-center justify-center px-0.5">
                    {getCartItemCount()}
                  </span>
                )}
              </ClientOnly>
            </div>
            <span className="text-[10px] mt-0.5 font-medium">Cart</span>
          </Link>
          <Link href={isAuthenticated ? "/account" : "/auth"} className={`flex flex-col items-center py-2.5 ${pathname.includes("/account") || pathname === "/auth" ? "text-[#D4AF37]" : "text-[#FAF6F0]/70"}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
