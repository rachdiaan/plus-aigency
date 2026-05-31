export type Language = "en" | "id";

export const translations = {
  en: {
    /* ── Navbar ── */
    navbar: {
      about: "About",
      products: "Products",
      aiFeatures: "AI Features",
      pricing: "Pricing",
      home: "Home",
      contactUs: "Contact Us",
      viewPricing: "View Pricing",
      ourProducts: "Our Products",
      viewAllProducts: "View All Products",
      new: "New",
      // Product dropdown descriptions
      productLabels: {
        aiChatBot: "AI Chat Bot",
        customerSupport: "Customer Support",
        mobileApp: "Mobile App",
        crmPlatform: "CRM Platform",
        digitalAgency: "Digital Agency",
        mobileGame: "Mobile Game",
      },
      productItems: {
        aiChatBot: "Smart AI-powered chatbot",
        customerSupport: "Smarter support decisions",
        mobileApp: "Mobile-first experiences",
        crmPlatform: "Client management tools",
        digitalAgency: "Full-service digital solutions",
        mobileGame: "Immersive gaming experiences",
      },
    },

    /* ── Hero ── */
    hero: {
      badge: "Indonesia\u2019s No.1 Digital AI-gency",
      heading1: "Build Smarter Brands.",
      heading2: "Faster.",
      subtitle: "With AI + Human Creativity",
      description:
        "One integrated platform for brands that want to move fast, stay consistent, and still look premium \u2014 powered by AI and real creative minds.",
      ctaPrimary: "See How It Works",
      ctaSecondary: "View Pricing",
    },

    /* ── About ── */
    about: {
      badge: "About Plus",
      heading1: "Driven by",
      heading2: "Innovation",
      description:
        "plus. is a forward-thinking IT solutions provider dedicated to empowering businesses through innovative technology and tailored services. We bridge the gap between technology and business needs, providing solutions that enhance efficiency and drive growth.",
      statAI: "AI+",
      statAILabel: "Powered",
      statProducts: "6+",
      statProductsLabel: "Products",
      statTools: "5+",
      statToolsLabel: "AI Tools",
    },

    /* ── Features / Products ── */
    features: {
      badge: "Our Products",
      popularBadge: "Popular",
      newBadge: "New",
      heading: "AI Products That Empower",
      description:
        "Accelerating progress in artificial intelligence \u2014 innovative solutions designed to empower your business and enhance efficiency.",
      products: [
        {
          title: "AI Chat Bot",
          description:
            "Your smartest AI chatbot \u2014 always ready to assist. Experience seamless conversations, instant answers, and 24/7 support for your customers.",
        },
        {
          title: "Customer Support",
          description:
            "Smart tools for smarter customer support decisions. Enhance operations with tailored solutions that meet unique client needs.",
        },
        {
          title: "Mobile App",
          description:
            "Mobile magic \u2014 empowering businesses through technology. We develop & create digital experiences that drive growth.",
        },
        {
          title: "CRM Platform",
          description:
            "Empower your business with our CRM technology. Enhancing operations, managing clients, and driving sustainable growth.",
        },
        {
          title: "Digital Agency",
          description:
            "Full-service digital agency for brands that want to grow. From strategy to execution, we craft tailored digital solutions.",
        },
        {
          title: "Mobile Game",
          description:
            "Engaging mobile game development that captivates players. From concept to launch, we build immersive gaming experiences.",
        },
      ],
    },

    /* ── AI Features ── */
    aiFeatures: {
      badge: "AI Features",
      heading: "Powered by Artificial Intelligence",
      description:
        "From image generation to music creation \u2014 our AI tools help you build smarter and faster.",
      items: [
        {
          title: "AI Image Generator",
          description:
            "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion and Stability AI \u2014 100+ models combined.",
        },
        {
          title: "AI Text Generator",
          description:
            "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
        },
        {
          title: "AI Chat Bot",
          description:
            "Personal AI Chat Bot \u2014 cost-effective, 24/7 availability, and flexible. Seamless conversations and instant answers for any need.",
        },
        {
          title: "AI Video Generator",
          description:
            "AI video that works while you sleep. Text-to-Video generation for seamless integration and engaging multimedia content.",
        },
        {
          title: "AI Music Generator",
          description:
            "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
        },
      ],
      servicesBadge: "IT Solutions",
      servicesHeading: "Digital Strategies That Drive Growth",
      services: [
        {
          title: "Cloud Solutions",
          description:
            "Tailored cloud services to enhance your business operations and scalability.",
        },
        {
          title: "Marketing Solutions",
          description:
            "Customized marketing strategies that yield impactful results and drive engagement.",
        },
        {
          title: "Innovative Solutions",
          description:
            "Cutting-edge services that enable businesses to excel in the digital realm.",
        },
      ],
    },

    /* ── Pricing ── */
    pricing: {
      badge: "Pricing",
      heading: "Choose the Right Plan for You",
      description:
        "Simple, transparent pricing that grows with your business.",
      monthly: "Monthly",
      annual: "Annual",
      recommended: "Recommended",
      whatsIncluded: "What\u2019s included",
      choosePlan: "Choose Plan",
      perMonth: "/month",
      monthlyPlans: [
        {
          name: "Starter",
          description: "Best for getting started",
          features: [
            "Explore our diverse offerings",
            "Innovative tech solutions",
            "Tailored service packages",
            "Flexible payment plans",
          ],
        },
        {
          name: "Professional",
          description: "Most popular choice",
          features: [
            "Comprehensive features included",
            "Innovative tech solutions",
            "Tailored digital strategies",
            "Comprehensive support services",
          ],
        },
        {
          name: "Premium",
          description: "For large-scale operations",
          features: [
            "Innovative tech solutions",
            "Tailored for you",
            "Tailored solutions for every need",
            "Transparent pricing with no surprises",
          ],
        },
      ],
      annualPlans: [
        {
          name: "Basic",
          description: "Best for getting started",
          features: [
            "Comprehensive IT support",
            "Tailored solutions available",
            "Innovative IT solutions",
            "Tailored service packages",
          ],
        },
        {
          name: "Professional",
          description: "Most popular choice",
          features: [
            "Innovative IT solutions",
            "Tailored service plans",
            "Innovative IT solutions",
            "Tailored service packages",
          ],
        },
        {
          name: "Premium",
          description: "For large-scale operations",
          features: [
            "Empowering your business",
            "Innovative solutions offered",
            "Tailored for your needs",
            "Transparent pricing",
          ],
        },
      ],
    },

    /* ── FAQ ── */
    faq: {
      badge: "FAQ",
      heading: "Frequently Asked Questions",
      description:
        "Everything you need to know about plus. and our services.",
      items: [
        {
          question: "What services does plus. provide?",
          answer:
            "plus. specializes in AI-powered digital solutions including Chat Bot, Customer Support tools, Mobile App development, CRM platforms, Digital Agency services, and Mobile Game development. We also offer cloud solutions, cybersecurity services, and digital marketing.",
        },
        {
          question: "What AI features are available on the platform?",
          answer:
            "We offer 5 AI-powered tools: AI Image Generator (with 100+ models from OpenAI, Stable Diffusion & Stability AI), AI Text Generator, Personal AI Chat Bot, AI Video Generator, and AI Music Generator \u2014 all designed to help you build smarter and faster.",
        },
        {
          question: "What pricing plans do you offer?",
          answer:
            "We offer flexible monthly and annual plans. Monthly: Starter ($25), Professional ($50, recommended), and Premium ($500). Annual plans are also available with adjusted pricing. We also offer Service Plus packages starting at $45 for installation up to $699 for full website packages.",
        },
        {
          question: "How can I reach plus. for support?",
          answer:
            "You can reach us via email at support@plusthe.site or through our Contact Us page. Our team is dedicated to providing innovative solutions and exceptional customer support to meet your unique business needs.",
        },
        {
          question:
            "Do you offer customization and website development?",
          answer:
            "Yes! Our Service Plus packages include theme installation ($45), ready-to-use website setup with content replacement up to 6 pages ($469), and full website package with SEO & speed optimization ($699). All packages include professional customization.",
        },
      ],
    },

    /* ── Page: Customer Support ── */
    customerSupportPage: {
      heroBadge: "Customer Support",
      heroHeading1: "Support That",
      heroHeading2: "Never Sleeps",
      heroDesc: "Smarter decisions, faster resolutions, happier customers. AI-powered support platform that scales with your business.",
      heroCta1: "Get Started Free",
      heroCta2: "Book a Demo",
      featuresBadge: "Features",
      featuresHeading: "Everything You Need to\nDelight Customers",
      featuresDesc: "A complete support ecosystem from ticket management to AI automation — all in one platform.",
      features: [
        { title: "24/7 Live Support", desc: "Round-the-clock assistance from our expert team. Never leave your customers waiting — resolve issues instantly, any time of day." },
        { title: "Smart Ticketing", desc: "AI-powered ticket routing, priority classification, and auto-assignment. Watch resolution times drop by up to 60%." },
        { title: "Omni-Channel Chat", desc: "Unified inbox across WhatsApp, Instagram, email, and web chat. One dashboard, every conversation." },
        { title: "Knowledge Base", desc: "Self-service portal with AI-suggested articles. Reduce support volume while empowering customers to find answers fast." },
        { title: "Analytics Dashboard", desc: "Real-time metrics on CSAT, response time, and agent performance. Data-driven decisions for continuous improvement." },
        { title: "AI Auto-Replies", desc: "Intelligent chatbot handles common inquiries automatically. Seamless handoff to human agents when needed." },
      ],
      stats: [
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "< 30s", label: "Avg Response Time" },
        { value: "50K+", label: "Tickets Resolved" },
        { value: "4.9/5", label: "Customer Rating" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Loved by Support Teams",
      testimonials: [
        { quote: "Switching to PLUS Customer Support cut our response time in half. Our customers noticed immediately.", name: "Sarah Chen", role: "Head of CX, TechFlow" },
        { quote: "The AI auto-replies handle 40% of our tickets automatically. Our team focuses on complex issues that really matter.", name: "Ahmad Rizki", role: "Support Lead, Tokoline" },
        { quote: "The omni-channel inbox is a game-changer. No more switching between apps — everything in one place.", name: "Maya Putri", role: "Operations Manager, ShopEase" },
      ],
      ctaHeading1: "Ready to Transform Your",
      ctaHeading2: "Customer Support?",
      ctaDesc: "Join thousands of businesses delivering exceptional support experiences.",
      ctaCta1: "Start Free Trial",
      ctaCta2: "Contact Sales",
    },

    /* ── Page: Mobile App ── */
    mobileAppPage: {
      heroBadge: "Mobile App",
      heroHeading1: "Mobile-First",
      heroHeading2: "Experiences",
      heroDesc: "Beautiful, performant mobile apps that users love. From concept to App Store — we handle the entire journey.",
      heroCta1: "Start Your Project",
      heroCta2: "View Portfolio",
      featuresBadge: "Capabilities",
      featuresHeading: "Everything for\nModern Mobile Apps",
      featuresDesc: "Enterprise-grade features with startup speed. Build apps that scale from day one.",
      features: [
        { title: "Cross-Platform", desc: "Build once, deploy everywhere. Native performance on iOS and Android from a single codebase using React Native and Flutter." },
        { title: "Smart Notifications", desc: "AI-driven push notifications that reach users at the perfect moment. Boost engagement with personalized, timely alerts." },
        { title: "Offline-First", desc: "Full functionality even without connection. Automatic sync when back online — your users never miss a beat." },
        { title: "Lightning Fast", desc: "60fps animations, instant load times, and smooth transitions. Performance that users can feel on every interaction." },
        { title: "Enterprise Security", desc: "End-to-end encryption, biometric auth, and compliance-ready architecture. Your data stays protected at every layer." },
        { title: "Built-in Analytics", desc: "Track user behavior, retention funnels, and feature adoption. Make data-driven decisions to grow your app." },
      ],
      stats: [
        { value: "200+", label: "Apps Delivered" },
        { value: "5M+", label: "Downloads" },
        { value: "4.8★", label: "Avg Store Rating" },
        { value: "12", label: "Countries Served" },
      ],
      testimonialsBadge: "Success Stories",
      testimonialsHeading: "Built for Real Businesses",
      testimonials: [
        { quote: "PLUS built our app in record time. The cross-platform approach saved us months of development and thousands in costs.", name: "David Park", role: "CTO, FitTrack" },
        { quote: "The offline-first architecture was exactly what we needed for our field service app. Our technicians love it.", name: "Rina Sari", role: "Product Manager, FieldPro" },
        { quote: "From 3.2 to 4.8 stars on the App Store after the redesign. The performance improvements were night and day.", name: "Jason Lee", role: "Founder, QuickBite" },
      ],
      ctaHeading1: "Ready to Build Your",
      ctaHeading2: "Dream App?",
      ctaDesc: "From idea to App Store — let's bring your mobile vision to life.",
      ctaCta1: "Get a Quote",
      ctaCta2: "Schedule a Call",
    },

    /* ── Page: CRM ── */
    crmPage: {
      heroBadge: "CRM Platform",
      heroHeading1: "Sell Smarter,",
      heroHeading2: "Close Faster",
      heroDesc: "AI-powered CRM that turns leads into loyal customers. Automate workflows, track every deal, and grow revenue predictably.",
      heroCta1: "Start Free Trial",
      heroCta2: "Watch Demo",
      featuresBadge: "Features",
      featuresHeading: "Your Complete\nSales Toolkit",
      featuresDesc: "From first contact to closed deal — manage every step of your sales journey in one platform.",
      features: [
        { title: "Sales Pipeline", desc: "Visual drag-and-drop pipeline management. Track deals from lead to close with real-time stage updates and probability scoring." },
        { title: "Contact Management", desc: "360° customer profiles with interaction history, social data, and AI-enriched insights. Know every client like a close friend." },
        { title: "AI Lead Scoring", desc: "Machine learning algorithms rank your leads by conversion probability. Focus your team on deals most likely to close." },
        { title: "Workflow Automation", desc: "Automate follow-ups, task assignments, and data entry. Eliminate repetitive work so your team sells more." },
        { title: "Email Integration", desc: "Two-way email sync with Gmail and Outlook. Track opens, clicks, and replies — all from within your CRM." },
        { title: "Revenue Analytics", desc: "Forecasting dashboards, win/loss analysis, and team performance metrics. Data-backed decisions for predictable growth." },
      ],
      stats: [
        { value: "35%", label: "More Closed Deals" },
        { value: "10K+", label: "Active Users" },
        { value: "2.5M", label: "Contacts Managed" },
        { value: "98%", label: "Customer Retention" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Trusted by Sales Teams",
      testimonials: [
        { quote: "Our sales cycle shortened by 40% after implementing PLUS CRM. The AI lead scoring alone was worth the switch.", name: "Michael Torres", role: "VP of Sales, CloudSync" },
        { quote: "Finally, a CRM that doesn't require a PhD to use. Our entire team was onboarded in less than a day.", name: "Dian Permata", role: "Sales Director, Indocommerce" },
        { quote: "The automation features save us 15 hours per week in manual data entry. That's time we spend actually selling.", name: "Alex Wijaya", role: "Founder, SalesBridge" },
      ],
      ctaHeading1: "Ready to Supercharge",
      ctaHeading2: "Your Sales?",
      ctaDesc: "Join 10,000+ businesses growing faster with PLUS CRM.",
      ctaCta1: "Start Free Trial",
      ctaCta2: "Contact Sales",
    },

    /* ── Page: AI Image Generator ── */
    aiImagePage: {
      heroBadge: "AI Image Generator",
      heroHeading1: "Imagine It,",
      heroHeading2: "Create It",
      heroDesc: "Create beautiful art with artificial intelligence. Three APIs integrated: OpenAI, Stable Diffusion, and Stability AI — 100+ models combined.",
      heroCta1: "Try Generator Free",
      heroCta2: "View Pricing",
      featuresBadge: "Capabilities",
      featuresHeading: "Create Without\nLimits",
      featuresDesc: "Professional-grade image tools powered by the world's best AI models.",
      features: [
        { title: "Text to Image", desc: "Describe what you imagine and watch it come to life. Powered by OpenAI, Stable Diffusion, and Stability AI — 100+ models combined." },
        { title: "Style Transfer", desc: "Transform any image into different artistic styles — oil painting, watercolor, anime, photorealistic, and dozens more." },
        { title: "Smart Upscale", desc: "Enhance resolution up to 4x without losing quality. AI fills in missing details for crystal-clear results every time." },
        { title: "Batch Generation", desc: "Generate hundreds of variations in one click. Perfect for A/B testing ads, social media campaigns, and product mockups." },
        { title: "Background Removal", desc: "One-click background removal with AI precision. Perfect edges even on complex subjects like hair and transparent objects." },
        { title: "API Access", desc: "Integrate image generation directly into your apps and workflows. RESTful API with SDKs for Python, Node.js, and more." },
      ],
      stats: [
        { value: "10M+", label: "Images Generated" },
        { value: "100+", label: "AI Models" },
        { value: "< 5s", label: "Generation Time" },
        { value: "4K", label: "Max Resolution" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Creators Love It",
      testimonials: [
        { quote: "We replaced our entire stock photo subscription. The AI generates exactly what we need for every campaign — on brand, every time.", name: "Lisa Wang", role: "Creative Director, BrandLab" },
        { quote: "Batch generation saved our e-commerce team weeks of work. 500 product mockups in different styles, generated in minutes.", name: "Budi Santoso", role: "Marketing Lead, TokoDigital" },
        { quote: "The API integration was seamless. Our users can now generate custom thumbnails directly in our platform.", name: "Priya Sharma", role: "CTO, ContentFlow" },
      ],
      ctaHeading1: "Start Creating",
      ctaHeading2: "Stunning Visuals",
      ctaDesc: "No design skills needed. Just describe your vision and let AI do the rest.",
      ctaCta1: "Open Generator",
      ctaCta2: "See Pricing",
    },

    /* ── Page: AI Text Generator ── */
    aiTextPage: {
      heroBadge: "AI Text Generator",
      heroHeading1: "Write Smarter,",
      heroHeading2: "Ship Faster",
      heroDesc: "Write smarter and save time with AI-powered tools. Generate copy, content, and creative writing that connects with your audience.",
      heroCta1: "Start Writing Free",
      heroCta2: "View Pricing",
      featuresBadge: "Capabilities",
      featuresHeading: "Words That\nConvert",
      featuresDesc: "From short-form ads to long-form articles — AI-powered writing for every need.",
      features: [
        { title: "AI Copywriting", desc: "Generate compelling ad copy, product descriptions, and taglines in seconds. Trained on millions of high-converting examples." },
        { title: "Long-Form Content", desc: "Blog posts, articles, and whitepapers that read naturally. AI maintains context and tone across thousands of words." },
        { title: "SEO Optimization", desc: "Built-in keyword research and optimization. Generate content that ranks — meta titles, descriptions, and structured headers included." },
        { title: "Multilingual", desc: "Write in 30+ languages with native-quality output. Localize your content for global audiences without manual translation." },
        { title: "Brand Voice", desc: "Train the AI on your brand guidelines. Every piece of content matches your unique tone, style, and messaging framework." },
        { title: "API & Integrations", desc: "Connect to your CMS, email platform, and social tools. Automate content pipelines from generation to publication." },
      ],
      stats: [
        { value: "5M+", label: "Words Generated Daily" },
        { value: "30+", label: "Languages" },
        { value: "3x", label: "Faster Content Creation" },
        { value: "92%", label: "User Satisfaction" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Writers Love It",
      testimonials: [
        { quote: "We went from 2 blog posts a week to 10. The quality is indistinguishable from our human writers — sometimes even better.", name: "Emma Rodriguez", role: "Content Manager, GrowthHub" },
        { quote: "The multilingual feature is incredible. We localized our entire site into 8 languages in a single afternoon.", name: "Fajar Nugroho", role: "Marketing Director, GlobalLink" },
        { quote: "SEO-optimized content out of the box. Our organic traffic increased 150% in the first 3 months of using PLUS Text Generator.", name: "Sophie Chen", role: "SEO Lead, RankBoost" },
      ],
      ctaHeading1: "Ready to Write",
      ctaHeading2: "10x Faster?",
      ctaDesc: "Join thousands of content teams creating more with less effort.",
      ctaCta1: "Start Writing Free",
      ctaCta2: "See Pricing",
    },

    /* ── Page: AI Video Generator ── */
    aiVideoPage: {
      heroBadge: "AI Video Generator",
      heroHeading1: "AI Video That",
      heroHeading2: "Works While You Sleep",
      heroDesc: "Text-to-Video generation for seamless integration and engaging multimedia content. Create professional videos in minutes, not days.",
      heroCta1: "Create Your First Video",
      heroCta2: "View Pricing",
      featuresBadge: "Capabilities",
      featuresHeading: "Video Production\nReimagined",
      featuresDesc: "From script to final cut — AI handles every step of the video creation process.",
      features: [
        { title: "Text to Video", desc: "Describe your scene in words and get a professional video in minutes. AI handles scripting, visuals, and transitions automatically." },
        { title: "AI Avatars", desc: "Lifelike digital presenters that speak any language. Perfect for training videos, product demos, and personalized content." },
        { title: "Smart Editing", desc: "AI-powered cuts, transitions, and color grading. Turn raw footage into polished content with a single click." },
        { title: "Auto Subtitles", desc: "Accurate captions in 50+ languages with perfect timing. Boost accessibility and engagement across all platforms." },
        { title: "Background Music", desc: "AI-curated soundtracks that match your video's mood. Royalty-free music generated to perfectly complement your content." },
        { title: "Multi-Format Export", desc: "One video, every platform. Auto-resize for YouTube, TikTok, Instagram Reels, and LinkedIn — all at once." },
      ],
      stats: [
        { value: "2M+", label: "Videos Created" },
        { value: "50+", label: "Languages" },
        { value: "< 3min", label: "Avg Generation" },
        { value: "4K HDR", label: "Max Quality" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Creators Love It",
      testimonials: [
        { quote: "We produce 20 product videos a week now — something that used to take our entire team a month.", name: "Carlos Mendez", role: "Head of Content, ShopVid" },
        { quote: "The AI avatar feature lets us create training videos in 12 languages without hiring a single voice actor.", name: "Anisa Rahma", role: "L&D Manager, EduTech Asia" },
        { quote: "Auto-subtitles with 98% accuracy. We no longer need to manually caption our YouTube and TikTok content.", name: "Tom Barrett", role: "Creator, BarrettMedia" },
      ],
      ctaHeading1: "Create Professional",
      ctaHeading2: "Videos in Minutes",
      ctaDesc: "No camera, no crew, no editing skills required. Just your ideas and AI.",
      ctaCta1: "Start Creating",
      ctaCta2: "See Pricing",
    },

    /* ── Page: AI Music Generator ── */
    aiMusicPage: {
      heroBadge: "AI Music Generator",
      heroHeading1: "Create Music",
      heroHeading2: "From Words",
      heroDesc: "Create music generated using text. Text-to-Music generation API for seamless integration and engaging audio content creation.",
      heroCta1: "Generate Music Free",
      heroCta2: "View Pricing",
      featuresBadge: "Capabilities",
      featuresHeading: "Music Creation\nWithout Limits",
      featuresDesc: "Professional-quality music at your fingertips, no instruments or training required.",
      features: [
        { title: "Text to Music", desc: "Describe the mood, genre, and instruments — AI composes a full track in seconds. From lo-fi beats to orchestral scores." },
        { title: "Genre Mastery", desc: "Pop, rock, jazz, EDM, classical, hip-hop — 50+ genres with authentic style. Mix genres for unique hybrid sounds." },
        { title: "Smart Mixing", desc: "AI-powered mastering and mixing. Professional-quality audio output ready for streaming, ads, or video production." },
        { title: "Vocal Synthesis", desc: "Generate realistic vocals and harmonies in multiple languages. Perfect for demos, prototypes, and content creation." },
        { title: "Stem Separation", desc: "Split any track into vocals, drums, bass, and melody. Remix, sample, and create derivative works effortlessly." },
        { title: "API Integration", desc: "Text-to-Music generation API for seamless integration into your apps, games, and content creation workflows." },
      ],
      stats: [
        { value: "1M+", label: "Tracks Generated" },
        { value: "50+", label: "Genres" },
        { value: "< 10s", label: "Generation Time" },
        { value: "HQ WAV", label: "Output Quality" },
      ],
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Music Makers Love It",
      testimonials: [
        { quote: "We replaced our entire stock music library. Every video now gets a custom soundtrack that perfectly matches the mood.", name: "Jake Morrison", role: "Video Producer, StoryLab" },
        { quote: "As an indie game dev, custom music was always out of budget. Now I generate unique soundtracks for every level.", name: "Dewi Lestari", role: "Indie Dev, PixelForge" },
        { quote: "The API integration was seamless. Our podcast platform now auto-generates intro music for every new show.", name: "Ryan Kim", role: "CTO, PodcastPro" },
      ],
      ctaHeading1: "Start Making",
      ctaHeading2: "Music Today",
      ctaDesc: "No musical training needed. Describe your vision, let AI compose the rest.",
      ctaCta1: "Open Music Studio",
      ctaCta2: "See Pricing",
    },

    /* ── Page: Chat Bot ── */
    chatBotPage: {
      heroBadge: "AI Marketing Studio",
      heroHeading1: "Your AI-Powered",
      heroHeading2: "Marketing Partner",
      heroDesc: "The smartest marketing studio — powered by AI, designed for results. Plan content, generate visuals, and optimize strategies in one platform.",
      heroCta1: "Try Studio Free",
      heroCta2: "Watch Demo",
      capsBadge: "Capabilities",
      capsHeading: "Everything You Need\nto Win at Marketing",
      capsDesc: "Six powerful AI tools working together to supercharge your marketing workflow.",
      chatTitle: "plus. AI",
      chatPlaceholder: "Ask me anything about marketing...",
      pricingBadge: "Pricing",
      pricingHeading: "Simple, Transparent Pricing",
      pricingDesc: "Start free, upgrade when you're ready. No hidden fees, no surprises.",
      pricingCta: "Get Started",
      testimonialsBadge: "Testimonials",
      testimonialsHeading: "Loved by Marketing Teams",
      faqBadge: "FAQ",
      faqHeading: "Frequently Asked Questions",
      ctaHeading1: "Ready to Transform Your",
      ctaHeading2: "Marketing?",
      ctaDesc: "Join thousands of marketers using AI to create better content, faster.",
      ctaCta1: "Start Free Trial",
      ctaCta2: "Contact Sales",
    },

    /* ── Page: Digital Agency ── */
    digitalAgencyPage: {
      heroBadge: "Digital Agency Services",
      heroHeading1: "Digital Excellence,",
      heroHeading2: "Redefined.",
      heroDesc: "Innovative minds delivering branding, storytelling, and content daily.",
      heroCta1: "Explore Services",
      heroCta2: "View Portfolio",
      servicesBadge: "What We Do",
      servicesHeading: "Tailored Service Offerings",
      servicesDesc: "Innovative branding that clients trust — customized service packages designed to meet your unique business requirements.",
      services: [
        { title: "Creative Solutions", desc: "We empower businesses through innovative branding solutions that capture attention and drive engagement." },
        { title: "IT Solutions", desc: "Creating impactful platforms for user engagement with cutting-edge technology and modern architectures." },
        { title: "Digital Design", desc: "We enhance reach with targeted visual strategies, from UI/UX to full brand identity systems." },
        { title: "Innovative Solutions", desc: "Delivering tailored IT services for your business needs — from cloud to cybersecurity to AI integration." }
      ],
      portfolioBadge: "Our Work",
      portfolioHeading: "Creating Impactful Experiences",
      portfolioDesc: "A pioneering IT solutions provider focused on empowering businesses through innovative technology.",
      portfolio: [
        { title: "Solutions that Empower", desc: "Our innovative IT solutions are crafted to enhance efficiency and drive measurable business results." },
        { title: "Marketing that Captivates", desc: "We provide tailored strategies to reach your audience effectively across every digital touchpoint." },
        { title: "Digital Marketing Solutions", desc: "Our digital marketing solutions elevate your online engagement and amplify brand visibility." },
        { title: "Tailored Marketing", desc: "We deliver cutting-edge IT solutions that empower brands to stand out in competitive markets." }
      ],
      stats: [
        { value: "150+", label: "Innovative Solutions" },
        { value: "500+", label: "Happy Customers" },
        { value: "80+", label: "Tailored Services" },
        { value: "200+", label: "Unique Designs" }
      ],
      testimonialQuote: "Partnering with plus. was an exceptional journey. They invested effort to grasp our goals and exceeded our expectations.",
      testimonialName: "Jenifer Wang",
      testimonialLocation: "Silicon Valley, CA",
      ctaBadge: "Transforming into Reality",
      ctaHeading1: "We craft & enhance your",
      ctaHeading2: "digital presence",
      ctaDesc: "We empower businesses to build exceptional websites with ease. Our solutions simplify the web design journey, making it accessible for all.",
      ctaCta: "Ready to get started?",
      ctaBottomItems: [
        { title: "Brand Identity", desc: "Brand Development" },
        { title: "Design Solutions", desc: "Visual Storytelling" },
        { title: "Innovative IT", desc: "Solutions & Strategy" }
      ]
    },

    /* ── Page: Mobile Game ── */
    mobileGamePage: {
      heroBadge: "Mobile Game Development",
      heroHeading1: "Level Up Your",
      heroHeading2: "Gaming Vision",
      heroDesc: "We combine innovation with expertise to create immersive gaming experiences that captivate millions of players worldwide.",
      heroCta1: "Explore Our Games",
      heroCta2: "Our Capabilities",
      trustedBadge: "Trusted by 20k+ players worldwide",
      scrollIndicator: "Scroll to explore",
      featuresBadge: "Our Capabilities",
      featuresHeading: "Everything You Need to\nShip Great Games",
      featuresDesc: "A forward-thinking IT solutions provider dedicated to empowering game studios through innovative technology.",
      features: [
        { title: "Cross-Platform Play", desc: "Build once, play everywhere — iOS, Android, PC, and console with seamless cross-play support." },
        { title: "Multiplayer Infrastructure", desc: "Scalable server architecture supporting millions of concurrent players with low-latency matchmaking." },
        { title: "Stunning Visuals", desc: "Next-gen graphics powered by Unity and Unreal Engine with custom shaders and particle systems." },
        { title: "Anti-Cheat & Security", desc: "Enterprise-grade security protecting player data and ensuring fair competitive gameplay." },
        { title: "Live Analytics", desc: "Real-time player behavior analytics, retention tracking, and monetization optimization dashboards." },
        { title: "Live Ops Ready", desc: "Dynamic content delivery for events, seasons, battle passes, and A/B testing without app updates." }
      ],
      showcaseBadge: "Our Projects",
      showcaseHeading: "Games That Players\nLove",
      showcaseDesc: "From concept to chart-topping launch — explore our portfolio of games across every genre.",
      gameGenres: [
        { genre: "Racing", title: "High-Speed Thrills", desc: "Heart-pounding racing experiences with realistic physics, stunning tracks, and multiplayer competition." },
        { genre: "Sports", title: "Athletic Champions", desc: "Immersive sports simulations that capture the excitement of the arena with realistic gameplay mechanics." },
        { genre: "Strategy", title: "Tactical Mastery", desc: "Deep strategic gameplay that challenges your mind — build empires, command armies, and outwit opponents." },
        { genre: "Fighting", title: "Combat Arena", desc: "Intense fighting games with fluid combat systems, unique characters, and competitive ranked modes." }
      ],
      statsHeading: "By the Numbers",
      stats: [
        { value: "50M+", label: "Downloads" },
        { value: "200+", label: "Games Shipped" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "4.8★", label: "Avg Rating" }
      ],
      testimonialsBadge: "Client Testimonials",
      testimonialsHeading: "What Our Partners Say",
      testimonials: [
        { quote: "plus. revolutionized our game launch with their tailored solutions. Their expertise and support were invaluable in achieving our goals.", name: "Emily Carter", location: "Rivertown, CA" },
        { quote: "Their cutting-edge solutions and expert guidance truly elevated our game's performance. Player retention increased 340% in 3 months.", name: "Andrew Walker", location: "Omaha, NE" },
        { quote: "plus. transformed our mobile game with their cloud solutions. The transition from beta to live was seamless and efficient.", name: "Nicole Brown", location: "Austin, TX" }
      ],
      ctaBadge: "Ready to Launch?",
      ctaHeading1: "Transform Your Gaming",
      ctaHeading2: "Vision Into Reality",
      ctaDesc: "A forward-thinking studio dedicated to delivering innovative gaming experiences that drive success for every client.",
      ctaCta1: "Get Started Now",
      ctaCta2: "Back to Home"
    },

    /* ── Footer ── */
    footer: {
      tagline:
        "One integrated platform for brands that want to move fast, stay consistent, and still look premium \u2014 powered by AI and real creative minds.",
      productsLabel: "Products",
      companyLabel: "Company",
      connectLabel: "Connect",
      contactUs: "Contact Us \u2192",
      copyright: "All rights reserved.",
      // Company link labels
      aboutUs: "About Us",
      ourWork: "Our Work",
      services: "Services",
      blog: "Blog",
    },
  },

  id: {
    /* ── Navbar ── */
    navbar: {
      about: "Tentang",
      products: "Produk",
      aiFeatures: "Fitur AI",
      pricing: "Harga",
      home: "Beranda",
      contactUs: "Hubungi Kami",
      viewPricing: "Lihat Harga",
      ourProducts: "Produk Kami",
      viewAllProducts: "Lihat Semua Produk",
      new: "Baru",
      productLabels: {
        aiChatBot: "Chat Bot AI",
        customerSupport: "Customer Support",
        mobileApp: "Aplikasi Mobile",
        crmPlatform: "Platform CRM",
        digitalAgency: "Agensi Digital",
        mobileGame: "Game Mobile",
      },
      productItems: {
        aiChatBot: "Chatbot pintar berbasis AI",
        customerSupport: "Keputusan dukungan lebih cerdas",
        mobileApp: "Pengalaman mobile-first",
        crmPlatform: "Alat manajemen klien",
        digitalAgency: "Solusi digital lengkap",
        mobileGame: "Pengalaman gaming imersif",
      },
    },

    /* ── Hero ── */
    hero: {
      badge: "AI-gency Digital No.1 Indonesia",
      heading1: "Bangun Brand Lebih Cerdas.",
      heading2: "Lebih Cepat.",
      subtitle: "Dengan AI + Kreativitas Manusia",
      description:
        "Satu platform terintegrasi untuk brand yang ingin bergerak cepat, tetap konsisten, dan tetap terlihat premium \u2014 didukung AI dan kreativitas nyata.",
      ctaPrimary: "Lihat Cara Kerjanya",
      ctaSecondary: "Lihat Harga",
    },

    /* ── About ── */
    about: {
      badge: "Tentang Plus",
      heading1: "Didorong oleh",
      heading2: "Inovasi",
      description:
        "plus. adalah penyedia solusi IT berpikiran maju yang berdedikasi memberdayakan bisnis melalui teknologi inovatif dan layanan yang disesuaikan. Kami menjembatani kesenjangan antara teknologi dan kebutuhan bisnis, menyediakan solusi yang meningkatkan efisiensi dan mendorong pertumbuhan.",
      statAI: "AI+",
      statAILabel: "Bertenaga",
      statProducts: "6+",
      statProductsLabel: "Produk",
      statTools: "5+",
      statToolsLabel: "Alat AI",
    },

    /* ── Features / Products ── */
    features: {
      badge: "Produk Kami",
      popularBadge: "Populer",
      newBadge: "Baru",
      heading: "Produk AI yang Memberdayakan",
      description:
        "Mempercepat kemajuan dalam kecerdasan buatan \u2014 solusi inovatif yang dirancang untuk memberdayakan bisnis Anda dan meningkatkan efisiensi.",
      products: [
        {
          title: "AI Chat Bot",
          description:
            "Chatbot AI tercanggih Anda \u2014 selalu siap membantu. Rasakan percakapan yang mulus, jawaban instan, dan dukungan 24/7 untuk pelanggan Anda.",
        },
        {
          title: "Customer Support",
          description:
            "Alat cerdas untuk keputusan dukungan pelanggan yang lebih baik. Tingkatkan operasi dengan solusi yang disesuaikan untuk kebutuhan unik klien.",
        },
        {
          title: "Mobile App",
          description:
            "Keajaiban mobile \u2014 memberdayakan bisnis melalui teknologi. Kami mengembangkan & menciptakan pengalaman digital yang mendorong pertumbuhan.",
        },
        {
          title: "CRM Platform",
          description:
            "Berdayakan bisnis Anda dengan teknologi CRM kami. Meningkatkan operasi, mengelola klien, dan mendorong pertumbuhan berkelanjutan.",
        },
        {
          title: "Digital Agency",
          description:
            "Agensi digital layanan lengkap untuk brand yang ingin berkembang. Dari strategi hingga eksekusi, kami merancang solusi digital yang disesuaikan.",
        },
        {
          title: "Mobile Game",
          description:
            "Pengembangan game mobile yang menarik dan memikat pemain. Dari konsep hingga peluncuran, kami membangun pengalaman gaming yang imersif.",
        },
      ],
    },

    /* ── AI Features ── */
    aiFeatures: {
      badge: "Fitur AI",
      heading: "Didukung Kecerdasan Buatan",
      description:
        "Dari pembuatan gambar hingga penciptaan musik \u2014 alat AI kami membantu Anda membangun lebih cerdas dan lebih cepat.",
      items: [
        {
          title: "AI Image Generator",
          description:
            "Ciptakan seni indah dengan kecerdasan buatan. Tiga API terintegrasi: OpenAI, Stable Diffusion dan Stability AI \u2014 100+ model tergabung.",
        },
        {
          title: "AI Text Generator",
          description:
            "Tulis lebih cerdas dan hemat waktu dengan alat bertenaga AI. Hasilkan copy, konten, dan tulisan kreatif yang terhubung dengan audiens Anda.",
        },
        {
          title: "AI Chat Bot",
          description:
            "Chat Bot AI Personal \u2014 hemat biaya, tersedia 24/7, dan fleksibel. Percakapan mulus dan jawaban instan untuk setiap kebutuhan.",
        },
        {
          title: "AI Video Generator",
          description:
            "Video AI yang bekerja saat Anda tidur. Pembuatan Teks-ke-Video untuk integrasi yang mulus dan konten multimedia yang menarik.",
        },
        {
          title: "AI Music Generator",
          description:
            "Buat musik menggunakan teks. API pembuatan Teks-ke-Musik untuk integrasi yang mulus dan pembuatan konten audio yang menarik.",
        },
      ],
      servicesBadge: "Solusi IT",
      servicesHeading: "Strategi Digital yang Mendorong Pertumbuhan",
      services: [
        {
          title: "Solusi Cloud",
          description:
            "Layanan cloud yang disesuaikan untuk meningkatkan operasi bisnis dan skalabilitas Anda.",
        },
        {
          title: "Solusi Marketing",
          description:
            "Strategi pemasaran yang disesuaikan yang menghasilkan dampak dan mendorong keterlibatan.",
        },
        {
          title: "Solusi Inovatif",
          description:
            "Layanan mutakhir yang memungkinkan bisnis unggul di ranah digital.",
        },
      ],
    },

    /* ── Pricing ── */
    pricing: {
      badge: "Harga",
      heading: "Pilih Paket yang Tepat untuk Anda",
      description:
        "Harga sederhana dan transparan yang tumbuh bersama bisnis Anda.",
      monthly: "Bulanan",
      annual: "Tahunan",
      recommended: "Direkomendasikan",
      whatsIncluded: "Yang termasuk",
      choosePlan: "Pilih Paket",
      perMonth: "/bulan",
      monthlyPlans: [
        {
          name: "Starter",
          description: "Terbaik untuk memulai",
          features: [
            "Jelajahi penawaran beragam kami",
            "Solusi teknologi inovatif",
            "Paket layanan yang disesuaikan",
            "Rencana pembayaran fleksibel",
          ],
        },
        {
          name: "Professional",
          description: "Pilihan paling populer",
          features: [
            "Fitur komprehensif termasuk",
            "Solusi teknologi inovatif",
            "Strategi digital yang disesuaikan",
            "Layanan dukungan komprehensif",
          ],
        },
        {
          name: "Premium",
          description: "Untuk operasi skala besar",
          features: [
            "Solusi teknologi inovatif",
            "Disesuaikan untuk Anda",
            "Solusi untuk setiap kebutuhan",
            "Harga transparan tanpa kejutan",
          ],
        },
      ],
      annualPlans: [
        {
          name: "Basic",
          description: "Terbaik untuk memulai",
          features: [
            "Dukungan IT komprehensif",
            "Solusi yang disesuaikan tersedia",
            "Solusi IT inovatif",
            "Paket layanan yang disesuaikan",
          ],
        },
        {
          name: "Professional",
          description: "Pilihan paling populer",
          features: [
            "Solusi IT inovatif",
            "Rencana layanan yang disesuaikan",
            "Solusi IT inovatif",
            "Paket layanan yang disesuaikan",
          ],
        },
        {
          name: "Premium",
          description: "Untuk operasi skala besar",
          features: [
            "Memberdayakan bisnis Anda",
            "Solusi inovatif ditawarkan",
            "Disesuaikan untuk kebutuhan Anda",
            "Harga transparan",
          ],
        },
      ],
    },

    /* ── FAQ ── */
    faq: {
      badge: "FAQ",
      heading: "Pertanyaan yang Sering Diajukan",
      description:
        "Semua yang perlu Anda ketahui tentang plus. dan layanan kami.",
      items: [
        {
          question: "Layanan apa yang disediakan plus.?",
          answer:
            "plus. mengkhususkan diri dalam solusi digital bertenaga AI termasuk Chat Bot, alat Customer Support, pengembangan Mobile App, platform CRM, layanan Digital Agency, dan pengembangan Mobile Game. Kami juga menawarkan solusi cloud, layanan cybersecurity, dan digital marketing.",
        },
        {
          question: "Fitur AI apa yang tersedia di platform?",
          answer:
            "Kami menawarkan 5 alat bertenaga AI: AI Image Generator (dengan 100+ model dari OpenAI, Stable Diffusion & Stability AI), AI Text Generator, Personal AI Chat Bot, AI Video Generator, dan AI Music Generator \u2014 semuanya dirancang untuk membantu Anda membangun lebih cerdas dan cepat.",
        },
        {
          question: "Paket harga apa yang ditawarkan?",
          answer:
            "Kami menawarkan paket bulanan dan tahunan yang fleksibel. Bulanan: Starter ($25), Professional ($50, direkomendasikan), dan Premium ($500). Paket tahunan juga tersedia dengan harga yang disesuaikan. Kami juga menawarkan paket Service Plus mulai dari $45 untuk instalasi hingga $699 untuk paket website lengkap.",
        },
        {
          question: "Bagaimana cara menghubungi plus. untuk dukungan?",
          answer:
            "Anda dapat menghubungi kami melalui email di support@plusthe.site atau melalui halaman Hubungi Kami. Tim kami berdedikasi menyediakan solusi inovatif dan dukungan pelanggan luar biasa untuk memenuhi kebutuhan bisnis unik Anda.",
        },
        {
          question:
            "Apakah Anda menawarkan kustomisasi dan pengembangan website?",
          answer:
            "Ya! Paket Service Plus kami termasuk instalasi tema ($45), setup website siap pakai dengan penggantian konten hingga 6 halaman ($469), dan paket website lengkap dengan optimasi SEO & kecepatan ($699). Semua paket termasuk kustomisasi profesional.",
        },
      ],
    },

    /* ── Page: Customer Support ── */
    customerSupportPage: {
      heroBadge: "Customer Support",
      heroHeading1: "Dukungan yang",
      heroHeading2: "Tak Pernah Tidur",
      heroDesc: "Keputusan lebih cerdas, resolusi lebih cepat, pelanggan lebih bahagia. Platform dukungan bertenaga AI yang berkembang bersama bisnis Anda.",
      heroCta1: "Mulai Gratis",
      heroCta2: "Pesan Demo",
      featuresBadge: "Fitur",
      featuresHeading: "Semua yang Anda Butuhkan\nuntuk Memuaskan Pelanggan",
      featuresDesc: "Ekosistem dukungan lengkap dari manajemen tiket hingga otomasi AI — semua dalam satu platform.",
      features: [
        { title: "Dukungan 24/7", desc: "Bantuan sepanjang waktu dari tim ahli kami. Jangan biarkan pelanggan menunggu — selesaikan masalah secara instan, kapan saja." },
        { title: "Tiket Cerdas", desc: "Routing tiket bertenaga AI, klasifikasi prioritas, dan penugasan otomatis. Saksikan waktu resolusi turun hingga 60%." },
        { title: "Chat Omni-Channel", desc: "Inbox terpadu di WhatsApp, Instagram, email, dan web chat. Satu dasbor, setiap percakapan." },
        { title: "Basis Pengetahuan", desc: "Portal swalayan dengan artikel yang disarankan AI. Kurangi volume dukungan sambil memberdayakan pelanggan menemukan jawaban cepat." },
        { title: "Dasbor Analitik", desc: "Metrik real-time tentang CSAT, waktu respons, dan kinerja agen. Keputusan berbasis data untuk perbaikan berkelanjutan." },
        { title: "Balasan Otomatis AI", desc: "Chatbot cerdas menangani pertanyaan umum secara otomatis. Penyerahan mulus ke agen manusia saat diperlukan." },
      ],
      stats: [
        { value: "99.9%", label: "Jaminan Uptime" },
        { value: "< 30s", label: "Rata-rata Waktu Respons" },
        { value: "50K+", label: "Tiket Terselesaikan" },
        { value: "4.9/5", label: "Rating Pelanggan" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Tim Dukungan",
      testimonials: [
        { quote: "Beralih ke PLUS Customer Support memangkas waktu respons kami menjadi setengah. Pelanggan kami langsung merasakannya.", name: "Sarah Chen", role: "Head of CX, TechFlow" },
        { quote: "Balasan otomatis AI menangani 40% tiket kami secara otomatis. Tim kami fokus pada masalah kompleks yang benar-benar penting.", name: "Ahmad Rizki", role: "Support Lead, Tokoline" },
        { quote: "Inbox omni-channel adalah game-changer. Tidak perlu lagi berganti aplikasi — semuanya di satu tempat.", name: "Maya Putri", role: "Manajer Operasi, ShopEase" },
      ],
      ctaHeading1: "Siap Mengubah",
      ctaHeading2: "Dukungan Pelanggan Anda?",
      ctaDesc: "Bergabunglah dengan ribuan bisnis yang memberikan pengalaman dukungan luar biasa.",
      ctaCta1: "Mulai Uji Coba Gratis",
      ctaCta2: "Hubungi Sales",
    },

    /* ── Page: Mobile App ── */
    mobileAppPage: {
      heroBadge: "Aplikasi Mobile",
      heroHeading1: "Pengalaman",
      heroHeading2: "Mobile-First",
      heroDesc: "Aplikasi mobile yang indah dan berkinerja tinggi yang disukai pengguna. Dari konsep hingga App Store — kami menangani seluruh perjalanan.",
      heroCta1: "Mulai Proyek Anda",
      heroCta2: "Lihat Portofolio",
      featuresBadge: "Kemampuan",
      featuresHeading: "Segalanya untuk\nAplikasi Mobile Modern",
      featuresDesc: "Fitur kelas enterprise dengan kecepatan startup. Bangun aplikasi yang berkembang sejak hari pertama.",
      features: [
        { title: "Cross-Platform", desc: "Bangun sekali, deploy di mana saja. Performa native di iOS dan Android dari satu codebase menggunakan React Native dan Flutter." },
        { title: "Notifikasi Cerdas", desc: "Push notification berbasis AI yang menjangkau pengguna di momen yang tepat. Tingkatkan engagement dengan peringatan yang dipersonalisasi." },
        { title: "Offline-First", desc: "Fungsionalitas penuh bahkan tanpa koneksi. Sinkronisasi otomatis saat kembali online — pengguna Anda tak pernah ketinggalan." },
        { title: "Sangat Cepat", desc: "Animasi 60fps, waktu muat instan, dan transisi mulus. Performa yang bisa dirasakan pengguna di setiap interaksi." },
        { title: "Keamanan Enterprise", desc: "Enkripsi end-to-end, autentikasi biometrik, dan arsitektur siap kepatuhan. Data Anda tetap terlindungi di setiap lapisan." },
        { title: "Analitik Bawaan", desc: "Lacak perilaku pengguna, funnel retensi, dan adopsi fitur. Buat keputusan berbasis data untuk menumbuhkan aplikasi Anda." },
      ],
      stats: [
        { value: "200+", label: "Aplikasi Dikirim" },
        { value: "5M+", label: "Unduhan" },
        { value: "4.8★", label: "Rata-rata Rating Toko" },
        { value: "12", label: "Negara Dilayani" },
      ],
      testimonialsBadge: "Cerita Sukses",
      testimonialsHeading: "Dibangun untuk Bisnis Nyata",
      testimonials: [
        { quote: "PLUS membangun aplikasi kami dalam waktu rekor. Pendekatan cross-platform menghemat berbulan-bulan pengembangan dan ribuan biaya.", name: "David Park", role: "CTO, FitTrack" },
        { quote: "Arsitektur offline-first adalah persis yang kami butuhkan untuk aplikasi layanan lapangan. Teknisi kami menyukainya.", name: "Rina Sari", role: "Product Manager, FieldPro" },
        { quote: "Dari 3.2 menjadi 4.8 bintang di App Store setelah redesain. Peningkatan performa sangat signifikan.", name: "Jason Lee", role: "Founder, QuickBite" },
      ],
      ctaHeading1: "Siap Membangun",
      ctaHeading2: "Aplikasi Impian Anda?",
      ctaDesc: "Dari ide hingga App Store — mari wujudkan visi mobile Anda.",
      ctaCta1: "Dapatkan Penawaran",
      ctaCta2: "Jadwalkan Panggilan",
    },

    /* ── Page: CRM ── */
    crmPage: {
      heroBadge: "Platform CRM",
      heroHeading1: "Jual Lebih Cerdas,",
      heroHeading2: "Tutup Lebih Cepat",
      heroDesc: "CRM bertenaga AI yang mengubah lead menjadi pelanggan setia. Otomasi alur kerja, lacak setiap deal, dan kembangkan pendapatan secara terukur.",
      heroCta1: "Mulai Uji Coba Gratis",
      heroCta2: "Tonton Demo",
      featuresBadge: "Fitur",
      featuresHeading: "Toolkit Penjualan\nLengkap Anda",
      featuresDesc: "Dari kontak pertama hingga deal tertutup — kelola setiap langkah perjalanan penjualan Anda dalam satu platform.",
      features: [
        { title: "Pipeline Penjualan", desc: "Manajemen pipeline visual drag-and-drop. Lacak deal dari lead hingga penutupan dengan pembaruan tahap real-time dan skor probabilitas." },
        { title: "Manajemen Kontak", desc: "Profil pelanggan 360° dengan riwayat interaksi, data sosial, dan insight yang diperkaya AI. Kenali setiap klien seperti teman dekat." },
        { title: "Skor Lead AI", desc: "Algoritma machine learning memeringkat lead Anda berdasarkan probabilitas konversi. Fokuskan tim pada deal yang paling mungkin tertutup." },
        { title: "Otomasi Alur Kerja", desc: "Otomasi follow-up, penugasan tugas, dan entri data. Hilangkan pekerjaan berulang agar tim Anda lebih banyak menjual." },
        { title: "Integrasi Email", desc: "Sinkronisasi email dua arah dengan Gmail dan Outlook. Lacak pembukaan, klik, dan balasan — semuanya dari dalam CRM Anda." },
        { title: "Analitik Pendapatan", desc: "Dasbor peramalan, analisis menang/kalah, dan metrik kinerja tim. Keputusan berbasis data untuk pertumbuhan yang terukur." },
      ],
      stats: [
        { value: "35%", label: "Lebih Banyak Deal Tertutup" },
        { value: "10K+", label: "Pengguna Aktif" },
        { value: "2.5M", label: "Kontak Dikelola" },
        { value: "98%", label: "Retensi Pelanggan" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Dipercaya Tim Penjualan",
      testimonials: [
        { quote: "Siklus penjualan kami memendek 40% setelah mengimplementasikan PLUS CRM. Skor lead AI saja sudah sepadan dengan pindah.", name: "Michael Torres", role: "VP of Sales, CloudSync" },
        { quote: "Akhirnya, CRM yang tidak butuh gelar PhD untuk digunakan. Seluruh tim kami bisa langsung pakai dalam sehari.", name: "Dian Permata", role: "Sales Director, Indocommerce" },
        { quote: "Fitur otomasi menghemat 15 jam per minggu dalam entri data manual. Itu waktu yang kami habiskan untuk benar-benar menjual.", name: "Alex Wijaya", role: "Founder, SalesBridge" },
      ],
      ctaHeading1: "Siap Memperkuat",
      ctaHeading2: "Penjualan Anda?",
      ctaDesc: "Bergabunglah dengan 10.000+ bisnis yang tumbuh lebih cepat dengan PLUS CRM.",
      ctaCta1: "Mulai Uji Coba Gratis",
      ctaCta2: "Hubungi Sales",
    },

    /* ── Page: AI Image Generator ── */
    aiImagePage: {
      heroBadge: "AI Image Generator",
      heroHeading1: "Bayangkan,",
      heroHeading2: "Ciptakan",
      heroDesc: "Ciptakan seni indah dengan kecerdasan buatan. Tiga API terintegrasi: OpenAI, Stable Diffusion, dan Stability AI — 100+ model tergabung.",
      heroCta1: "Coba Generator Gratis",
      heroCta2: "Lihat Harga",
      featuresBadge: "Kemampuan",
      featuresHeading: "Ciptakan Tanpa\nBatas",
      featuresDesc: "Alat gambar profesional yang didukung model AI terbaik dunia.",
      features: [
        { title: "Teks ke Gambar", desc: "Gambarkan apa yang Anda bayangkan dan saksikan menjadi nyata. Didukung OpenAI, Stable Diffusion, dan Stability AI — 100+ model tergabung." },
        { title: "Transfer Gaya", desc: "Ubah gambar apa pun menjadi gaya artistik berbeda — lukisan minyak, cat air, anime, fotorealistis, dan puluhan lainnya." },
        { title: "Upscale Cerdas", desc: "Tingkatkan resolusi hingga 4x tanpa kehilangan kualitas. AI mengisi detail yang hilang untuk hasil jernih setiap saat." },
        { title: "Generasi Massal", desc: "Hasilkan ratusan variasi dalam satu klik. Sempurna untuk A/B testing iklan, kampanye media sosial, dan mockup produk." },
        { title: "Hapus Latar Belakang", desc: "Hapus latar belakang satu klik dengan presisi AI. Tepi sempurna bahkan pada subjek kompleks seperti rambut dan objek transparan." },
        { title: "Akses API", desc: "Integrasikan pembuatan gambar langsung ke aplikasi dan alur kerja Anda. API RESTful dengan SDK untuk Python, Node.js, dan lainnya." },
      ],
      stats: [
        { value: "10M+", label: "Gambar Dibuat" },
        { value: "100+", label: "Model AI" },
        { value: "< 5s", label: "Waktu Generasi" },
        { value: "4K", label: "Resolusi Maks" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Para Kreator",
      testimonials: [
        { quote: "Kami mengganti seluruh langganan foto stok. AI menghasilkan persis yang kami butuhkan untuk setiap kampanye — sesuai brand, setiap saat.", name: "Lisa Wang", role: "Creative Director, BrandLab" },
        { quote: "Generasi massal menghemat tim e-commerce kami berminggu-minggu kerja. 500 mockup produk dalam gaya berbeda, dihasilkan dalam hitungan menit.", name: "Budi Santoso", role: "Marketing Lead, TokoDigital" },
        { quote: "Integrasi API sangat mulus. Pengguna kami sekarang bisa menghasilkan thumbnail kustom langsung di platform kami.", name: "Priya Sharma", role: "CTO, ContentFlow" },
      ],
      ctaHeading1: "Mulai Menciptakan",
      ctaHeading2: "Visual Menakjubkan",
      ctaDesc: "Tidak perlu keahlian desain. Cukup gambarkan visi Anda dan biarkan AI yang mengerjakan.",
      ctaCta1: "Buka Generator",
      ctaCta2: "Lihat Harga",
    },

    /* ── Page: AI Text Generator ── */
    aiTextPage: {
      heroBadge: "AI Text Generator",
      heroHeading1: "Tulis Lebih Cerdas,",
      heroHeading2: "Kirim Lebih Cepat",
      heroDesc: "Tulis lebih cerdas dan hemat waktu dengan alat bertenaga AI. Hasilkan copy, konten, dan tulisan kreatif yang terhubung dengan audiens Anda.",
      heroCta1: "Mulai Menulis Gratis",
      heroCta2: "Lihat Harga",
      featuresBadge: "Kemampuan",
      featuresHeading: "Kata-kata yang\nMenkonversi",
      featuresDesc: "Dari iklan singkat hingga artikel panjang — penulisan bertenaga AI untuk setiap kebutuhan.",
      features: [
        { title: "AI Copywriting", desc: "Hasilkan copy iklan, deskripsi produk, dan tagline yang meyakinkan dalam hitungan detik. Dilatih pada jutaan contoh konversi tinggi." },
        { title: "Konten Panjang", desc: "Blog post, artikel, dan whitepaper yang terbaca alami. AI menjaga konteks dan nada di ribuan kata." },
        { title: "Optimasi SEO", desc: "Riset kata kunci dan optimasi bawaan. Hasilkan konten yang ranking — judul meta, deskripsi, dan header terstruktur sudah termasuk." },
        { title: "Multibahasa", desc: "Tulis dalam 30+ bahasa dengan output berkualitas native. Lokalisasi konten Anda untuk audiens global tanpa terjemahan manual." },
        { title: "Suara Brand", desc: "Latih AI dengan panduan brand Anda. Setiap konten cocok dengan nada, gaya, dan kerangka pesan unik Anda." },
        { title: "API & Integrasi", desc: "Hubungkan ke CMS, platform email, dan alat sosial Anda. Otomasi pipeline konten dari pembuatan hingga publikasi." },
      ],
      stats: [
        { value: "5M+", label: "Kata Dihasilkan Harian" },
        { value: "30+", label: "Bahasa" },
        { value: "3x", label: "Pembuatan Konten Lebih Cepat" },
        { value: "92%", label: "Kepuasan Pengguna" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Para Penulis",
      testimonials: [
        { quote: "Kami naik dari 2 blog post seminggu menjadi 10. Kualitasnya tidak bisa dibedakan dari penulis manusia — kadang malah lebih baik.", name: "Emma Rodriguez", role: "Content Manager, GrowthHub" },
        { quote: "Fitur multibahasa luar biasa. Kami melokalisasi seluruh situs ke 8 bahasa dalam satu sore.", name: "Fajar Nugroho", role: "Marketing Director, GlobalLink" },
        { quote: "Konten teroptimasi SEO langsung dari kotak. Traffic organik kami naik 150% dalam 3 bulan pertama menggunakan PLUS Text Generator.", name: "Sophie Chen", role: "SEO Lead, RankBoost" },
      ],
      ctaHeading1: "Siap Menulis",
      ctaHeading2: "10x Lebih Cepat?",
      ctaDesc: "Bergabunglah dengan ribuan tim konten yang menghasilkan lebih banyak dengan lebih sedikit usaha.",
      ctaCta1: "Mulai Menulis Gratis",
      ctaCta2: "Lihat Harga",
    },

    /* ── Page: AI Video Generator ── */
    aiVideoPage: {
      heroBadge: "AI Video Generator",
      heroHeading1: "Video AI yang",
      heroHeading2: "Bekerja Saat Anda Tidur",
      heroDesc: "Pembuatan Teks-ke-Video untuk integrasi yang mulus dan konten multimedia yang menarik. Buat video profesional dalam menit, bukan hari.",
      heroCta1: "Buat Video Pertama Anda",
      heroCta2: "Lihat Harga",
      featuresBadge: "Kemampuan",
      featuresHeading: "Produksi Video\nDirevolusi",
      featuresDesc: "Dari skrip hingga final cut — AI menangani setiap langkah proses pembuatan video.",
      features: [
        { title: "Teks ke Video", desc: "Jelaskan adegan Anda dalam kata-kata dan dapatkan video profesional dalam menit. AI menangani skrip, visual, dan transisi secara otomatis." },
        { title: "Avatar AI", desc: "Presenter digital seperti asli yang berbicara dalam bahasa apa pun. Sempurna untuk video pelatihan, demo produk, dan konten personal." },
        { title: "Editing Cerdas", desc: "Pemotongan, transisi, dan color grading bertenaga AI. Ubah rekaman mentah menjadi konten profesional dengan satu klik." },
        { title: "Subtitle Otomatis", desc: "Caption akurat dalam 50+ bahasa dengan timing sempurna. Tingkatkan aksesibilitas dan engagement di semua platform." },
        { title: "Musik Latar", desc: "Soundtrack yang dikurasi AI yang cocok dengan mood video Anda. Musik royalty-free yang dihasilkan untuk melengkapi konten Anda." },
        { title: "Ekspor Multi-Format", desc: "Satu video, setiap platform. Auto-resize untuk YouTube, TikTok, Instagram Reels, dan LinkedIn — sekaligus." },
      ],
      stats: [
        { value: "2M+", label: "Video Dibuat" },
        { value: "50+", label: "Bahasa" },
        { value: "< 3mnt", label: "Rata-rata Generasi" },
        { value: "4K HDR", label: "Kualitas Maks" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Para Kreator",
      testimonials: [
        { quote: "Kami menghasilkan 20 video produk seminggu sekarang — sesuatu yang dulu butuh seluruh tim kami sebulan.", name: "Carlos Mendez", role: "Head of Content, ShopVid" },
        { quote: "Fitur avatar AI memungkinkan kami membuat video pelatihan dalam 12 bahasa tanpa menyewa satu pun pengisi suara.", name: "Anisa Rahma", role: "L&D Manager, EduTech Asia" },
        { quote: "Subtitle otomatis dengan akurasi 98%. Kami tidak lagi perlu membuat caption manual untuk konten YouTube dan TikTok.", name: "Tom Barrett", role: "Kreator, BarrettMedia" },
      ],
      ctaHeading1: "Buat Video Profesional",
      ctaHeading2: "dalam Hitungan Menit",
      ctaDesc: "Tidak perlu kamera, kru, atau keahlian editing. Cukup ide Anda dan AI.",
      ctaCta1: "Mulai Membuat",
      ctaCta2: "Lihat Harga",
    },

    /* ── Page: AI Music Generator ── */
    aiMusicPage: {
      heroBadge: "AI Music Generator",
      heroHeading1: "Buat Musik",
      heroHeading2: "dari Kata-kata",
      heroDesc: "Buat musik menggunakan teks. API pembuatan Teks-ke-Musik untuk integrasi yang mulus dan pembuatan konten audio yang menarik.",
      heroCta1: "Buat Musik Gratis",
      heroCta2: "Lihat Harga",
      featuresBadge: "Kemampuan",
      featuresHeading: "Pembuatan Musik\nTanpa Batas",
      featuresDesc: "Musik berkualitas profesional di ujung jari Anda, tanpa instrumen atau pelatihan.",
      features: [
        { title: "Teks ke Musik", desc: "Jelaskan mood, genre, dan instrumen — AI mengomposisi trek lengkap dalam detik. Dari beat lo-fi hingga skor orkestra." },
        { title: "Ahli Genre", desc: "Pop, rock, jazz, EDM, klasik, hip-hop — 50+ genre dengan gaya autentik. Campur genre untuk suara hybrid unik." },
        { title: "Mixing Cerdas", desc: "Mastering dan mixing bertenaga AI. Output audio berkualitas profesional siap untuk streaming, iklan, atau produksi video." },
        { title: "Sintesis Vokal", desc: "Hasilkan vokal dan harmoni realistis dalam berbagai bahasa. Sempurna untuk demo, prototipe, dan pembuatan konten." },
        { title: "Pemisahan Stem", desc: "Pisahkan trek apa pun menjadi vokal, drum, bass, dan melodi. Remix, sample, dan buat karya turunan dengan mudah." },
        { title: "Integrasi API", desc: "API pembuatan Teks-ke-Musik untuk integrasi mulus ke aplikasi, game, dan alur kerja pembuatan konten Anda." },
      ],
      stats: [
        { value: "1M+", label: "Trek Dihasilkan" },
        { value: "50+", label: "Genre" },
        { value: "< 10s", label: "Waktu Generasi" },
        { value: "HQ WAV", label: "Kualitas Output" },
      ],
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Pembuat Musik",
      testimonials: [
        { quote: "Kami mengganti seluruh perpustakaan musik stok. Setiap video sekarang mendapat soundtrack kustom yang cocok sempurna dengan mood.", name: "Jake Morrison", role: "Produser Video, StoryLab" },
        { quote: "Sebagai indie game dev, musik kustom selalu di luar anggaran. Sekarang saya membuat soundtrack unik untuk setiap level.", name: "Dewi Lestari", role: "Indie Dev, PixelForge" },
        { quote: "Integrasi API sangat mulus. Platform podcast kami sekarang auto-generate musik intro untuk setiap acara baru.", name: "Ryan Kim", role: "CTO, PodcastPro" },
      ],
      ctaHeading1: "Mulai Membuat",
      ctaHeading2: "Musik Hari Ini",
      ctaDesc: "Tidak perlu pelatihan musik. Jelaskan visi Anda, biarkan AI yang mengomposisi.",
      ctaCta1: "Buka Studio Musik",
      ctaCta2: "Lihat Harga",
    },

    /* ── Page: Chat Bot ── */
    chatBotPage: {
      heroBadge: "AI Marketing Studio",
      heroHeading1: "Partner Marketing",
      heroHeading2: "Bertenaga AI Anda",
      heroDesc: "Studio marketing terpintar — didukung AI, dirancang untuk hasil. Rencanakan konten, hasilkan visual, dan optimalkan strategi dalam satu platform.",
      heroCta1: "Coba Studio Gratis",
      heroCta2: "Tonton Demo",
      capsBadge: "Kemampuan",
      capsHeading: "Semua yang Anda Butuhkan\nuntuk Menang di Marketing",
      capsDesc: "Enam alat AI yang bekerja bersama untuk memperkuat alur marketing Anda.",
      chatTitle: "plus. AI",
      chatPlaceholder: "Tanyakan apa saja tentang marketing...",
      pricingBadge: "Harga",
      pricingHeading: "Harga Sederhana dan Transparan",
      pricingDesc: "Mulai gratis, upgrade saat Anda siap. Tidak ada biaya tersembunyi, tidak ada kejutan.",
      pricingCta: "Mulai Sekarang",
      testimonialsBadge: "Testimonial",
      testimonialsHeading: "Disukai Tim Marketing",
      faqBadge: "FAQ",
      faqHeading: "Pertanyaan yang Sering Diajukan",
      ctaHeading1: "Siap Mengubah",
      ctaHeading2: "Marketing Anda?",
      ctaDesc: "Bergabunglah dengan ribuan marketer yang menggunakan AI untuk membuat konten lebih baik, lebih cepat.",
      ctaCta1: "Mulai Uji Coba Gratis",
      ctaCta2: "Hubungi Sales",
    },

    /* ── Page: Digital Agency ── */
    digitalAgencyPage: {
      heroBadge: "Layanan Agensi Digital",
      heroHeading1: "Keunggulan Digital,",
      heroHeading2: "Didefinisikan Ulang.",
      heroDesc: "Pemikiran inovatif yang menghadirkan branding, storytelling, dan konten setiap hari.",
      heroCta1: "Jelajahi Layanan",
      heroCta2: "Lihat Portofolio",
      servicesBadge: "Apa yang Kami Lakukan",
      servicesHeading: "Penawaran Layanan yang Disesuaikan",
      servicesDesc: "Branding inovatif yang dipercaya klien — paket layanan khusus yang dirancang untuk memenuhi kebutuhan bisnis unik Anda.",
      services: [
        { title: "Solusi Kreatif", desc: "Kami memberdayakan bisnis melalui solusi branding inovatif yang menarik perhatian dan mendorong keterlibatan." },
        { title: "Solusi IT", desc: "Menciptakan platform berdampak untuk ketergantungan pengguna dengan teknologi mutakhir dan arsitektur modern." },
        { title: "Desain Digital", desc: "Kami memperluas jangkauan dengan strategi visual terarah, dari UI/UX hingga sistem identitas brand lengkap." },
        { title: "Solusi Inovatif", desc: "Menghadirkan layanan IT yang disesuaikan untuk kebutuhan bisnis Anda — dari cloud, cybersecurity, hingga integrasi AI." }
      ],
      portfolioBadge: "Karya Kami",
      portfolioHeading: "Menciptakan Pengalaman Berdampak",
      portfolioDesc: "Penyedia solusi IT pelopor yang berfokus memberdayakan bisnis melalui teknologi inovatif.",
      portfolio: [
        { title: "Solusi yang Memberdayakan", desc: "Solusi IT inovatif kami dirancang untuk meningkatkan efisiensi dan mendorong hasil bisnis yang terukur." },
        { title: "Pemasaran yang Memikat", desc: "Kami menyediakan strategi yang disesuaikan untuk menjangkau audiens Anda secara efektif di setiap titik sentuh digital." },
        { title: "Solusi Pemasaran Digital", desc: "Solusi pemasaran digital kami meningkatkan keterlibatan online dan memperkuat visibilitas brand." },
        { title: "Pemasaran yang Disesuaikan", desc: "Kami menghadirkan solusi IT mutakhir yang memberdayakan brand untuk menonjol di pasar yang kompetitif." }
      ],
      stats: [
        { value: "150+", label: "Solusi Inovatif" },
        { value: "500+", label: "Pelanggan Puas" },
        { value: "80+", label: "Layanan Khusus" },
        { value: "200+", label: "Desain Unik" }
      ],
      testimonialQuote: "Bermitra dengan plus. adalah perjalanan yang luar biasa. Mereka berusaha keras memahami tujuan kami dan melampaui harapan kami.",
      testimonialName: "Jenifer Wang",
      testimonialLocation: "Silicon Valley, CA",
      ctaBadge: "Mengubah Menjadi Kenyataan",
      ctaHeading1: "Kami merancang & memperkuat",
      ctaHeading2: "kehadiran digital Anda",
      ctaDesc: "Kami memberdayakan bisnis untuk membangun situs web luar biasa dengan mudah. Solusi kami menyederhanakan perjalanan desain web, membuatnya dapat diakses oleh semua orang.",
      ctaCta: "Siap untuk memulai?",
      ctaBottomItems: [
        { title: "Identitas Brand", desc: "Pengembangan Brand" },
        { title: "Solusi Desain", desc: "Storytelling Visual" },
        { title: "IT Inovatif", desc: "Solusi & Strategi" }
      ]
    },

    /* ── Page: Mobile Game ── */
    mobileGamePage: {
      heroBadge: "Pengembangan Game Mobile",
      heroHeading1: "Tingkatkan Level",
      heroHeading2: "Visi Game Anda",
      heroDesc: "Kami memadukan inovasi dengan keahlian untuk menciptakan pengalaman gaming imersif yang memikat jutaan pemain di seluruh dunia.",
      heroCta1: "Jelajahi Game Kami",
      heroCta2: "Kemampuan Kami",
      trustedBadge: "Dipercaya oleh 20rb+ pemain di seluruh dunia",
      scrollIndicator: "Gulir untuk menjelajah",
      featuresBadge: "Kemampuan Kami",
      featuresHeading: "Semua yang Anda Butuhkan\nuntuk Merilis Game Hebat",
      featuresDesc: "Penyedia solusi IT berpikiran maju yang berdedikasi memberdayakan studio game melalui teknologi inovatif.",
      features: [
        { title: "Main Lintas Platform", desc: "Bangun sekali, mainkan di mana saja — iOS, Android, PC, dan konsol dengan dukungan lintas bermain yang mulus." },
        { title: "Infrastruktur Multiplayer", desc: "Arsitektur server yang skalabel mendukung jutaan pemain bersamaan dengan perjodohan (matchmaking) latensi rendah." },
        { title: "Visual Menakjubkan", desc: "Grafik generasi berikutnya didukung oleh Unity dan Unreal Engine dengan shader kustom dan sistem partikel." },
        { title: "Anti-Cheat & Keamanan", desc: "Keamanan kelas enterprise melindungi data pemain dan memastikan gameplay kompetitif yang adil." },
        { title: "Analitik Langsung", desc: "Analitik perilaku pemain waktu nyata, pelacakan retensi, dan dasbor pengoptimalan monetisasi." },
        { title: "Siap Live Ops", desc: "Pengiriman konten dinamis untuk acara, musim, battle pass, dan pengujian A/B tanpa pembaruan aplikasi." }
      ],
      showcaseBadge: "Proyek Kami",
      showcaseHeading: "Game yang Dicintai\nPara Pemain",
      showcaseDesc: "Dari konsep hingga peluncuran puncak tangga lagu — jelajahi portofolio game kami di setiap genre.",
      gameGenres: [
        { genre: "Balapan", title: "Sensasi Kecepatan Tinggi", desc: "Pengalaman balapan yang mendebarkan dengan fisika realistis, trek menakjubkan, dan kompetisi multiplayer." },
        { genre: "Olahraga", title: "Juara Atletik", desc: "Simulasi olahraga imersif yang menangkap keseruan arena dengan mekanisme gameplay yang realistis." },
        { genre: "Strategi", title: "Penguasaan Taktis", desc: "Gameplay strategis mendalam yang menantang pikiran Anda — bangun kerajaan, pimpin pasukan, dan akali lawan." },
        { genre: "Pertarungan", title: "Arena Pertempuran", desc: "Game pertarungan intens dengan sistem pertarungan yang mulus, karakter unik, dan mode peringkat kompetitif." }
      ],
      statsHeading: "Dalam Angka",
      stats: [
        { value: "50Jt+", label: "Unduhan" },
        { value: "200+", label: "Game Dirilis" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "4.8★", label: "Rata-rata Rating" }
      ],
      testimonialsBadge: "Testimonial Klien",
      testimonialsHeading: "Apa Kata Mitra Kami",
      testimonials: [
        { quote: "plus. merevolusi peluncuran game kami dengan solusi khusus mereka. Keahlian dan dukungan mereka sangat berharga dalam mencapai tujuan kami.", name: "Emily Carter", location: "Rivertown, CA" },
        { quote: "Solusi mutakhir dan panduan ahli mereka benar-benar meningkatkan performa game kami. Retensi pemain meningkat 340% dalam 3 bulan.", name: "Andrew Walker", location: "Omaha, NE" },
        { quote: "plus. mengubah game mobile kami dengan solusi cloud mereka. Transisi dari beta ke live sangat mulus dan efisien.", name: "Nicole Brown", location: "Austin, TX" }
      ],
      ctaBadge: "Siap untuk Merilis?",
      ctaHeading1: "Ubah Visi Game Anda",
      ctaHeading2: "Menjadi Kenyataan",
      ctaDesc: "Studio berpikiran maju yang berdedikasi menghadirkan pengalaman gaming inovatif yang mendorong kesuksesan bagi setiap klien.",
      ctaCta1: "Mulai Sekarang",
      ctaCta2: "Kembali ke Beranda"
    },

    /* ── Footer ── */
    footer: {
      tagline:
        "Satu platform terintegrasi untuk brand yang ingin bergerak cepat, tetap konsisten, dan tetap terlihat premium \u2014 didukung AI dan kreativitas nyata.",
      productsLabel: "Produk",
      companyLabel: "Perusahaan",
      connectLabel: "Terhubung",
      contactUs: "Hubungi Kami \u2192",
      copyright: "Hak cipta dilindungi.",
      aboutUs: "Tentang Kami",
      ourWork: "Karya Kami",
      services: "Layanan",
      blog: "Blog",
    },
  },
} as const;

// Use a mapped type so both locales are assignable to Translations
export type Translations = {
  [K in keyof (typeof translations)["en"]]: (typeof translations)["en"][K];
};
