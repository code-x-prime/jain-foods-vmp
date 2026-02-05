"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { AlertCircle, ArrowRight, Grid3X3, Package, Zap, Headphones } from "lucide-react";
import { getCategoryImageUrl } from "@/lib/imageUrl";



const CategoryCard = ({ category, index }) => {
    return (
        <div className="group animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <Link href={`/category/${category.slug}`}>
                <div className="card-premium h-full hover:border-[#D4AF37]/40">
                    {/* Image */}
                    <div className="relative h-40 w-full overflow-hidden bg-[#FAF6F0] rounded-t-md">
                        <Image
                            src={getCategoryImageUrl(category.image)}
                            alt={category.name}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#4A1515] px-2.5 py-1 rounded-md text-xs font-bold shadow-md">
                            {category._count?.products || 0}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 border-t border-[#D4AF37]/20">
                        <h3 className="text-sm font-bold text-[#6A1E1E] mb-1 group-hover:text-[#D4AF37] transition-colors">
                            {category.name}
                        </h3>
                        <p className="text-[#7B2D26]/60 text-xs mb-3 line-clamp-2">
                            {category.description || "Explore our products"}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#7B2D26]/50">
                                {category._count?.products || 0} products
                            </span>
                            <span className="flex items-center text-[#D4AF37] font-medium text-xs gap-1 group-hover:gap-2 transition-all">
                                View <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const CategoryCardSkeleton = () => (
    <div className="bg-[#FFFEF9] rounded-md overflow-hidden animate-pulse border border-[#D4AF37]/15">
        <div className="h-40 w-full bg-[#FAF6F0]"></div>
        <div className="p-4 border-t border-[#D4AF37]/20">
            <div className="h-4 bg-[#D4AF37]/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-[#FAF6F0] rounded w-full mb-1"></div>
            <div className="h-3 bg-[#FAF6F0] rounded w-5/6 mb-3"></div>
            <div className="flex justify-between">
                <div className="h-3 bg-[#FAF6F0] rounded w-1/4"></div>
                <div className="h-3 bg-[#D4AF37]/20 rounded w-1/4"></div>
            </div>
        </div>
    </div>
);

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetchApi("/public/categories");
                setCategories(response.data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError(err.message || "Failed to load categories");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const totalProducts = categories.reduce((sum, cat) => sum + (cat._count?.products || 0), 0);

    return (
        <div className="min-h-screen bg-[#FAF6F0]">
            {/* Hero */}
            <section className="py-12 md:py-16 bg-gradient-section">
                <div className="section-container text-center">
                    <span className="section-badge mb-4">
                        <Grid3X3 className="w-4 h-4" />
                        Browse Categories
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#6A1E1E] mb-4">
                        Shop by <span className="text-[#D4AF37]">Category</span>
                    </h1>
                    <p className="text-[#7B2D26]/70 max-w-xl mx-auto">
                        Explore our wide range of authentic Indian namkeen and snacks
                    </p>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="section-container py-4">
                <div className="flex items-center text-sm">
                    <Link href="/" className="text-[#7B2D26]/60 hover:text-[#D4AF37] transition-colors">Home</Link>
                    <span className="mx-2 text-[#7B2D26]/40">/</span>
                    <span className="text-[#D4AF37] font-medium">Categories</span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="section-container mb-6">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-md flex items-start">
                        <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0 w-5 h-5" />
                        <div>
                            <h3 className="font-medium text-red-800 mb-1">Error Loading Categories</h3>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="section-container pb-16">
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {[...Array(10)].map((_, index) => (
                            <CategoryCardSkeleton key={index} />
                        ))}
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#D4AF37]/15 rounded-md flex items-center justify-center">
                            <Package className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#6A1E1E] mb-2">No Categories Found</h2>
                        <p className="text-[#7B2D26]/60 mb-6 max-w-md mx-auto">
                            We&apos;re adding new categories soon. Check back later!
                        </p>
                        <Link href="/products">
                            <button className="px-6 py-3 bg-[#D4AF37] text-[#4A1515] rounded-md font-semibold hover:bg-[#C4A030] transition-colors shadow-md">
                                Browse All Products
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {categories.map((category, index) => (
                                <CategoryCard key={category.id} category={category} index={index} />
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="mt-12 bg-[#6A1E1E] rounded-md p-6 md:p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-md flex items-center justify-center mx-auto mb-2 text-[#D4AF37]">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div className="text-2xl font-bold text-[#FAF6F0]">{categories.length}</div>
                                    <div className="text-sm text-[#FAF6F0]/60">Categories</div>
                                </div>
                                <div>
                                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-md flex items-center justify-center mx-auto mb-2 text-[#D4AF37]">
                                        <Grid3X3 className="w-5 h-5" />
                                    </div>
                                    <div className="text-2xl font-bold text-[#FAF6F0]">{totalProducts}</div>
                                    <div className="text-sm text-[#FAF6F0]/60">Products</div>
                                </div>
                                <div>
                                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-md flex items-center justify-center mx-auto mb-2 text-[#D4AF37]">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="text-2xl font-bold text-[#FAF6F0]">100%</div>
                                    <div className="text-sm text-[#FAF6F0]/60">Pure</div>
                                </div>
                                <div>
                                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-md flex items-center justify-center mx-auto mb-2 text-[#D4AF37]">
                                        <Headphones className="w-5 h-5" />
                                    </div>
                                    <div className="text-2xl font-bold text-[#FAF6F0]">24/7</div>
                                    <div className="text-sm text-[#FAF6F0]/60">Support</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
