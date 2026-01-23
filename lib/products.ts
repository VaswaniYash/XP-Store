import { Product } from "./types";

export const products: Product[] = [
    // ==================== CONSOLES ====================
    {
        _id: "1",
        name: "PlayStation 5 Console",
        description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
        price: 49999,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 10
    },
    {
        _id: "4",
        name: "PlayStation 5 Digital Edition",
        description: "All-digital PS5 console with no disc drive. Sign into your account for PlayStation Network and go to PlayStation Store to buy and download games. Experience the same incredible gaming performance in a sleek, compact design.",
        price: 39999,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 5
    },
    {
        _id: "7",
        name: "PlayStation 5 Slim",
        description: "The new slimmer PS5 with 1TB SSD storage. Enjoy the same powerful gaming experience in a more compact form factor. Vertical Stand sold separately.",
        price: 44999,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 8
    },
    {
        _id: "8",
        name: "PlayStation 5 Pro Bundle",
        description: "Premium PS5 bundle with extra DualSense controller and exclusive games such as Spider-Man 2 and God of War Ragnarok. The ultimate PlayStation experience for the dedicated gamer.",
        price: 59999,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 6
    },
    {
        _id: "13",
        name: "PS5 Spider-Man 2 Limited Edition",
        description: "Symbiote takeover design with custom console covers and DualSense controller. Includes Marvel's Spider-Man 2 game voucher. Experience the next level of superhero gaming.",
        price: 56990,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 3
    },
    {
        _id: "14",
        name: "PS5 Final Fantasy XVI Bundle",
        description: "Enter Valisthea with this special bundle. Includes PlayStation 5 console and Final Fantasy XVI game voucher. Embark on an epic dark fantasy journey.",
        price: 52990,
        image: "/Images/product-1.webp",
        category: "PlayStation",
        stock: 4
    },
    {
        _id: "2",
        name: "Xbox Series X",
        description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles-all games look and play best on Xbox Series X. Features 12 teraflops of processing power.",
        price: 49990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 15
    },
    {
        _id: "5",
        name: "Xbox Series S",
        description: "Go all-digital with the disc-free gaming of Xbox Series S. Get started with an instant library of over 100 high quality games with Game Pass Ultimate (membership sold separately).",
        price: 29990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 12
    },
    {
        _id: "9",
        name: "Xbox Series X Carbon Black",
        description: "Special edition Xbox Series X in stunning Carbon Black finish with 1TB SSD. Premium design meets ultimate gaming power. Experience true 4K gaming and 120 FPS.",
        price: 52990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 7
    },
    {
        _id: "10",
        name: "Xbox Series S Starter Bundle",
        description: "Xbox Series S with Game Pass Ultimate (3 months) and wireless controller. Everything you need to start your gaming journey right out of the box.",
        price: 34990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 10
    },
    {
        _id: "15",
        name: "Xbox Series X Diablo IV Bundle",
        description: "Join the endless battle between the High Heavens and the Burning Hells. Includes Xbox Series X and Diablo IV. Fight for the fate of Sanctuary.",
        price: 53990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 5
    },
    {
        _id: "16",
        name: "Xbox Series S Gilded Hunter Bundle",
        description: "Get the Gilded Hunter Pack for Fortnite, Rocket League, and Fall Guys. Includes Xbox Series S console. Stand out from the crowd with exclusive cosmetics.",
        price: 31990,
        image: "/Images/product-2.webp",
        category: "Xbox",
        stock: 8
    },
    {
        _id: "3",
        name: "Nintendo Switch OLED",
        description: "Feast your eyes on vivid colors and crisp contrast when you play on-the-go. See the difference the vibrant 7-inch OLED screen makes, whether you're racing at top speed or squaring off against enemies.",
        price: 33990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 20
    },
    {
        _id: "6",
        name: "Nintendo Switch Lite",
        description: "Dedicated to handheld play. The system for gamers on the go. Nintendo Switch Lite is a compact, lightweight addition to the Nintendo Switch family with integrated controls.",
        price: 19990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 25
    },
    {
        _id: "11",
        name: "Nintendo Switch OLED - Splatoon 3",
        description: "Special edition Nintendo Switch OLED with Splatoon 3 themed design. Vibrant colors and exclusive artwork make this a collector's item fitting for the inklings.",
        price: 36990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 15
    },
    {
        _id: "12",
        name: "Nintendo Switch Family Bundle",
        description: "Complete family gaming package with Nintendo Switch, extra Joy-Cons, and family-friendly games like Mario Kart and Nintendo Switch Sports.",
        price: 42990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 12
    },
    {
        _id: "17",
        name: "Switch Animal Crossing Edition",
        description: "Inspired by the design of Animal Crossing: New Horizons. Lovely pastel green and blue Joy-Cons and a white dock with Tom Nook and Nooklings.",
        price: 29990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 6
    },
    {
        _id: "18",
        name: "Switch Mario Red & Blue Edition",
        description: "Distinctive red and blue color scheme in honor of Mario's iconic outfit. Includes carrying case. Celebrate the history of Super Mario.",
        price: 31990,
        image: "/Images/product-3.webp",
        category: "Nintendo",
        stock: 4
    },

    // ==================== GAMES ====================
    {
        _id: "g1",
        name: "Elden Ring",
        description: "Winner of Game of the Year. An expansive fantasy world created by Hidetaka Miyazaki and George R.R. Martin.",
        price: 3999,
        image: "/Images/games/elden-ring.png",
        category: "PlayStation",
        stock: 50
    },
    {
        _id: "g2",
        name: "God of War Ragnarök",
        description: "The Santa Monica Studio presents the sequel to the critically acclaimed God of War (2018). Kratos and Atreus must journey to each of the Nine Realms.",
        price: 4999,
        image: "/Images/games/god-of-war.png",
        category: "PlayStation",
        stock: 45
    },
    {
        _id: "g3",
        name: "Halo Infinite",
        description: "The legendary Halo series returns with the most expansive Master Chief campaign yet and a ground-breaking free to play multiplayer experience.",
        price: 3999,
        image: "/Images/games/halo-infinite.png",
        category: "Xbox",
        stock: 60
    },
    {
        _id: "g4",
        name: "The Legend of Zelda: Tears of the Kingdom",
        description: "In this sequel to the Legend of Zelda: Breath of the Wild, you'll decide your own path through the sprawling landscapes of Hyrule.",
        price: 4999,
        image: "/Images/games/zelda-totk.png",
        category: "Nintendo",
        stock: 80
    },
    {
        _id: "g5",
        name: "Marvel's Spider-Man 2",
        description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city.",
        price: 4999,
        image: "/Images/games/spiderman-2.png",
        category: "PlayStation",
        stock: 50
    },
    {
        _id: "g6",
        name: "Forza Horizon 5",
        description: "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action.",
        price: 3999,
        image: "/Images/games/forza.png",
        category: "Xbox",
        stock: 55
    },
    {
        _id: "g7",
        name: "Super Mario Odyssey",
        description: "Explore incredible places far from the Mushroom Kingdom as you join Mario and his new ally Cappy on a massive, globe-trotting 3D adventure.",
        price: 3999,
        image: "/Images/games/mario-odyssey.png",
        category: "Nintendo",
        stock: 65
    },
    {
        _id: "g8",
        name: "Starfield",
        description: "In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.",
        price: 4499,
        image: "/Images/games/starfield.png",
        category: "Xbox",
        stock: 40
    },
    {
        _id: "g9",
        name: "Cyberpunk 2077: Phantom Liberty",
        description: "Phantom Liberty is a new spy-thriller adventure for Cyberpunk 2077. Return as cyber-enhanced mercenary V and embark on a mission of espionage.",
        price: 2999,
        image: "/Images/games/cyberpunk.png",
        category: "PlayStation",
        stock: 35
    },
    {
        _id: "g10",
        name: "Ghost of Tsushima Director's Cut",
        description: "Uncover the hidden wonders of Tsushima in this open-world action adventure. Includes the Iki Island expansion and Legends online co-op mode.",
        price: 3499,
        image: "/Images/games/ghost-of-tsushima.png",
        category: "PlayStation",
        stock: 42
    },
    {
        _id: "g11",
        name: "Red Dead Redemption 2",
        description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is an epic tale of outlaw life.",
        price: 2499,
        image: "/Images/games/rdr2.png",
        category: "Xbox",
        stock: 60
    },
    {
        _id: "g12",
        name: "Mario Kart 8 Deluxe",
        description: "Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode.",
        price: 3699,
        image: "/Images/games/mario-kart.png",
        category: "Nintendo",
        stock: 55
    },
    {
        _id: "g13",
        name: "Horizon Forbidden West",
        description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats.",
        price: 3999,
        image: "/Images/games/horizon-fw.png",
        category: "PlayStation",
        stock: 38
    },
    {
        _id: "g14",
        name: "Call of Duty: Modern Warfare III",
        description: "In the direct sequel to the record-breaking Modern Warfare II, Captain Price and Task Force 141 face off against the ultimate threat.",
        price: 5499,
        image: "/Images/games/mw3.png",
        category: "Xbox",
        stock: 75
    },
    {
        _id: "g15",
        name: "Animal Crossing: New Horizons",
        description: "Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game.",
        price: 3499,
        image: "/Images/games/animal-crossing.png",
        category: "Nintendo",
        stock: 45
    },
    {
        _id: "g16",
        name: "Resident Evil 4",
        description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy tracks the President's missing daughter.",
        price: 3999,
        image: "/Images/games/re4.png",
        category: "PlayStation",
        stock: 28
    },
    {
        _id: "g17",
        name: "Super Smash Bros. Ultimate",
        description: "Gaming icons clash in the ultimate brawl you can play anytime, anywhere! Smash rivals off the stage as new characters Simon Belmont and King K. Rool join Inkling and Ridley.",
        price: 3999,
        image: "/Images/games/smash-bros.png",
        category: "Nintendo",
        stock: 50
    },
    {
        _id: "g18",
        name: "Gears 5",
        description: "From one of gaming's most acclaimed sagas, Gears is bigger than ever, with five thrilling modes and the deepest campaign yet.",
        price: 1999,
        image: "/Images/games/gears-5.png",
        category: "Xbox",
        stock: 30
    },

    // ==================== ACCESSORIES ====================
    // Controllers
    {
        _id: "a1",
        name: "DualSense Wireless Controller - Cosmic Red",
        description: "Experience haptic feedback and adaptive triggers in a stunning cosmic red finish. Compatible with PS5.",
        price: 5999,
        image: "/Images/accessories/controller.png",
        category: "Controllers",
        stock: 30
    },
    {
        _id: "a2",
        name: "Xbox Wireless Controller - Electric Volt",
        description: "Textured grip, hybrid D-pad, and Bluetooth connectivity. Vibrant electric volt color for Xbox Series X|S and PC.",
        price: 5499,
        image: "/Images/accessories/controller.png",
        category: "Controllers",
        stock: 35
    },
    {
        _id: "a3",
        name: "Nintendo Switch Pro Controller",
        description: "Premium controller with motion controls, HD rumble, and built-in amiibo functionality for Nintendo Switch.",
        price: 5999,
        image: "/Images/accessories/controller.png",
        category: "Controllers",
        stock: 25
    },
    {
        _id: "a4",
        name: "DualSense Charging Station",
        description: "Charge up to two DualSense controllers simultaneously with this official PlayStation charging dock.",
        price: 2499,
        image: "/Images/accessories/charging.png",
        category: "Controllers",
        stock: 40
    },

    // Headsets
    {
        _id: "a5",
        name: "PlayStation 5 Pulse 3D Wireless Headset",
        description: "Fine-tuned for 3D Audio on PS5. Dual noise-cancelling microphones and up to 12 hours of wireless play.",
        price: 8999,
        image: "/Images/accessories/headset.png",
        category: "Headsets",
        stock: 20
    },
    {
        _id: "a6",
        name: "Xbox Wireless Headset",
        description: "Supports spatial sound technologies including Windows Sonic, Dolby Atmos, and DTS Headphone:X.",
        price: 8499,
        image: "/Images/accessories/headset.png",
        category: "Headsets",
        stock: 22
    },
    {
        _id: "a7",
        name: "SteelSeries Arctis 7+ Wireless",
        description: "Premium multi-platform gaming headset with 30+ hour battery life. Works with PlayStation, Xbox, Switch, and PC.",
        price: 12999,
        image: "/Images/accessories/headset.png",
        category: "Headsets",
        stock: 15
    },
    {
        _id: "a8",
        name: "HyperX Cloud II Gaming Headset",
        description: "Legendary comfort and sound quality. 7.1 surround sound and noise-cancelling microphone.",
        price: 7999,
        image: "/Images/accessories/headset.png",
        category: "Headsets",
        stock: 28
    },

    // Storage
    {
        _id: "a9",
        name: "Seagate 2TB Game Drive for PS5",
        description: "Officially licensed external HDD for PS5. Store and play PS4 games, archive PS5 games.",
        price: 6999,
        image: "/Images/accessories/storage.png",
        category: "Storage",
        stock: 18
    },
    {
        _id: "a10",
        name: "WD_BLACK 1TB SSD for Xbox Series X|S",
        description: "Officially licensed NVMe SSD expansion card. Plug and play, identical performance to internal storage.",
        price: 14999,
        image: "/Images/accessories/storage.png",
        category: "Storage",
        stock: 12
    },
    {
        _id: "a11",
        name: "SanDisk 512GB microSD for Nintendo Switch",
        description: "Officially licensed microSDXC card. Transfer speeds up to 100MB/s for fast game loading.",
        price: 4999,
        image: "/Images/accessories/storage.png",
        category: "Storage",
        stock: 45
    },
    {
        _id: "a12",
        name: "Samsung 980 PRO 2TB NVMe SSD",
        description: "Compatible with PS5 internal expansion. PCIe 4.0 speeds up to 7,000 MB/s. Includes heatsink.",
        price: 18999,
        image: "/Images/accessories/storage.png",
        category: "Storage",
        stock: 10
    },

    // Protection
    {
        _id: "a13",
        name: "dbrand PS5 Darkplates",
        description: "Premium matte black replacement panels for PS5. Precision-cut with perfect fit and finish.",
        price: 4999,
        image: "/Images/accessories/protection.png",
        category: "Protection",
        stock: 25
    },
    {
        _id: "a14",
        name: "Nintendo Switch OLED Screen Protector",
        description: "Tempered glass screen protector with 9H hardness. Crystal clear with oleophobic coating.",
        price: 999,
        image: "/Images/accessories/protection.png",
        category: "Protection",
        stock: 60
    },
    {
        _id: "a15",
        name: "Nintendo Switch Carrying Case - Deluxe",
        description: "Official Nintendo carrying case with game card slots and adjustable viewing stand.",
        price: 1999,
        image: "/Images/accessories/protection.png",
        category: "Protection",
        stock: 35
    },
    {
        _id: "a16",
        name: "Controller Skin Set - Carbon Fiber",
        description: "Premium vinyl skins for PlayStation, Xbox, or Nintendo controllers. Easy application, no residue.",
        price: 1499,
        image: "/Images/accessories/protection.png",
        category: "Protection",
        stock: 50
    },

    // Charging
    {
        _id: "a17",
        name: "PowerA Dual Charging Station for Xbox",
        description: "Charge two Xbox controllers simultaneously. Includes two rechargeable battery packs.",
        price: 2999,
        image: "/Images/accessories/charging.png",
        category: "Charging",
        stock: 30
    },
    {
        _id: "a18",
        name: "Anker USB-C Cable 10ft - Gaming Edition",
        description: "Braided USB-C cable for controllers and devices. 10ft length for comfortable gaming while charging.",
        price: 1299,
        image: "/Images/accessories/charging.png",
        category: "Charging",
        stock: 55
    },
    {
        _id: "a19",
        name: "Nintendo Switch Charging Dock",
        description: "Compact charging dock for Nintendo Switch. Supports TV mode with HDMI output.",
        price: 2499,
        image: "/Images/accessories/charging.png",
        category: "Charging",
        stock: 28
    },
    {
        _id: "a20",
        name: "Multi-Console Charging Tower",
        description: "Universal charging station for PlayStation, Xbox, and Nintendo controllers. LED indicators included.",
        price: 3999,
        image: "/Images/accessories/charging.png",
        category: "Charging",
        stock: 20
    },

    // Streaming
    {
        _id: "a21",
        name: "Elgato HD60 S+ Capture Card",
        description: "Stream and record in 1080p60 or 4K30 HDR10. Zero-lag passthrough for seamless gameplay.",
        price: 16999,
        image: "/Images/accessories/streaming.png",
        category: "Streaming",
        stock: 8
    },
    {
        _id: "a22",
        name: "Logitech C920 HD Pro Webcam",
        description: "Full HD 1080p streaming camera. Perfect for streaming, video calls, and content creation.",
        price: 6999,
        image: "/Images/accessories/streaming.png",
        category: "Streaming",
        stock: 15
    },
    {
        _id: "a23",
        name: "Blue Yeti USB Microphone",
        description: "Professional USB microphone for streaming and recording. Four pickup patterns for versatility.",
        price: 10999,
        image: "/Images/accessories/streaming.png",
        category: "Streaming",
        stock: 12
    },
    {
        _id: "a24",
        name: "Elgato Stream Deck",
        description: "15 customizable LCD keys for controlling your stream. One-touch operation for scenes, media, and more.",
        price: 12999,
        image: "/Images/accessories/streaming.png",
        category: "Streaming",
        stock: 10
    },
];
