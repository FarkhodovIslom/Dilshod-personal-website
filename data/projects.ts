import type {Project} from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'e-commerce-platform',
    category: 'web',
    client: 'TechStore UZ',
    duration: '3 months',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    summary: 'Full-featured e-commerce platform with product catalog, cart, checkout, and admin dashboard.',
    architecture: 'Monolithic Next.js app with Server Actions for mutations. PostgreSQL for data, Stripe for payments, Redis for session cache. ISR for product pages, dynamic rendering for cart/checkout.',
    challenges: [
      'Real-time inventory sync across concurrent users',
      'Stripe webhook handling for async payment states',
      'Multi-currency support with dynamic conversion rates'
    ],
    screenshots: [
      {src: '/projects/placeholder-1.svg', alt: 'E-commerce homepage'},
      {src: '/projects/placeholder-2.svg', alt: 'Product detail page'}
    ]
  },
  {
    id: '2',
    slug: 'fitness-tracker-app',
    category: 'mobile',
    client: 'FitLife',
    duration: '4 months',
    stack: ['React Native', 'TypeScript', 'Firebase', 'Reanimated'],
    summary: 'Cross-platform mobile app for workout tracking, nutrition logging, and progress analytics.',
    architecture: 'React Native with Expo managed workflow. Firebase Auth + Firestore for backend. Reanimated for smooth workout animations. Push notifications via Firebase Cloud Messaging.',
    challenges: [
      'Offline-first data sync with conflict resolution',
      'Complex animated workout timer with background execution',
      'Biometric authentication for quick login'
    ],
    screenshots: [
      {src: '/projects/placeholder-3.svg', alt: 'Workout tracking screen'},
      {src: '/projects/placeholder-4.svg', alt: 'Progress analytics'}
    ]
  },
  {
    id: '3',
    slug: 'restaurant-bot',
    category: 'bot',
    client: 'Green Garden',
    duration: '2 weeks',
    stack: ['Python', 'Aiogram', 'PostgreSQL', 'Docker'],
    summary: 'Telegram bot for restaurant orders, table reservations, and menu browsing with inline keyboards.',
    architecture: 'Aiogram 3.x with FSM for multi-step order flow. PostgreSQL for orders and menu. Docker for deployment. Webhook mode for production, polling for development.',
    challenges: [
      'Multi-step order flow with inline keyboard navigation',
      'Table reservation time-slot management',
      'Integration with kitchen display system via WebSocket'
    ],
    screenshots: [
      {src: '/projects/placeholder-5.svg', alt: 'Bot menu interface'},
      {src: '/projects/placeholder-6.svg', alt: 'Order flow'}
    ]
  },
  {
    id: '4',
    slug: 'education-mini-app',
    category: 'mini-app',
    client: 'EduTech',
    duration: '6 weeks',
    stack: ['React', 'TypeScript', 'Telegram WebApp API', 'Supabase'],
    summary: 'Telegram Mini App for interactive courses, quizzes, and certificate generation.',
    architecture: 'React SPA using Telegram WebApp SDK for native integration. Supabase for auth, database, and storage. Serverless functions for certificate PDF generation. TON connect for premium course payments.',
    challenges: [
      'Seamless Telegram WebApp ↔ bot data synchronization',
      'Real-time quiz with timer and leaderboard',
      'PDF certificate generation with custom templates'
    ],
    screenshots: [
      {src: '/projects/placeholder-1.svg', alt: 'Course catalog'},
      {src: '/projects/placeholder-2.svg', alt: 'Quiz interface'}
    ]
  },
  {
    id: '5',
    slug: 'corporate-website',
    category: 'design',
    client: 'BuildPro',
    duration: '3 weeks',
    stack: ['Figma', 'Tailwind CSS', 'Next.js'],
    summary: 'Corporate website design with modern aesthetics, responsive layouts, and brand identity system.',
    architecture: 'Design-first approach: Figma mockups with auto-layout components, design tokens exported to Tailwind config. Pixel-perfect Next.js implementation with CSS modules for complex layouts.',
    challenges: [
      'Consistent design system across 15+ page templates',
      'Dark mode support without design duplication',
      'Complex image gallery with masonry layout'
    ],
    screenshots: [
      {src: '/projects/placeholder-3.svg', alt: 'Homepage design'},
      {src: '/projects/placeholder-4.svg', alt: 'Services page'}
    ]
  },
  {
    id: '6',
    slug: 'logistics-dashboard',
    category: 'web',
    client: 'FastCargo',
    duration: '5 months',
    stack: ['Next.js', 'TypeScript', 'Mapbox', 'WebSocket', 'Prisma'],
    summary: 'Real-time logistics dashboard with live map tracking, driver management, and route optimization.',
    architecture: 'Next.js App Router with Prisma ORM. Mapbox GL for map rendering. WebSocket server for real-time driver location updates. Background job queue for route recalculation.',
    challenges: [
      'Real-time map updates with 100+ concurrent markers',
      'Route optimization with traffic data integration',
      'Complex permission system for multi-role access'
    ],
    screenshots: [
      {src: '/projects/placeholder-5.svg', alt: 'Dashboard overview'},
      {src: '/projects/placeholder-6.svg', alt: 'Map tracking view'}
    ]
  },
  {
    id: '7',
    slug: 'payment-gateway-bot',
    category: 'bot',
    client: 'PayLink',
    duration: '3 weeks',
    stack: ['Node.js', 'Telegraf', 'Stripe', 'Redis'],
    summary: 'Telegram bot for invoice creation, payment link generation, and transaction history.',
    architecture: 'Telegraf.js bot framework with Redis for session state. Stripe Checkout for payment processing. Webhook handler for payment confirmations. Admin panel via inline commands.',
    challenges: [
      'Secure payment link generation with expiry logic',
      'Multi-currency invoice formatting',
      'Transaction receipt generation as PDF'
    ],
    screenshots: [
      {src: '/projects/placeholder-1.svg', alt: 'Invoice creation'},
      {src: '/projects/placeholder-2.svg', alt: 'Transaction history'}
    ]
  },
  {
    id: '8',
    slug: 'social-mini-app',
    category: 'mini-app',
    client: 'ConnectUZ',
    duration: '8 weeks',
    stack: ['React', 'TypeScript', 'Telegram WebApp', 'Supabase', 'WebRTC'],
    summary: 'Social networking Mini App with profiles, posts, comments, and real-time chat.',
    architecture: 'React with Telegram WebApp SDK. Supabase for database and realtime subscriptions. WebRTC for peer-to-peer voice calls. Image optimization pipeline for user uploads.',
    challenges: [
      'Real-time feed with infinite scroll and optimistic updates',
      'WebRTC call setup through Telegram bot as signaling server',
      'Content moderation with automated + manual review'
    ],
    screenshots: [
      {src: '/projects/placeholder-3.svg', alt: 'Social feed'},
      {src: '/projects/placeholder-4.svg', alt: 'Chat interface'}
    ]
  },
  {
    id: '9',
    slug: 'booking-app',
    category: 'mobile',
    client: 'BookNow',
    duration: '3 months',
    stack: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
    summary: 'Cross-platform booking app for salons and service providers with calendar and payments.',
    architecture: 'Flutter with BLoC state management. Firebase for backend services. Stripe for deposits and full payments. Google Calendar API for sync. Push notifications for reminders.',
    challenges: [
      'Complex calendar widget with real-time availability',
      'Double-booking prevention with atomic transactions',
      'Offline queue for booking creation in poor connectivity'
    ],
    screenshots: [
      {src: '/projects/placeholder-5.svg', alt: 'Booking calendar'},
      {src: '/projects/placeholder-6.svg', alt: 'Service selection'}
    ]
  }
];
