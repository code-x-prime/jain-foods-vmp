import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, Truck, Shield, CreditCard, RotateCcw } from "lucide-react";

const shopLinks = [
  { name: "All Products", href: "/products" },
  { name: "New Arrivals", href: "/products?sort=newest" },
  { name: "Best Sellers", href: "/products?sort=popular" },
  { name: "Special Offers", href: "/products?sale=true" },
  { name: "Categories", href: "/categories" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
];

const policyLinks = [
  { name: "Shipping Policy", href: "/shipping-policy" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/jainfoods/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/jainfoods/", icon: Facebook },
  { name: "YouTube", href: "https://youtube.com/@jainfoods", icon: Youtube },
];

const trustFeatures = [
  { icon: Truck, title: "Free Shipping", desc: "On orders ₹999+" },
  { icon: Shield, title: "100% Pure", desc: "Authentic recipes" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day returns" },
  { icon: CreditCard, title: "Secure Pay", desc: "SSL encrypted" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-[#FAF6F0] lg:mb-0 mb-14 overflow-hidden">
      {/* Trust Bar */}
      <div className="relative border-b border-[#D4AF37]/30 bg-[#FFFEF9]">
        <div className="section-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-5 p-5 rounded-lg bg-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                  <feature.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-[#6A1E1E] text-base tracking-wide">{feature.title}</p>
                  <p className="text-[#7B2D26]/60 text-sm mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Jain Foods" width={180} height={70} className="h-28 w-auto" />
            </Link>
            <p className="text-[#7B2D26]/75 text-base leading-relaxed max-w-md">
              Experience the authentic taste of traditional Indian namkeen and snacks. Crafted with pure ingredients, time-honored recipes, and the commitment to quality that defines Jain Foods.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-[#6A1E1E] border border-[#6A1E1E] flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1"
                  title={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xl font-bold text-[#6A1E1E] mb-6 font-display tracking-tight">Shop</h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#7B2D26]/80 hover:text-[#D4AF37] transition-colors text-base font-medium flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#6A1E1E] mb-6 font-display tracking-tight">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#7B2D26]/80 hover:text-[#D4AF37] transition-colors text-base font-medium flex items-center gap-3 group">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#6A1E1E]/70 mb-4 uppercase tracking-wider">Policies</h3>
              <ul className="space-y-3">
                {policyLinks.slice(0, 2).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[#7B2D26]/60 hover:text-[#6A1E1E] transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact - single address + link to all outlets */}
          <div>
            <h3 className="text-xl font-bold text-[#6A1E1E] mb-6 font-display tracking-tight">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-[#6A1E1E] text-sm">Factory Outlet, Begam Bazar</p>
                  <p className="text-[#7B2D26]/80 text-sm leading-relaxed mt-0.5"># 15-7-401, Byj Complex, Begam Bazar, Hyderabad - 500012</p>
                  <Link href="/contact" className="text-[#D4AF37] text-sm font-medium hover:underline mt-2 inline-block">View all outlets →</Link>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/25 transition-colors">
                  <Phone className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <a href="tel:+919959067733" className="text-[#7B2D26]/80 hover:text-[#D4AF37] text-base transition-colors font-medium">
                  +91 99590 67733
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37]/25 transition-colors">
                  <Mail className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <a href="mailto:info@jainfoods.com" className="text-[#7B2D26]/80 hover:text-[#D4AF37] text-base transition-colors font-medium">
                  info@jainfoods.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-[#D4AF37]/30 bg-[#6A1E1E]">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#FAF6F0]/80 text-sm">
              © {new Date().getFullYear()} Jain Foods. All rights reserved. Taste the Tradition.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-4">
              <span className="text-[#FAF6F0]/70 text-sm uppercase tracking-wider font-semibold">Secure Payment:</span>
              <div className="flex gap-2">
                {["UPI", "VISA", "Mastercard", "RuPay"].map((pay) => (
                  <div key={pay} className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg text-xs text-[#D4AF37] font-semibold">
                    {pay}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
