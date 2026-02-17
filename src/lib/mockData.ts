import { CalendarItem, KOL, Plan, ClassItem, VideoTutorial, FAQItem, TourStep } from "@/types";

export const TOUR_STEPS: Record<string, TourStep[]> = {
    planner: [
        { targetId: "inp-business-name", title: "1. Profil Bisnis", desc: "AI butuh konteks. Isi nama bisnis Anda di sini.", position: "bottom" },
        { targetId: "btn-generate-plan", title: "2. Generate Jadwal", desc: "Satu klik untuk membuat kalender konten sebulan penuh.", position: "top" }
    ],
    generator: [
        { targetId: "gen-prompt-area", title: "1. Studio Kreatif", desc: "Deskripsikan visual atau pilih gaya yang diinginkan.", position: "top" },
        { targetId: "gen-style-select", title: "2. Gaya Visual", desc: "Pilih gaya (Cinematic, 3D, dll) agar hasil lebih pro.", position: "bottom" }
    ],
    livestream: [
        { targetId: "live-preview", title: "1. Preview Stream", desc: "Tampilan avatar AI Anda saat live.", position: "right" },
        { targetId: "live-products", title: "2. Produk Unggulan", desc: "Pin produk agar muncul di layar penonton.", position: "left" }
    ],
    kol: [
        { targetId: "kol-filter", title: "1. Smart Filter", desc: "Cari KOL berdasarkan budget (Micro/Macro) dan kategori.", position: "bottom" },
        { targetId: "kol-list", title: "2. Database KOL", desc: "Pilih influencer yang sudah terverifikasi.", position: "top" }
    ]
};

export const MOCK_KOLS: KOL[] = [
    { id: 1, name: "Sasa Kuliner", handle: "@sasaeats", category: "F&B", followers: "45K", er: "5.2%", price: 350000, tags: ["Micro", "Halal"], verified: true },
    { id: 2, name: "OOTD Budi", handle: "@budistyle", category: "Fashion", followers: "120K", er: "3.8%", price: 1200000, tags: ["Macro", "Style"], verified: true },
    { id: 3, name: "Gadget Rina", handle: "@rinatech", category: "Technology", followers: "25K", er: "8.5%", price: 500000, tags: ["Nano", "Review"], verified: false },
    { id: 4, name: "Mama Dapur", handle: "@mamacooks", category: "F&B", followers: "80K", er: "4.1%", price: 750000, tags: ["Micro", "Resep"], verified: true },
    { id: 5, name: "Fit with Andi", handle: "@andifit", category: "Health", followers: "200K", er: "2.9%", price: 2500000, tags: ["Macro", "Gym"], verified: true },
    { id: 6, name: "Travel Santuy", handle: "@santuytrip", category: "Travel", followers: "60K", er: "6.0%", price: 900000, tags: ["Micro", "Trip"], verified: false },
];

export const PLANS: Plan[] = [
    { name: "Gratis", price: "Rp 0", period: "", features: ["1 gambar/hari", "Konsultasi AI"], highlight: false, color: "border-slate-200 dark:border-white/10" },
    { name: "Starter", price: "Rp 150rb", period: "/bln", features: ["15 gambar/bln", "Logo Generator"], highlight: true, tag: "Paling Populer", color: "border-brand" },
    { name: "Pro", price: "Rp 250rb", period: "/bln", features: ["Unlimited Gambar", "Viral Strategy"], highlight: false, color: "border-slate-200 dark:border-white/10" },
    { name: "Specialist", price: "Rp 1.2jt", period: "/bln", features: ["Auto-Posting", "Audit AI"], highlight: false, tag: "Vibe Marketing", color: "border-yellow-500" }
];

export const ALACARTE_FEATURES = [
    { id: 'f1', name: 'Unlimited AI Image', price: 50000 },
    { id: 'f2', name: 'Viral Predictor', price: 35000 },
    { id: 'f3', name: 'Competitor Spy', price: 75000 },
    { id: 'f4', name: 'Auto-Posting Bot', price: 100000 },
];

export const MOCK_CALENDAR: CalendarItem[] = [
    { day: 1, title: 'Behind the Scene', category: 'Awareness', desc: 'Tunjukkan proses pembuatan produk.' },
    { day: 2, title: 'Testimoni Pelanggan', category: 'Social Proof', desc: 'Repost story pelanggan yang puas.' },
    { day: 3, title: 'Tips & Trik', category: 'Education', desc: 'Bagikan cara penggunaan produk.' },
];

export const MOCK_CLASSES: ClassItem[] = [
    { id: 1, title: "Jago Jualan di TikTok Shop", mentor: "Coach Rian", role: "TikTok Expert", date: "25 Nov", time: "19:00", rating: 4.9, students: 1250, price: "Gratis", image: "bg-brand" },
    { id: 2, title: "Fotografi Produk Modal HP", mentor: "Siska Visuals", role: "Photographer", date: "26 Nov", time: "10:00", rating: 4.8, students: 850, price: "Rp 50.000", image: "bg-blue-600" },
    { id: 3, title: "AI untuk Copywriting Kilat", mentor: "Dr. Prompt", role: "AI Specialist", date: "28 Nov", time: "15:00", rating: 5.0, students: 2100, price: "Rp 75.000", image: "bg-sky-600" },
    { id: 4, title: "Financial Planning UMKM", mentor: "Budi Cuan", role: "Financial Advisor", date: "30 Nov", time: "13:00", rating: 4.7, students: 600, price: "Gratis", image: "bg-green-600" },
];

export const MOCK_TUTORIALS: VideoTutorial[] = [
    { id: 'v1', title: 'Cara Riset Kompetitor dalam 3 Menit', duration: '03:45', thumbnail: 'from-brand to-blue-900', views: '12K' },
    { id: 'v2', title: 'Prompt Engineering untuk Foto Makanan', duration: '05:12', thumbnail: 'from-sky-600 to-blue-900', views: '8.5K' },
    { id: 'v3', title: 'Setup Live Streaming Pertama', duration: '04:20', thumbnail: 'from-blue-600 to-brand', views: '15K' },
];

export const MOCK_FAQ: FAQItem[] = [
    { q: 'Apakah hasil gambar AI bebas copyright?', a: 'Ya, semua gambar yang dihasilkan oleh Generator PLUS bebas royalti dan milik Anda sepenuhnya untuk keperluan komersial.' },
    { q: 'Bagaimana cara AI menentukan jadwal posting?', a: 'AI menganalisis tren industri Anda dan perilaku audiens target (misal: Gen Z aktif malam hari) untuk menyarankan waktu terbaik.' },
    { q: 'Apakah saya bisa membatalkan langganan?', a: 'Tentu saja. Anda bisa membatalkan kapan saja melalui menu Settings, tanpa biaya tambahan.' },
];
