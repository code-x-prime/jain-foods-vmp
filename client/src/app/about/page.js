import { Award, Users, ShoppingBag, Target, CheckCircle, ArrowRight, Truck, Shield, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "About Us | Jain Foods - Traditional Indian Namkeen & Snacks",
    description: "Discover the story of Jain Foods - crafting authentic Indian namkeen and snacks with pure ingredients, traditional recipes, and unwavering commitment to quality.",
};

const stats = [
    { value: "50K+", label: "Happy Families", icon: <Users className="w-7 h-7" /> },
    { value: "100+", label: "Traditional Recipes", icon: <ShoppingBag className="w-7 h-7" /> },
    { value: "100%", label: "Pure Ingredients", icon: <Leaf className="w-7 h-7" /> },
    { value: "25+", label: "Years Legacy", icon: <Award className="w-7 h-7" /> },
];

const values = [
    {
        icon: Leaf,
        title: "Pure & Authentic",
        description: "Every product is made with 100% pure ingredients, following traditional Jain values of purity and non-violence."
    },
    {
        icon: Shield,
        title: "Quality Assured",
        description: "Strict quality control at every step ensures you receive only the finest namkeen and snacks."
    },
    {
        icon: Heart,
        title: "Made with Love",
        description: "Our time-honored recipes have been passed down through generations, made with care and dedication."
    },
    {
        icon: Truck,
        title: "Fresh Delivery",
        description: "We ensure your favorite snacks reach you fresh. Free shipping on orders above ₹999 across India."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FAF6F0]">
            {/* Hero */}
            <section className="py-20 md:py-28 bg-gradient-section">
                <div className="section-container">
                    <div className="max-w-4xl">
                        <span className="section-badge mb-6">
                            <Award className="w-5 h-5" />
                            Our Story
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#6A1E1E] mb-6 tracking-tight">
                            A Legacy of <span className="text-[#D4AF37]">Taste & Tradition</span>
                        </h1>
                        <p className="text-[#7B2D26]/80 text-xl md:text-2xl mb-8 leading-relaxed">
                            For over two decades, Jain Foods has been crafting authentic Indian namkeen and snacks with the finest ingredients and traditional recipes. Rooted in Jain values of purity and quality, every product reflects our commitment to bringing the true taste of India to your home.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["100% Pure", "No Preservatives", "Traditional Recipes", "Jain Values"].map((item) => (
                                <span key={item} className="flex items-center gap-2 px-5 py-2.5 bg-[#FFFEF9] border border-[#D4AF37]/30 rounded-lg text-base font-semibold text-[#6A1E1E]">
                                    <CheckCircle className="w-5 h-5 text-[#D4AF37]" /> {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 md:py-16 bg-[#6A1E1E]">
                <div className="section-container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                                    {stat.icon}
                                </div>
                                <p className="text-3xl md:text-4xl font-bold text-[#FAF6F0] mb-2">{stat.value}</p>
                                <p className="text-[#FAF6F0]/70 text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="section-padding border-b border-[#D4AF37]/20">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto text-center">
                        <span className="section-badge mb-6">Our Heritage</span>
                        <h2 className="section-title mb-8">Rooted in Tradition, Crafted with Care</h2>
                        <p className="text-[#7B2D26]/80 text-xl leading-relaxed mb-10">
                            Our journey began with a simple mission: to preserve the authentic flavors of Indian namkeen while maintaining the highest standards of purity. Every recipe we create honors the culinary traditions of India, using only the finest ingredients sourced from trusted suppliers.
                        </p>
                        <p className="text-[#7B2D26]/80 text-xl leading-relaxed">
                            At Jain Foods, we believe that great taste comes from great ingredients and time-tested techniques. We never compromise on quality, using no artificial preservatives or additives. Each product is a testament to our dedication to bringing you snacks that are as pure as they are delicious.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">Our Values</span>
                        <h2 className="section-title">Why Choose Jain Foods?</h2>
                        <p className="section-subtitle">We are committed to purity, quality, and authentic taste</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="card-premium p-8 hover:border-[#D4AF37]/40">
                                <div className="w-16 h-16 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center mb-5">
                                    <value.icon className="h-8 w-8 text-[#D4AF37]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#6A1E1E] mb-3">{value.title}</h3>
                                <p className="text-[#7B2D26]/70 text-lg leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-[#6A1E1E]">
                <div className="section-container text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-[#FAF6F0] mb-5">
                        Experience the Authentic Taste
                    </h2>
                    <p className="text-[#FAF6F0]/75 text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of happy families who trust Jain Foods for their favorite namkeen and snacks.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#C4A030] text-[#4A1515] font-bold h-14 px-10 rounded-lg shadow-xl text-lg">
                                Shop Our Collection
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="border-2 border-[#D4AF37]/50 text-[#FAF6F0] hover:bg-[#D4AF37] hover:text-[#4A1515] h-14 px-10 rounded-lg text-lg font-bold">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
