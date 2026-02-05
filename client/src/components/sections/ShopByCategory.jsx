"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { getCategoryImageUrl, getImageUrl } from "@/lib/imageUrl";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);



  if (loading) {
    return (
      <section className="section-padding bg-gradient-section">
        <div className="section-container">
          <div className="section-header">
            <div className="h-10 w-56 bg-[#D4AF37]/20 rounded-lg animate-pulse mx-auto mb-5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-[#FAF6F0] animate-pulse border border-[#D4AF37]/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="section-padding bg-gradient-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <Grid3X3 className="w-5 h-5" />
            Categories
          </span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our collection of authentic Indian snacks</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {categories.slice(0, 8).map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="category-card group"
            >
              <Image
                src={getCategoryImageUrl(category.image)}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="category-content p-5">
                <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-1 md:mb-2 truncate">{category.name}</h3>
                <p className="text-white/80 text-sm md:text-base hidden sm:flex items-center gap-2 font-medium">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        {categories.length > 8 && (
          <div className="text-center mt-14">
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#6A1E1E] hover:text-[#D4AF37] font-bold h-14 px-10 gap-3 rounded-lg transition-all text-lg">
                View All Categories <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopByCategory;
