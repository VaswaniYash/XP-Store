"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/lib/types";
import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter, SlidersHorizontal, Star, Trophy, Zap, PlayCircle } from "lucide-react";
import { useCartContext } from "@/components/providers/cart-context";

// Extended Game Interface for local usage
interface GameProduct extends Product {
  genre?: string;
  rating?: number;
  releaseYear?: number;
}

const allGames: GameProduct[] = [
  {
    _id: "g1",
    name: "Elden Ring",
    description: "Winner of Game of the Year. An expansive fantasy world created by Hidetaka Miyazaki and George R.R. Martin.",
    price: 3999,
    image: "/Images/games/elden-ring.png",
    category: "PlayStation", // Using category as platform for filter
    platform: "PlayStation",
    genre: "RPG",
    rating: 4.9,
    stock: 50
  },
  {
    _id: "g2",
    name: "God of War Ragnarök",
    description: "The Santa Monica Studio presents the sequel to the critically acclaimed God of War (2018). Kratos and Atreus must journey to each of the Nine Realms.",
    price: 4999,
    image: "/Images/games/god-of-war.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "Action-Adventure",
    rating: 4.9,
    stock: 45
  },
  {
    _id: "g3",
    name: "Halo Infinite",
    description: "The legendary Halo series returns with the most expansive Master Chief campaign yet and a ground-breaking free to play multiplayer experience.",
    price: 3999,
    image: "/Images/games/halo-infinite.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "FPS",
    rating: 4.5,
    stock: 60
  },
  {
    _id: "g4", 
    name: "The Legend of Zelda: Tears of the Kingdom",
    description: "In this sequel to the Legend of Zelda: Breath of the Wild, you'll decide your own path through the sprawling landscapes of Hyrule.",
    price: 4999,
    image: "/Images/games/zelda-totk.png",
    category: "Nintendo",
    platform: "Nintendo",
    genre: "Adventure",
    rating: 5.0,
    stock: 80
  },
  {
    _id: "g5",
    name: "Marvel's Spider-Man 2",
    description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city.",
    price: 4999,
    image: "/Images/games/spiderman-2.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "Action",
    rating: 4.8,
    stock: 50
  },
  {
    _id: "g6",
    name: "Forza Horizon 5",
    description: "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action.",
    price: 3999,
    image: "/Images/games/forza.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "Racing",
    rating: 4.8,
    stock: 55
  },
  {
    _id: "g7",
    name: "Super Mario Odyssey",
    description: "Explore incredible places far from the Mushroom Kingdom as you join Mario and his new ally Cappy on a massive, globe-trotting 3D adventure.",
    price: 3999,
    image: "/Images/games/mario-odyssey.png",
    category: "Nintendo",
    platform: "Nintendo",
    genre: "Platformer",
    rating: 4.8,
    stock: 65
  },
  {
    _id: "g8",
    name: "Starfield",
    description: "In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.",
    price: 4499,
    image: "/Images/games/starfield.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "RPG",
    rating: 4.2,
    stock: 40
  },
  {
    _id: "g9",
    name: "Cyberpunk 2077: Phantom Liberty",
    description: "Phantom Liberty is a new spy-thriller adventure for Cyberpunk 2077. Return as cyber-enhanced mercenary V and embark on a mission of espionage.",
    price: 2999,
    image: "/Images/games/cyberpunk.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "RPG",
    rating: 4.6,
    stock: 35
  },
  {
    _id: "g10",
    name: "Ghost of Tsushima Director's Cut",
    description: "Uncover the hidden wonders of Tsushima in this open-world action adventure. Includes the Iki Island expansion and Legends online co-op mode.",
    price: 3499,
    image: "/Images/games/ghost-of-tsushima.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "Action-Adventure",
    rating: 4.8,
    stock: 42
  },
  {
    _id: "g11",
    name: "Red Dead Redemption 2",
    description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is an epic tale of outlaw life.",
    price: 2499,
    image: "/Images/games/rdr2.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "Action-Adventure",
    rating: 4.9,
    stock: 60
  },
  {
    _id: "g12",
    name: "Mario Kart 8 Deluxe",
    description: "Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode.",
    price: 3699,
    image: "/Images/games/mario-kart.png",
    category: "Nintendo",
    platform: "Nintendo",
    genre: "Racing",
    rating: 4.7,
    stock: 55
  },
  {
    _id: "g13",
    name: "Horizon Forbidden West",
    description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats.",
    price: 3999,
    image: "/Images/games/horizon-fw.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "RPG",
    rating: 4.7,
    stock: 38
  },
  {
    _id: "g14",
    name: "Call of Duty: Modern Warfare III",
    description: "In the direct sequel to the record-breaking Modern Warfare II, Captain Price and Task Force 141 face off against the ultimate threat.",
    price: 5499,
    image: "/Images/games/mw3.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "Shooter",
    rating: 4.3,
    stock: 75
  },
  {
    _id: "g15",
    name: "Animal Crossing: New Horizons",
    description: "Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game.",
    price: 3499,
    image: "/Images/games/animal-crossing.png",
    category: "Nintendo",
    platform: "Nintendo",
    genre: "Simulation",
    rating: 4.8,
    stock: 45
  },
  {
    _id: "g16",
    name: "Resident Evil 4",
    description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy tracks the President's missing daughter.",
    price: 3999,
    image: "/Images/games/re4.png",
    category: "PlayStation",
    platform: "PlayStation",
    genre: "Survival Horror",
    rating: 4.9,
    stock: 28
  },
  {
    _id: "g17",
    name: "Super Smash Bros. Ultimate",
    description: "Gaming icons clash in the ultimate brawl you can play anytime, anywhere! Smash rivals off the stage as new characters Simon Belmont and King K. Rool join Inkling and Ridley.",
    price: 3999,
    image: "/Images/games/smash-bros.png",
    category: "Nintendo",
    platform: "Nintendo",
    genre: "Action",
    rating: 4.9,
    stock: 50
  },
  {
    _id: "g18",
    name: "Gears 5",
    description: "From one of gaming's most acclaimed sagas, Gears is bigger than ever, with five thrilling modes and the deepest campaign yet.",
    price: 1999,
    image: "/Images/games/gears-5.png",
    category: "Xbox",
    platform: "Xbox",
    genre: "Shooter",
    rating: 4.5,
    stock: 30
  }
];

const genres = ["Action-Adventure", "RPG", "FPS", "Racing", "Platformer", "Simulation", "Shooter", "Survival Horror", "Action", "Adventure"];
const categories = ["PlayStation", "Xbox", "Nintendo"];

export default function GamesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Hardcoded data usage
  const products = allGames;

  // Hero Button Logic
  const { addToCart } = useCartContext();
  const [heroAdded, setHeroAdded] = useState(false);

  const heroProduct = useMemo(() => {
    return products.find(p => p.name.includes("God of War")) || products[0];
  }, [products]);

  const handleHeroBuy = () => {
    if (heroProduct) {
        addToCart(heroProduct, 1);
        setHeroAdded(true);
        setTimeout(() => setHeroAdded(false), 2000);
    }
  };

  // Filter Logic
  const filteredGames = useMemo(() => {
    return products.filter((game) => {
      // NOTE: For hardcoded data, we use 'category' or 'platform' field. 
      // The filter UI uses "PlayStation", "Xbox", "Nintendo".
      // Our hardcoded data has matching 'category' strings.
      const platformMatch = selectedCategories.length === 0 || (game.category && selectedCategories.includes(game.category));
      
      const genreMatch = selectedGenres.length === 0 || (game.genre && selectedGenres.includes(game.genre));
      
      const priceMatch = game.price >= priceRange[0] && game.price <= priceRange[1];
      return platformMatch && genreMatch && priceMatch;
    });
  }, [selectedCategories, selectedGenres, priceRange, products]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500/30 flex flex-col">
      <SiteHeader />

      {/* Hero Section: Game Spotlight */}
      {heroProduct && (
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden border-b border-border">
        {/* Adaptive Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-blue-50 to-background dark:from-purple-900/40 dark:via-blue-900/20 dark:to-zinc-950 z-0" />
        
        {/* Background Image with adaptive opacity */}
        <div className="absolute inset-0 bg-[url('/Images/product-1.webp')] bg-cover bg-center opacity-10 dark:opacity-30 blur-sm scale-110" />
        
        <div className="container relative z-10 h-full flex items-center px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 backdrop-blur-sm">
              GAME OF THE MONTH
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-foreground italic tracking-tighter mb-4 drop-shadow-sm dark:drop-shadow-2xl">
              {heroProduct.name.toUpperCase()}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl line-clamp-2 leading-relaxed">
              {heroProduct.description}
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                onClick={handleHeroBuy}
                className={`
                  font-bold rounded-full px-8 shadow-lg shadow-purple-500/20 transition-all duration-300
                  ${heroAdded ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}
                `}
              >
                {heroAdded ? 'Added to Cart!' : 'Buy Now'}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground rounded-full gap-2 group">
                    <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-black border-zinc-800">
                  <div className="aspect-video w-full">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/hfJ4Km46A-0?autoplay=1" 
                      title="Trailer" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
      )}

      <main className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">All Games</h2>
            <Button variant="outline" onClick={() => setShowMobileFilters(!showMobileFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`
            lg:w-1/4 space-y-8
            ${showMobileFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="sticky top-24 bg-white/80 dark:bg-zinc-900/50 p-6 rounded-2xl border border-border dark:border-border/50 backdrop-blur-xl shadow-lg dark:shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-lg">Filters</h3>
              </div>

              {/* Platform Filter */}
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Platform</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`cat-${cat}`} 
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                        className="border-zinc-300 dark:border-muted-foreground/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label 
                        htmlFor={`cat-${cat}`} 
                        className="text-foreground/80 group-hover:text-foreground cursor-pointer transition-colors"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border my-6" />

               {/* Price Filter */}
               <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Price Range</h4>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[0, 6000]}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(val) => setPriceRange(val)}
                  className="py-4"
                />
              </div>

              <Separator className="bg-border my-6" />

              {/* Genre Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Genre</h4>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                       <Checkbox 
                        id={`genre-${genre}`} 
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => toggleGenre(genre)}
                        className="border-zinc-300 dark:border-muted-foreground/30 data-[state=checked]:bg-purple-600"
                      />
                      <Label htmlFor={`genre-${genre}`} className="text-xs text-foreground/70 cursor-pointer truncated hover:text-foreground transition-colors">
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6 hidden lg:flex">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400 h-6 w-6" />
                Trending Titles
              </h2>
              <span className="text-muted-foreground text-sm">{filteredGames.length} games found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <div key={game._id} className="group relative animate-in fade-in zoom-in duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                  {/* Decorative Glow - Softer in light mode */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r 
                    ${game.category === 'PlayStation' ? 'from-blue-600 to-indigo-600' : 
                      game.category === 'Xbox' ? 'from-green-600 to-emerald-600' : 
                      game.category === 'Nintendo' ? 'from-red-600 to-orange-600' : 'from-purple-600 to-pink-600'}
                    rounded-xl opacity-0 group-hover:opacity-75 dark:group-hover:opacity-75 group-hover:opacity-40 blur transition duration-500`} 
                  />
                  
                  <div className="relative h-full">
                    <ProductCard product={game} />
                  </div>
                  
                  {/* Custom Extra Badge Overlay over ProductCard if needed */}
                  <div className="absolute top-3 left-3 z-20">
                     <Badge className="bg-black/70 backdrop-blur text-white border-0 text-xs font-bold gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {game.rating}
                     </Badge>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-muted/20 rounded-3xl border border-dashed border-border">
                 <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
                 <h3 className="text-xl font-bold text-foreground">No games matched your criteria</h3>
                 <p className="text-muted-foreground mt-2">Try clearing some filters to see more results.</p>
                 <Button 
                    variant="link" 
                    onClick={() => {setSelectedCategories([]); setSelectedGenres([]); setPriceRange([0, 10000]);}}
                    className="mt-4 text-primary"
                  >
                    Clear all filters
                 </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
