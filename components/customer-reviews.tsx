"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Pro Gamer",
    avatar: "/Images/avatar-1.webp", // Placeholder, will handle fallback
    rating: 5,
    text: "XP Store is hands down the best place to get limited edition consoles. The delivery was super fast, and the packaging was premium. My PS5 arrived in perfect condition!",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Streamer",
    avatar: "/Images/avatar-2.webp",
    rating: 5,
    text: "I love the variety of accessories available here. The exclusive controllers are a game-changer for my streams. Highly recommend checking out their new arrivals!",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Collector",
    avatar: "/Images/avatar-3.webp",
    rating: 4,
    text: "Great selection of retro games and modern titles. The customer service team was very helpful when I had a question about compatibility. Solid experience overall.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Casual Gamer",
    avatar: "/Images/avatar-4.webp",
    rating: 5,
    text: "The 'Featured Collection' really helped me pick a gift for my brother. He loved the headset! The quality is amazing and the price was unbeatable.",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Tech Reviewer",
    avatar: "/Images/avatar-5.webp",
    rating: 5,
    text: "As a tech reviewer, I'm picky about where I buy gear. XP Store consistently delivers authentic products. Their warranty process is also straightforward and reassuring.",
  },
  {
    id: 6,
    name: "Jessica Lee",
    role: "Esports Coach",
    avatar: "/Images/avatar-6.webp",
    rating: 5,
    text: "Equipping my team has never been easier. Bulk orders are handled professionally, and the gear quality gives us that competitive edge we need.",
  },
];

export function CustomerReviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-background to-accent/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute -left-20 top-40 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from our community of gamers, collectors, and pros about their XP Store experience.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1 (First 3 reviews) */}
            <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Slide 2 (Next 3 reviews) */}
            <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {reviews.slice(3, 6).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 0 ? "w-8 bg-primary" : "w-3 bg-muted hover:bg-primary/50"
            }`}
            aria-label="Go to slide 1"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 1 ? "w-8 bg-primary" : "w-3 bg-muted hover:bg-primary/50"
            }`}
            aria-label="Go to slide 2"
          />
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group h-full flex flex-col">
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < review.rating ? "fill-yellow-500 text-yellow-500" : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>

      <div className="relative flex-1">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10 transform -scale-x-100" />
        <p className="text-foreground/90 leading-relaxed italic relative z-10 pl-4">
          "{review.text}"
        </p>
      </div>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg overflow-hidden border border-white/10">
          {/* Fallback to initials if no image (using initials for now as no real images) */}
          {review.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {review.name}
          </h4>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}
