"use client";

import { CheckCircle } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Pro Gamer",
    initials: "AC",
    avatarColor: "from-cyan-500 to-blue-600",
    text: "XP Store is hands down the best place to get limited edition consoles. The delivery was super fast, and the packaging was premium. My PS5 arrived in perfect condition!",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Streamer",
    initials: "SJ",
    avatarColor: "from-purple-500 to-pink-600",
    text: "I love the variety of accessories available here. The exclusive controllers are a game-changer for my streams. Highly recommend checking out their new arrivals!",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Collector",
    initials: "MJ",
    avatarColor: "from-orange-500 to-red-600",
    text: "Great selection of retro games and modern titles. The customer service team was very helpful when I had a question about compatibility. Solid experience overall.",
  },
];

export function CustomerReviews() {
  return (
    <section className="py-20 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Trusted by Gamers
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Hear from the gaming professionals who rely on XP Store every day.
          </p>
        </div>

        {/* Terminal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <TerminalCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
      {/* Terminal Window Header with controls */}
      <div className="bg-zinc-950/50 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {review.initials}
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">
              {review.name}
            </h4>
            <p className="text-sm text-cyan-400 font-medium">
              {review.role}
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="relative">
          <p className="text-zinc-300 leading-relaxed italic">
            "{review.text}"
          </p>
        </div>
      </div>
    </div>
  );
}
