import React from "react";
import { Globe, ArrowRight, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getRecipeOfTheDay,
  getCategories,
  getAreas,
} from "@/actions/mealdb.actions";
import { getCategoryEmoji, getCountryFlag } from "@/lib/data";

export default async function DashboardPage() {
  // Fetch data server-side
  const recipeData = await getRecipeOfTheDay();
  const categoriesData = await getCategories();
  const areasData = await getAreas();

  const recipeOfTheDay = recipeData?.recipe;
  const categories = categoriesData?.categories || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            Fresh Recipes, <span className="text-primary">Served Daily</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
            Discover thousands of recipes from around the world. Cook, create,
            and savor with AI-powered precision.
          </p>
        </div>

        {/* Recipe of the Day - Hero Section */}
        {recipeOfTheDay && (
          <section className="mb-24 relative">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-primary fill-primary/20" />
              <h2 className="text-3xl font-bold text-foreground">
                Recipe of the Day
              </h2>
            </div>

            <Link
              href={`/recipe?cook=${encodeURIComponent(
                recipeOfTheDay.strMeal
              )}`}
            >
              <div className="relative bg-card border-2 border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group cursor-pointer rounded-3xl">
                {/* AI Overlay Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <Badge
                    className="bg-accent text-accent-foreground border-none px-4 py-1.5 shadow-lg animate-pulse"
                  >
                    <Sparkles className="mr-1.5 w-4 h-4 fill-white" />
                    AI RECOMMENDED
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative aspect-square md:aspect-auto overflow-hidden">
                    <Image
                      src={recipeOfTheDay.strMealThumb}
                      alt={recipeOfTheDay.strMeal}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary bg-primary/5 font-bold"
                      >
                        {recipeOfTheDay.strCategory}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-border text-muted-foreground bg-muted font-bold"
                      >
                        <Globe className="w-3 h-3 mr-1" />
                        {recipeOfTheDay.strArea}
                      </Badge>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {recipeOfTheDay.strMeal}
                    </h3>

                    <p className="text-muted-foreground mb-8 line-clamp-3 font-light text-lg leading-relaxed">
                      {recipeOfTheDay.strInstructions?.substring(0, 200)}...
                    </p>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-fit px-8"
                    >
                      Start Cooking <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Browse by Categories */}
        <section className="mb-24">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Find recipes that match your mood
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link
                key={category.strCategory}
                href={`/recipes/category/${category.strCategory.toLowerCase()}`}
              >
                <div className="bg-card p-6 border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/5 transition-all text-center group cursor-pointer">
                  <div className="text-4xl mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                    {getCategoryEmoji(category.strCategory)}
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                    {category.strCategory}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Cuisine */}
        <section className="pb-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Explore Cuisines
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Travel the globe through your kitchen
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {areas.map((area) => (
              <Link
                key={area.strArea}
                href={`/recipes/cuisine/${area.strArea
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <div className="bg-muted/50 p-5 border border-border rounded-xl hover:border-primary/50 hover:bg-background hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {getCountryFlag(area.strArea)}
                    </span>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                      {area.strArea}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}