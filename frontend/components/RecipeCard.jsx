import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Calendar, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;

  // Extract basic recipe details (compatible with MealDB or Strapi data)
  const title = recipe.title || recipe.strMeal || "Untitled Recipe";
  const description = recipe.description;
  const category = recipe.category || recipe.strCategory;
  const cuisine = recipe.cuisine || recipe.strArea;
  const date = recipe.createdAt || recipe.date;
  const prepTime = recipe.prepTime;
  const cookTime = recipe.cookTime;
  const servings = recipe.servings;
  const image = recipe.imageUrl || recipe.strMealThumb;
  const href = `/recipe?cook=${encodeURIComponent(title)}`;

  // Format date if present
  const formattedDate = date ? new Date(date).toLocaleDateString() : null;

  return (
    <Link href={href} className="h-full block">
      <Card className="h-full flex flex-col justify-between rounded-2xl border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden py-0 group">
        <div>
          {/* Recipe Image Container with Fixed Aspect Ratio */}
          {image ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Subtle Gradient Overlay to make the image pop and blend nicely */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          ) : (
            <div className="relative aspect-[4/3] w-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-white/50" />
            </div>
          )}

          <CardHeader className="pt-5 pb-3">
            {/* Category & Cuisine Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {category && (
                <Badge
                  variant="outline"
                  className="text-muted-foreground border-border bg-muted/50 capitalize font-medium text-[11px]"
                >
                  {category}
                </Badge>
              )}
              {cuisine && (
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/5 capitalize font-semibold text-[11px]"
                >
                  {cuisine}
                </Badge>
              )}
            </div>

            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </CardTitle>

            {description && (
              <CardDescription className="line-clamp-2 text-muted-foreground font-light text-sm mt-1">
                {description}
              </CardDescription>
            )}
          </CardHeader>
        </div>

        {/* Metadata Footer */}
        {(prepTime || cookTime || servings || formattedDate) && (
          <CardContent className="pb-5 pt-0">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/60 pt-3">
              {(prepTime || cookTime) && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {parseInt(prepTime || 0) + parseInt(cookTime || 0)} mins
                  </span>
                </div>
              )}
              {servings && (
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  <span>{servings} servings</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}