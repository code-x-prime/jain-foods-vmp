"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { getProductImageUrl as getImageUrl } from "@/lib/imageUrl";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, ArrowRight, Eye } from "lucide-react";
import { useAddVariantToCart } from "@/lib/cart-utils";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addVariantToCart } = useAddVariantToCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchApi("/public/products?featured=true&limit=12");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);



  const handleAddToCart = async (product) => {
    if (product.variants?.length > 0) {
      const variant = product.variants[0];
      const result = await addVariantToCart(variant, 1, product.name);
      
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="section-header">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <Star className="w-4 h-4 fill-primary" />
            Featured
          </span>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked products just for you</p>
        </div>

        {/* Products Grid */}
        {/* Products Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                  <div className="product-card h-full">
                    {/* Image */}
                    <div className="product-image aspect-square relative">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={getImageUrl(product)}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />
                      </Link>

                      {/* Discount Badge */}
                      {product.hasSale && (
                        <span className="product-badge">Sale</span>
                      )}

                      {/* Quick Actions */}
                      <div className="product-actions">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/products/${product.slug}`}
                          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm mb-1 line-clamp-2 hover:text-primary transition-colors min-h-[2.5em]">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      {product.avgRating > 0 && (
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-[10px] text-gray-500">{product.avgRating.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="product-price text-sm">{formatCurrency(product.basePrice)}</span>
                        {product.hasSale && product.regularPrice > product.basePrice && (
                          <span className="product-price-old text-xs">{formatCurrency(product.regularPrice)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button size="lg" className="btn-dark h-12 px-8 gap-2">
              View All Products <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
