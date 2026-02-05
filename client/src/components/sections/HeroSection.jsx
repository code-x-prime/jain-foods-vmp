"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";
import { fetchApi } from "@/lib/utils";

const fallbackSlides = [
  {
    headline: "Authentic Indian Namkeen",
    subheadline: "Taste the Tradition",
    description: "Experience the rich flavors of traditional Indian snacks, crafted with pure ingredients and time-honored recipes passed down through generations.",
    desktopImage: "/banner-1.jpeg",
    mobileImage: "/sm-banner-1.jpeg",
    link: "/products",
    cta: "Shop Namkeen"
  },
  {
    headline: "Premium Quality Snacks",
    subheadline: "Purity You Can Trust",
    description: "Made with the finest ingredients, no preservatives, and commitment to Jain values. Every bite is a celebration of authentic taste.",
    desktopImage: "/banner-2.jpeg",
    mobileImage: "/sm-banner-1.jpeg",
    link: "/products",
    cta: "Explore Collection"
  },
];

export default function HeroSection() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isApiBanner, setIsApiBanner] = useState(false); // Track if using API banners

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetchApi("/public/banners");
        if (res?.success && Array.isArray(res.data?.banners) && res.data.banners.length > 0) {
          const apiSlides = res.data.banners.map((banner) => ({
            headline: banner.title || "Premium Products",
            subheadline: banner.subtitle || "Shop With Confidence",
            description: banner.description || "",
            desktopImage: banner.desktopImage,
            mobileImage: banner.mobileImage || banner.desktopImage,
            link: banner.link || "/products",
            cta: "Shop Now"
          }));
          setSlides(apiSlides);
          setIsApiBanner(true); // API banners loaded successfully
        }
      } catch (err) {
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  if (loading) {
    return (
      <section className="h-[500px] md:h-[600px] flex items-center justify-center bg-[#FAF6F0]">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  // API Banner Layout - Just show the image without overlay
  if (isApiBanner) {
    return (
      <section className="relative w-full overflow-hidden bg-[#FAF6F0]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`relative w-full transition-opacity duration-700 ${index === current ? "opacity-100 block" : "opacity-0 hidden"
              }`}
          >
            {/* Desktop Banner Image */}
            <div className="hidden md:block relative w-full">
              <Image
                src={slide.desktopImage}
                alt={slide.headline || "Banner"}
                width={2000}
                height={1000}
                className="w-full h-auto"
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Mobile Banner Image */}
            <div className="block md:hidden relative w-full">
              <Image
                src={slide.mobileImage}
                alt={slide.headline || "Banner"}
                width={1000}
                height={1000}
                className="w-full h-auto"
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-md bg-[#6A1E1E]/70 backdrop-blur-sm border border-[#D4AF37]/40 items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A1515] hover:border-[#D4AF37] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-md bg-[#6A1E1E]/70 backdrop-blur-sm border border-[#D4AF37]/40 items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A1515] hover:border-[#D4AF37] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#6A1E1E]/60 hover:bg-[#D4AF37]/60"
                  }`}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // Fallback Layout - Show image with text overlay and buttons
  return (
    <section className="relative h-[550px]  w-full overflow-hidden bg-[#6A1E1E]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Background Image */}
          <Image
            src={slide.desktopImage}
            alt={slide.headline}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />

          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#6A1E1E]/95 via-[#6A1E1E]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A1515]/60 to-transparent" /> */}
        </div>
      ))}

      {/* Content */}


      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-md bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/40 items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A1515] hover:border-[#D4AF37] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-md bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/40 items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4A1515] hover:border-[#D4AF37] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#FAF6F0]/40 hover:bg-[#D4AF37]/60"
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
