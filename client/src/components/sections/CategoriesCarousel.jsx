"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { getCategoryImageUrl } from "@/lib/imageUrl";

export default function CategoriesCarousel() {
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
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="section-container">
          <div className="flex gap-4 overflow-hidden justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-gray-100 animate-pulse" />
                <div className="h-3 mt-2 w-14 mx-auto bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="py-4 bg-white border-b border-gray-100 w-full">
      <div className="section-container">
        <div className="relative">
          <div className="flex items-start justify-start lg:justify-evenly gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.slice(0, 10).map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="flex-shrink-0 group text-center"
              >
                {/* Image Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-100 mx-auto shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={getCategoryImageUrl(category.image)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Subtle overlay on hover only */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/20 transition-all duration-300" />
                </div>
                {/* Text Below Image */}
                <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors leading-tight max-w-[70px] sm:max-w-[85px] md:max-w-[100px] mx-auto truncate">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
