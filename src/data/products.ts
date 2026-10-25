import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // 1. BOOKS & ACADEMIC REFERENCE (15 items)
  // ==========================================
  {
    id: 'book-01',
    title: 'Higher Engineering Mathematics — Dr. B.S. Grewal (44th Ed)',
    subtitle: 'Comprehensive calculus, differential equations, linear algebra & transforms.',
    category: 'books',
    condition: 'New',
    price: 890,
    originalPrice: 1100,
    rating: 4.9,
    ratingCount: 342,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The mandatory reference for university engineering mathematics across all semester 1 and 2 curricula. Features step-by-step solved university question paper solutions, Laplace transform tables, and Fourier analysis guides.',
    specifications: {
      'Author': 'Dr. B.S. Grewal',
      'Publisher': 'Khanna Publishers',
      'Edition': '44th Revised & Enlarged Edition',
      'Pages': '1340 Pages',
      'Binding': 'Hardcover with formula foldout chart'
    },
    department: 'First Year Common Engineering',
    brand: 'Khanna Publishers',
    badge: 'Best Seller',
    featured: true,
    isBestseller: true,
  },
  {
    id: 'book-02',
    title: 'Data Structures & Algorithms in C++ (Mark Allen Weiss)',
    subtitle: 'Master algorithmic complexity, tree traversals, graphs, and competitive coding.',
    category: 'books',
    condition: 'New',
    price: 740,
    originalPrice: 950,
    rating: 4.8,
    ratingCount: 198,
    stock: 18,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Standard textbook for CS and IT undergraduate branches. Delves into Big-O analysis, balanced search trees, Dijkstra algorithms, hashing, and dynamic programming implementations in clean C++.',
    specifications: {
      'Author': 'Mark Allen Weiss',
      'Publisher': 'Pearson Education',
      'Edition': '4th Global Edition',
      'Department': 'Computer Science & Engineering',
      'Language': 'English'
    },
    department: 'Computer Science & Engineering',
    brand: 'Pearson',
    isTrending: true,
  },
  {
    id: 'book-03',
    title: 'Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal',
    subtitle: 'Over 5500 practice problems for campus placement, GATE, CAT, and GRE prep.',
    category: 'books',
    condition: 'New',
    price: 520,
    originalPrice: 799,
    rating: 4.9,
    ratingCount: 840,
    stock: 45,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The indisputable bible for campus placement screening tests. Covers arithmetic ability, data interpretation, probability, permutation & combination, speed tests, and memory shortcuts.',
    specifications: {
      'Author': 'Dr. R.S. Aggarwal',
      'Publisher': 'S. Chand Publishing',
      'Focus': 'Campus Placement Aptitude & Bank/Govt Exams',
      'Pages': '960 Pages'
    },
    department: 'Campus Placement & Aptitude',
    brand: 'S. Chand',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'book-04',
    title: 'GATE 2027 Computer Science & IT Topicwise Solved Papers',
    subtitle: 'Previous 25 years question papers with detailed step-by-step verified explanations.',
    category: 'books',
    condition: 'New',
    price: 680,
    originalPrice: 990,
    rating: 4.7,
    ratingCount: 120,
    stock: 14,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Comprehensive topic-wise compilation of previous 25 years GATE CS questions. Divided into Theory of Computation, Compiler Design, OS, DBMS, Computer Networks, and Discrete Math.',
    specifications: {
      'Publisher': 'Made Easy Publications',
      'Department': 'Computer Science & IT',
      'Years Covered': '2001 - 2026',
      'Edition': 'Annual Exam Prep Edition'
    },
    department: 'GATE & Higher Studies',
    brand: 'Made Easy',
    isDeal: true,
    dealEndsInHours: 12,
  },
  {
    id: 'book-05',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    subtitle: 'Robert C. Martin (Uncle Bob) — The classic guide to readable, maintainable software.',
    category: 'books',
    condition: 'New',
    price: 620,
    originalPrice: 899,
    rating: 4.9,
    ratingCount: 412,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential reading for any student aiming for top tech intern or SDE roles. Teaches the principles of meaningful naming, small single-responsibility functions, error handling, unit testing, and code hygiene.',
    specifications: {
      'Author': 'Robert C. Martin',
      'Publisher': 'Prentice Hall',
      'Target': 'Aspiring Software Developers',
      'Pages': '464 Pages'
    },
    department: 'Computer Science & Coding',
    brand: 'Prentice Hall',
    badge: 'Senior Pick',
  },
  {
    id: 'book-06',
    title: 'Introduction to Algorithms (CLRS) — 4th Edition',
    subtitle: 'The internationally acclaimed computer science reference by Cormen, Leiserson, Rivest, Stein.',
    category: 'books',
    condition: 'New',
    price: 1450,
    originalPrice: 1999,
    rating: 4.9,
    ratingCount: 520,
    stock: 10,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The definitive textbook for university algorithm design courses worldwide. Covers divide-and-conquer, greedy algorithms, graph algorithms, linear programming, multithreaded algorithms, and NP-completeness.',
    specifications: {
      'Authors': 'T. Cormen, C. Leiserson, R. Rivest, C. Stein',
      'Publisher': 'MIT Press / PHI',
      'Edition': '4th Eastern Economy Edition',
      'Pages': '1312 Pages'
    },
    department: 'Computer Science & IT',
    brand: 'MIT Press',
    featured: true,
  },
  {
    id: 'book-07',
    title: 'Atomic Habits by James Clear',
    subtitle: 'An easy & proven way to build hostel study habits and break exam procrastination.',
    category: 'books',
    condition: 'New',
    price: 340,
    originalPrice: 499,
    rating: 4.9,
    ratingCount: 960,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The number one hostel non-fiction read for university freshmen adjusting to autonomous college life. Learn the four laws of behavior change to optimize coding practice, gym workouts, and study routines.',
    specifications: {
      'Author': 'James Clear',
      'Publisher': 'Random House Business',
      'Type': 'Self-Development & Habit Formation'
    },
    department: 'General Reading',
    brand: 'Penguin',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'book-08',
    title: 'Modern Control Engineering (5th Edition) — Katsuhiko Ogata',
    subtitle: 'Root locus, frequency-response analysis, state-space systems & MATLAB simulations.',
    category: 'books',
    condition: 'New',
    price: 810,
    originalPrice: 1150,
    rating: 4.6,
    ratingCount: 88,
    stock: 8,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mandatory reference textbook for Electrical, Electronics, and Instrumentation students in semesters 4 and 5. Features extensive Laplace transform control loop designs and bode plot guides.',
    specifications: {
      'Author': 'Katsuhiko Ogata',
      'Publisher': 'Pearson',
      'Department': 'Electrical & Electronics',
      'Pages': '912 Pages'
    },
    department: 'Electrical & Instrumentation',
    brand: 'Pearson',
  },
  {
    id: 'book-09',
    title: 'University Physics with Modern Physics — Young & Freedman',
    subtitle: 'Mechanics, thermodynamics, electrostatics, optics, and quantum fundamentals.',
    category: 'books',
    condition: 'New',
    price: 1199,
    originalPrice: 1650,
    rating: 4.8,
    ratingCount: 145,
    stock: 12,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'First-year engineering physics bible. Richly illustrated with experimental setups, worked problems, calculus-based derivations, and conceptual checkpoints.',
    specifications: {
      'Authors': 'Hugh D. Young, Roger A. Freedman',
      'Publisher': 'Pearson',
      'Edition': '15th Edition (SI Units)',
      'Pages': '1600 Pages'
    },
    department: 'Engineering Physics',
    brand: 'Pearson',
  },
  {
    id: 'book-10',
    title: 'Cracking the Coding Interview — 189 Programming Questions',
    subtitle: 'Gayle Laakmann McDowell — The essential preparation guide for tech placements.',
    category: 'books',
    condition: 'New',
    price: 699,
    originalPrice: 999,
    rating: 4.9,
    ratingCount: 710,
    stock: 28,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Packed with 189 real interview problems from Google, Amazon, Microsoft, and Meta. Detailed explanations, Big-O trade-offs, and behavioral interview coaching.',
    specifications: {
      'Author': 'Gayle Laakmann McDowell',
      'Publisher': 'CareerCup',
      'Pages': '708 Pages',
      'Condition': 'New'
    },
    department: 'Computer Science & Coding',
    brand: 'CareerCup',
    badge: 'Senior Pick',
  },
  {
    id: 'book-11',
    title: 'A Course in Aptitude Reasoning — Verbal & Non-Verbal (Syllabus Edition)',
    subtitle: 'Blood relations, coding-decoding, syllogisms, and seating arrangement puzzles.',
    category: 'books',
    condition: 'New',
    price: 399,
    originalPrice: 599,
    rating: 4.7,
    ratingCount: 220,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pocket-friendly campus interview reasoning handbook. Contains 3,000+ speed practice questions with step-by-step matrix solutions for campus day-1 hiring drives.',
    specifications: {
      'Publisher': 'Arihant Experts',
      'Target': 'Campus Recruitment Tests',
      'Pages': '640 Pages'
    },
    department: 'Campus Placement & Aptitude',
    brand: 'Arihant',
    badge: 'Under ₹499',
  },
  {
    id: 'book-12',
    title: 'Operating System Concepts (10th Silberschatz Dinosaur Book)',
    subtitle: 'Processes, concurrency, virtualization, memory management, and file systems.',
    category: 'books',
    condition: 'New',
    price: 840,
    originalPrice: 1120,
    rating: 4.8,
    ratingCount: 165,
    stock: 15,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The world-famous dinosaur book on operating systems. Teaches multi-threaded architecture, kernel interrupts, POSIX threads, deadlock avoidance, and Linux paging algorithms.',
    specifications: {
      'Authors': 'Silberschatz, Galvin, Gagne',
      'Publisher': 'Wiley India',
      'Edition': '10th Edition',
      'Pages': '976 Pages'
    },
    department: 'Computer Science & IT',
    brand: 'Wiley',
  },

  // ==========================================
  // 2. ELECTRONICS & TECH ACCESSORIES (15 items)
  // ==========================================
  {
    id: 'elec-01',
    title: 'Sony WH-1000XM5 Studio Active Noise Cancelling Headphones',
    subtitle: 'Industry-leading noise cancellation, 30-hour battery & clear hostel study focus.',
    category: 'electronics',
    condition: 'New',
    price: 7499,
    originalPrice: 9999,
    rating: 4.9,
    ratingCount: 89,
    stock: 12,
    isSecondHand: false,
    images: [
      '/src/assets/images/product_wireless_headphones_1792932187746.jpg',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Block out noisy hostel corridors, late-night video games, and busy library murmurs with industry-leading dual-processor ANC. Features ultra-comfortable pressure-relieving vegan leather ear cushions for 6+ hour study marathons.',
    specifications: {
      'Battery Life': '30 Hours with ANC On, 40 Hours with ANC Off',
      'Quick Charge': '3 min charge gives 3 hours playback',
      'Microphones': '8 microphones for crystal-clear seminar & Viva calls',
      'Connectivity': 'Bluetooth 5.3 Multi-point (Laptop + Phone simultaneous)'
    },
    department: 'Audio & Tech',
    brand: 'Sony',
    badge: 'Best Seller',
    featured: true,
    isBestseller: true,
    isTrending: true,
  },
  {
    id: 'elec-02',
    title: '8-in-1 Aluminium USB-C Hub & 4K HDMI Multiport Adapter',
    subtitle: '4K HDMI @60Hz, 100W Power Delivery pass-through, 3x USB 3.0, SD/TF card reader.',
    category: 'electronics',
    condition: 'New',
    price: 1499,
    originalPrice: 2499,
    rating: 4.7,
    ratingCount: 104,
    stock: 19,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential accessory for modern MacBooks and ultrabooks with USB-C ports only. Connect to lab projectors, smart classroom displays, pen drives, and Ethernet during semester project demonstrations.',
    specifications: {
      'Ports': 'HDMI 4K, 100W PD Type-C, 3x USB 3.0 (5Gbps), SD Slot, MicroSD Slot',
      'Build': 'Space Gray Anodized Aluminum alloy for heat dissipation',
      'Compatibility': 'MacBook Air/Pro, Windows Type-C Laptops, iPad Pro, Android OTG'
    },
    department: 'Tech & Lifestyle',
    brand: 'Anker',
    badge: 'Hot Deal',
    isTrending: true,
  },
  {
    id: 'elec-03',
    title: 'Premium Ergonomic Aluminum Laptop Stand (Foldable)',
    subtitle: '6-level height adjustment, hollow heat dissipation, fits 10" to 17.3" laptops.',
    category: 'electronics',
    condition: 'New',
    price: 599,
    originalPrice: 1199,
    rating: 4.7,
    ratingCount: 153,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Saves your neck and cervical spine from slouching during long coding assignments or online lectures. Folds down to the size of a ruler and slides into your college backpack.',
    specifications: {
      'Material': 'Aviation grade CNC Aluminum with anti-slip silicone cushions',
      'Elevation': 'Adjustable from 2.15 inches up to 6 inches eye-level',
      'Folded Size': '24cm x 4.5cm x 1.5cm'
    },
    department: 'Tech & Lifestyle',
    brand: 'Portronics',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'elec-04',
    title: 'Logitech K380 Multi-Device Silent Bluetooth Keyboard',
    subtitle: 'Connect up to 3 devices simultaneously (Laptop, Tablet, Phone) with 2-year battery life.',
    category: 'electronics',
    condition: 'New',
    price: 2495,
    originalPrice: 3295,
    rating: 4.8,
    ratingCount: 310,
    stock: 14,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The favorite keyboard of campus programmers. Whisper-quiet concave keys won’t disturb roommates during midnight coding assignments. Instant switching between laptop and iPad with Easy-Switch keys.',
    specifications: {
      'Layout': 'Compact Tenkeyless (TKL)',
      'Connectivity': 'Bluetooth Low Energy 5.1',
      'Battery': '2x AAA (included, up to 24 months)',
      'Weight': '423 grams'
    },
    department: 'Tech & Lifestyle',
    brand: 'Logitech',
  },
  {
    id: 'elec-05',
    title: 'Logitech Pebble M350 Wireless Silent Click Mouse',
    subtitle: '90% noise reduction, dual Bluetooth & 2.4GHz USB dongle connectivity.',
    category: 'electronics',
    condition: 'New',
    price: 1395,
    originalPrice: 1995,
    rating: 4.7,
    ratingCount: 280,
    stock: 22,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Slim, pocketable, and dead-silent mouse. Click freely in the central library without receiving annoyed glances from other students. Operates on almost any desk surface without a mousepad.',
    specifications: {
      'DPI': '1000 High-Precision Optical Tracking',
      'Battery Life': '18 months on single AA',
      'Weight': '100g with battery'
    },
    department: 'Tech & Lifestyle',
    brand: 'Logitech',
  },
  {
    id: 'elec-06',
    title: 'Mi 20,000mAh 18W Fast Charging Power Bank with Triple Output',
    subtitle: 'Two-way fast charging, low current mode for TWS earbuds & fitness bands.',
    category: 'electronics',
    condition: 'New',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    ratingCount: 650,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1609592426815-54641662c2f7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Survive day-long hackathons, field trips, and campus electrical outages. Charges typical smartphones up to 4.5 times. Multi-layer circuit protection against overheating and short-circuits.',
    specifications: {
      'Capacity': '20,000 mAh Lithium Polymer',
      'Outputs': '2x USB-A (18W) + 1x Type-C (18W)',
      'Input': 'Type-C & Micro-USB fast charging'
    },
    department: 'Tech & Power',
    brand: 'Xiaomi',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'elec-07',
    title: 'Realme Buds Air 5 Pro TWS Earbuds with 50dB Hybrid ANC',
    subtitle: 'Hi-Res Audio LDAC, 40-hour playback & 40ms ultra-low latency gaming mode.',
    category: 'electronics',
    condition: 'New',
    price: 3999,
    originalPrice: 5499,
    rating: 4.7,
    ratingCount: 140,
    stock: 16,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Affordable high-fidelity earbuds with flagship noise cancellation. Ideal for studying in noisy cafeterias, listening to audio lectures on the campus shuttle, or casual gaming.',
    specifications: {
      'Driver': '11mm Bass Driver + 6mm Micro-planar Tweeter',
      'Water Resistance': 'IPX5 Water Resistant',
      'Noise Cancellation': '50dB Active Noise Cancellation with 6 Mics'
    },
    department: 'Audio & Tech',
    brand: 'Realme',
    isDeal: true,
    dealEndsInHours: 10,
  },
  {
    id: 'elec-08',
    title: 'Boat Stone 350 10W Portable Bluetooth Speaker (IPX7 Waterproof)',
    subtitle: 'Dynamic stereo sound, 12 hours playtime & rugged shockproof design for hostel rooms.',
    category: 'electronics',
    condition: 'New',
    price: 1299,
    originalPrice: 2490,
    rating: 4.6,
    ratingCount: 420,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The go-to speaker for hostel weekend birthday celebrations, terrace chill sessions, and inter-wing music battles. Compact cylindrical design with tough fabric grill and lanyard strap.',
    specifications: {
      'Power Output': '10W RMS with deep bass radiator',
      'Battery': '2200 mAh (12 Hours Playtime)',
      'Water Resistance': 'IPX7 certified waterproof'
    },
    department: 'Audio & Tech',
    brand: 'boAt',
    badge: 'Hot Deal',
  },
  {
    id: 'elec-09',
    title: '65W GaN Fast Charger with 3 Ports (2x Type-C + 1x USB-A)',
    subtitle: 'Charge your laptop and two smartphones simultaneously from a single compact wall plug.',
    category: 'electronics',
    condition: 'New',
    price: 1699,
    originalPrice: 2899,
    rating: 4.8,
    ratingCount: 95,
    stock: 18,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Replace heavy brick laptop chargers with this pocket-sized Gallium Nitride (GaN) plug. Delivers full 65W PD to MacBook Air, Dell XPS, ThinkPad, and HP Spectre laptops.',
    specifications: {
      'Technology': 'Gallium Nitride (GaN III)',
      'Outputs': 'Type-C1 (65W), Type-C2 (65W), USB-A (30W)',
      'Safety': 'Over-voltage, surge, and thermal throttling protection'
    },
    department: 'Tech & Power',
    brand: 'Ambrane',
    isTrending: true,
  },
  {
    id: 'elec-10',
    title: 'Fire-Boltt Phoenix Bluetooth Calling Smartwatch (1.43" AMOLED)',
    subtitle: 'Heart rate, SpO2, 120+ sports modes, AI voice assistant & 7-day battery life.',
    category: 'electronics',
    condition: 'New',
    price: 1799,
    originalPrice: 3999,
    rating: 4.5,
    ratingCount: 310,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Track daily steps between academic buildings, receive lecture reminders and timetable alerts directly on your wrist, and answer incoming calls hands-free during campus walks.',
    specifications: {
      'Display': '1.43" High-Brightness AMOLED Display (466x466 px)',
      'Sensors': 'Optical Heart Rate, SpO2, Sleep Monitor',
      'Battery': 'Up to 7 days standby, 3 days with BT Calling'
    },
    department: 'Wearables & Tech',
    brand: 'Fire-Boltt',
    badge: 'Hot Deal',
  },
  {
    id: 'elec-11',
    title: 'Braided 100W USB-C to USB-C Cable (2 Meters / 6.6 Ft)',
    subtitle: 'Nylon braided, E-marker smart chip, 480Mbps data transfer & ultra-durable strain relief.',
    category: 'electronics',
    condition: 'New',
    price: 349,
    originalPrice: 699,
    rating: 4.7,
    ratingCount: 180,
    stock: 60,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tired of short 1-meter cables that cannot reach hostel bunk bed sockets? This 2-meter heavy-duty braided cable handles 100W rapid charging for both laptops and smartphones.',
    specifications: {
      'Length': '2 Meters (6.6 Feet)',
      'Power Rating': '100W (20V/5A Power Delivery)',
      'Bending Test': 'Tested for 20,000+ bends'
    },
    department: 'Cables & Accessories',
    brand: 'Portronics',
    badge: 'Under ₹499',
  },
  {
    id: 'elec-12',
    title: 'Casio FX-991CW ClassWiz Scientific Calculator',
    subtitle: 'Natural textbook display, 540+ functions, university exam approved.',
    category: 'electronics',
    condition: 'New',
    price: 1395,
    originalPrice: 1595,
    rating: 4.9,
    ratingCount: 310,
    stock: 45,
    isSecondHand: false,
    images: [
      '/src/assets/images/product_scientific_calculator_1792932257416.jpg'
    ],
    description: 'The standard calculator for engineering students. Features high-resolution 4-gradation LCD, spreadsheet calculation, matrix 4x4, integration and differential equation solving.',
    specifications: {
      'Display': 'High Resolution 4-Gradation Natural Display',
      'Functions': '540+ Functions including Matrix, Vector, Stats',
      'Exam Approved': 'AICTE, UGC, Anna Univ, VTU, Mumbai Univ Approved'
    },
    department: 'Engineering & Mathematics',
    brand: 'Casio',
    badge: 'Best Seller',
    featured: true,
    isBestseller: true,
  },

  // ==========================================
  // 3. STATIONERY & EXAM SUPPLIES (12 items)
  // ==========================================
  {
    id: 'stat-01',
    title: 'Classmate Pulse Spiral Notebook (Pack of 6, 300 Pages Each)',
    subtitle: 'Single line, 70 GSM elemental chlorine-free paper with detachable bookmark dividers.',
    category: 'stationery',
    condition: 'New',
    price: 480,
    originalPrice: 650,
    rating: 4.8,
    ratingCount: 520,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The quintessential college notebook pack. One notebook per semester subject. Thick, bleed-resistant 70 GSM paper handles gel pens, highlighters, and fountain pens without ghosting.',
    specifications: {
      'Pack Size': '6 Spiral Bound Notebooks',
      'Pages': '300 Pages each (Total 1800 Pages)',
      'Paper': '70 GSM Bright White Smooth Paper'
    },
    department: 'Stationery',
    brand: 'Classmate',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'stat-02',
    title: 'Schneider One Business Rollerball Pens (Set of 4, Assorted Colours)',
    subtitle: 'Ultra-smooth waterproof ink, 0.6mm needle tip & ergonomic rubberized barrel.',
    category: 'stationery',
    condition: 'New',
    price: 360,
    originalPrice: 480,
    rating: 4.9,
    ratingCount: 210,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1585336261026-77894a974e5b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered in Germany for fast handwriting during 3-hour university theory exams. Free-flowing liquid ink prevents hand fatigue during non-stop note taking.',
    specifications: {
      'Tip Size': '0.6mm Precision Needle Tip',
      'Colours': 'Blue, Black, Red, Green',
      'Ink': 'Document-proof waterproof archival ink'
    },
    department: 'Stationery',
    brand: 'Schneider',
    badge: 'Under ₹499',
  },
  {
    id: 'stat-03',
    title: 'Stabilo Boss Original Pastel Highlighters (Set of 6)',
    subtitle: 'Soft pastel shades, anti-dry-out technology (4 hours cap-off time), chisel tip.',
    category: 'stationery',
    condition: 'New',
    price: 420,
    originalPrice: 550,
    rating: 4.9,
    ratingCount: 390,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Soft pastel colors highlight textbook lines and revision sheets without overwhelming the eyes or bleeding through thin paper. Chisel tip creates 2mm and 5mm stroke widths.',
    specifications: {
      'Shades': 'Milky Yellow, Pink Blush, Touch of Turquoise, Lilac, Mint, Peach',
      'Tip': '2mm and 5mm Dual-width Chisel Tip',
      'Origin': 'Made in Germany'
    },
    department: 'Stationery',
    brand: 'Stabilo',
    badge: 'Student Favorite',
  },
  {
    id: 'stat-04',
    title: 'Camlin Kokuyo Scholar Mathematical Drawing Geometry Box',
    subtitle: 'Self-centering compass, divider, 15cm ruler, 45 & 60 protractors & mechanical pencil.',
    category: 'stationery',
    condition: 'New',
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    ratingCount: 310,
    stock: 50,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision instruments for Engineering Drawing, mathematics, and physics lab diagrams. Sturdy tin container with laser-marked accurate graduations.',
    specifications: {
      'Contents': 'Compass, Divider, 15cm Ruler, 2x Set Squares, Protractor, Pencil',
      'Material': 'High-tensile zinc alloy & clear virgin plastic'
    },
    department: 'Stationery & Drawing',
    brand: 'Camlin',
    badge: 'Under ₹199',
  },
  {
    id: 'stat-05',
    title: 'Post-it Sticky Notes Cube (400 Sheets, Neon Colors)',
    subtitle: '76mm x 76mm self-adhesive sticky notes for bookmarking chapters & reminders.',
    category: 'stationery',
    condition: 'New',
    price: 195,
    originalPrice: 280,
    rating: 4.8,
    ratingCount: 410,
    stock: 45,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stick formula summaries on your hostel study desk, flag pending assignments in textbooks, and organize your weekly exam study schedule.',
    specifications: {
      'Size': '3 in x 3 in (76mm x 76mm)',
      'Sheet Count': '400 Sheets in vibrant neon yellow, pink, green, orange',
      'Adhesive': 'Removable without tearing pages'
    },
    department: 'Stationery',
    brand: '3M Post-it',
    badge: 'Under ₹199',
  },
  {
    id: 'stat-06',
    title: 'Luxor 5-Subject Wirebound Partition Notebook (300 Pages)',
    subtitle: 'Heavy polypropylene cover, 5 color-coded tabbed dividers with file pockets.',
    category: 'stationery',
    condition: 'New',
    price: 240,
    originalPrice: 325,
    rating: 4.7,
    ratingCount: 180,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Carry one single notebook to college for all five theory lectures instead of hauling five separate books. Includes internal storage pockets for loose syllabus printouts.',
    specifications: {
      'Dividers': '5 Polypropylene Index Dividers with Pockets',
      'Ruling': 'Single Line, 70 GSM Micro-perforated Pages',
      'Size': 'A4 Size (29.7cm x 21cm)'
    },
    department: 'Stationery',
    brand: 'Luxor',
    badge: 'Under ₹499',
  },

  // ==========================================
  // 4. COLLEGE ESSENTIALS & COMMUTER GEAR (12 items)
  // ==========================================
  {
    id: 'ess-01',
    title: 'Anchor 28L Water-Resistant Campus Commuter Backpack',
    subtitle: 'Dual padded laptop sleeve (up to 16"), luggage strap & reinforced brass hardware.',
    category: 'essentials',
    condition: 'New',
    price: 1899,
    originalPrice: 2899,
    rating: 4.8,
    ratingCount: 142,
    stock: 24,
    isSecondHand: false,
    images: [
      '/src/assets/images/product_commuter_backpack_1792932188707.jpg',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered specifically for university students carrying high-value laptops, thick reference books, and lab gear. Features water-resistant 900D Oxford fabric, anti-theft hidden pocket, and ergonomic weight distribution straps.',
    specifications: {
      'Capacity': '28 Liters',
      'Material': 'Water-Repellent 900D Polyester',
      'Compartments': '3 Main + 1 Padded Laptop + 2 Bottle Pockets',
      'Laptop Size': 'Fits up to 16.2-inch MacBooks and Gaming Laptops'
    },
    department: 'College Gear',
    brand: 'Anchor & Co.',
    badge: 'Best Seller',
    featured: true,
    isBestseller: true,
  },
  {
    id: 'ess-02',
    title: 'Milton Thermosteel 1000ml Vacuum Insulated Water Bottle',
    subtitle: '24-hour hot & cold retention, 304 food-grade stainless steel & leak-proof lid.',
    category: 'essentials',
    condition: 'New',
    price: 749,
    originalPrice: 999,
    rating: 4.9,
    ratingCount: 780,
    stock: 45,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Keeps water chilled during scorching afternoon campus lecture walks and maintains hot coffee during winter morning labs. Copper coating inside double-wall vacuum for maximum insulation.',
    specifications: {
      'Capacity': '1000 ml (1 Liter)',
      'Body': 'SUS 304 Rust-Proof Stainless Steel',
      'Retention': '24 Hours Cold / 24 Hours Hot'
    },
    department: 'Campus Essentials',
    brand: 'Milton',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'ess-03',
    title: 'Borosil Glass Lunch Box Set with Insulated Thermal Bag (Set of 3)',
    subtitle: '100% borosilicate glass, microwave safe, leak-proof airtight silicone seals.',
    category: 'essentials',
    condition: 'New',
    price: 899,
    originalPrice: 1290,
    rating: 4.8,
    ratingCount: 230,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for day-scholar students packing homemade meals from home. Reheats in campus department microwaves without leaching plastic chemicals. Dishwasher and freezer safe.',
    specifications: {
      'Containers': '3x 320ml Borosilicate Glass Containers',
      'Carry Bag': 'Thermal insulated washable fabric bag with cutlery slot',
      'Safe for': 'Microwave, Oven (without lid), Freezer'
    },
    department: 'Campus Essentials',
    brand: 'Borosil',
  },
  {
    id: 'ess-04',
    title: 'Heavy Duty Metal Retractable ID Card Badge Holder with Lanyard',
    subtitle: 'Steel wire cord, carabiner clip & reinforced card sleeve for campus entry gates.',
    category: 'essentials',
    condition: 'New',
    price: 149,
    originalPrice: 249,
    rating: 4.7,
    ratingCount: 350,
    stock: 75,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stop fumbling for your college ID card at library turnstiles and hostel security checkpoints. 60cm steel retractable wire lets you tap your RFID card and snaps back smoothly.',
    specifications: {
      'Cord Length': '60 cm High-Tensile Steel Wire',
      'Clip Type': 'Belt Clip + Carabiner Hook',
      'Card Holder': 'Hard acrylic clear sleeve for standard college IDs'
    },
    department: 'Campus Essentials',
    brand: 'TagSafe',
    badge: 'Under ₹199',
  },
  {
    id: 'ess-05',
    title: 'Rechargeable Eye-Care LED Study Desk Lamp with Pen Stand',
    subtitle: '3 color temperatures, stepless touch dimmer, 2000mAh battery for hostel power cuts.',
    category: 'essentials',
    condition: 'New',
    price: 649,
    originalPrice: 1099,
    rating: 4.6,
    ratingCount: 184,
    stock: 28,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Never worry about hostel room lights turning off during midnight study sessions. Flexible 360-degree goose neck directs soft flicker-free light right onto your notebook without disturbing sleeping roommates.',
    specifications: {
      'Lighting Modes': 'Warm White (3000K), Neutral (4500K), Cool White (6000K)',
      'Battery': '2000mAh USB Rechargeable (lasts 6-8 hours on medium)',
      'Features': 'Integrated stationary organizer cup and phone cradle stand'
    },
    department: 'Hostel Living',
    brand: 'Wipro',
    badge: 'Hot Deal',
  },
  {
    id: 'ess-06',
    title: 'Mesh Metal 4-Tier Desk Organizer & Document Tray',
    subtitle: 'Keep textbooks, lab manuals, pens, and assignment sheets tidy in small hostel rooms.',
    category: 'essentials',
    condition: 'New',
    price: 499,
    originalPrice: 899,
    rating: 4.7,
    ratingCount: 110,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transforms messy, cluttered hostel study tables into an organized workspace. Sliding trays accommodate standard A4 files, calculators, sticky note blocks, and staplers.',
    specifications: {
      'Material': 'Rust-resistant powder-coated wire mesh steel',
      'Tiers': '3 Sliding Shelves + 1 Top Pen & Stationery Caddy',
      'Dimensions': '35cm x 28cm x 26cm'
    },
    department: 'Hostel & Desk',
    brand: 'Solo',
    badge: 'Under ₹499',
  },

  // ==========================================
  // 5. HOSTEL ESSENTIALS & DORM LIVING (12 items)
  // ==========================================
  {
    id: 'hostel-01',
    title: 'Minimal 1.5L Stainless Steel Auto-Shutoff Electric Kettle',
    subtitle: '304 food-grade stainless steel interior, 1500W rapid boil for hostel noodles & chai.',
    category: 'hostel',
    condition: 'New',
    price: 799,
    originalPrice: 1299,
    rating: 4.7,
    ratingCount: 220,
    stock: 35,
    isSecondHand: false,
    images: [
      '/src/assets/images/product_electric_kettle_1792932256672.jpg',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The ultimate hostel survival appliance. Boils 1.5 liters in under 4 minutes. Ideal for late-night exam prep coffee, green tea, instant oatmeal, and midnight cup noodles. Dry-boil protection and cool-touch ergonomic handle.',
    specifications: {
      'Capacity': '1.5 Liters',
      'Power': '1500 Watts Rapid Heating',
      'Body': 'Double-wall Food Grade SUS 304 Stainless Steel',
      'Safety': 'Auto-Shutoff & Boil-Dry Protection'
    },
    department: 'Hostel Living',
    brand: 'Pigeon',
    badge: 'Best Seller',
    featured: true,
    isBestseller: true,
    isDeal: true,
    dealEndsInHours: 14,
  },
  {
    id: 'hostel-02',
    title: 'Anchor Spike Guard 4-Socket Extension Board with Master Switch (2 Meters)',
    subtitle: 'Overload trip protector, fire-retardant grade body & universal sockets.',
    category: 'hostel',
    condition: 'New',
    price: 389,
    originalPrice: 550,
    rating: 4.8,
    ratingCount: 490,
    stock: 55,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hostel rooms notoriously have only one wall socket per roommate. Power your laptop, phone, table lamp, and kettle safely without tripping room circuit breakers.',
    specifications: {
      'Sockets': '4 Universal AC Sockets + 1 Master Indicator Switch',
      'Cord Length': '2.0 Meters Heavy Copper Core Cable',
      'Protection': 'Surge protector with built-in thermal fuse'
    },
    department: 'Hostel Living',
    brand: 'Anchor',
    badge: 'Under ₹499',
  },
  {
    id: 'hostel-03',
    title: 'Pure Cotton Single Bed Sheet Set with Pillow Cover (144 TC)',
    subtitle: 'Breathable, fade-resistant, fits standard college hostel single cot mattresses.',
    category: 'hostel',
    condition: 'New',
    price: 499,
    originalPrice: 899,
    rating: 4.6,
    ratingCount: 160,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crisp, cooling 100% natural cotton bedsheet tailored for standard 3x6 ft hostel single beds. Pre-washed to prevent shrinkage and color bleeding during hostel laundry runs.',
    specifications: {
      'Size': 'Single Bed (60 in x 90 in / 152 cm x 228 cm)',
      'Material': '100% Pure Cotton (144 Thread Count)',
      'Includes': '1 Single Bedsheet + 1 Standard Pillow Cover'
    },
    department: 'Hostel Living',
    brand: 'AmazonBasics',
    badge: 'Under ₹499',
  },
  {
    id: 'hostel-04',
    title: 'Foldable Mesh Laundry Hamper with Sturdy Carry Handles',
    subtitle: 'Collapsible pop-up dirty clothes basket with breathable moisture-wicking mesh.',
    category: 'hostel',
    condition: 'New',
    price: 199,
    originalPrice: 349,
    rating: 4.7,
    ratingCount: 290,
    stock: 45,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Keep dirty gym clothes and weekly laundry off your hostel floor. Folds flat into a compact dinner-plate circle when not in use. Reinforced handles make trips to the washing room effortless.',
    specifications: {
      'Capacity': 'Up to 10 kg of clothes (approx 15-20 garments)',
      'Frame': 'Flexible high-spring steel wire',
      'Breathability': 'Full side mesh prevents mildew and odors'
    },
    department: 'Hostel Living',
    brand: 'Kuber',
    badge: 'Under ₹199',
  },
  {
    id: 'hostel-05',
    title: 'All-Season Microfiber Comforter / Dohar for Hostel Cot',
    subtitle: '200 GSM hypoallergenic microfibre filling, ultra-soft, lightweight warmth.',
    category: 'hostel',
    condition: 'New',
    price: 899,
    originalPrice: 1499,
    rating: 4.8,
    ratingCount: 135,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for year-round hostel living — comfortable in AC hostel rooms or mild winter months. Diamond quilting keeps the filling evenly distributed without clumping.',
    specifications: {
      'Size': 'Single (150 cm x 225 cm)',
      'Fill': '200 GSM Hollow Siliconized Microfiber',
      'Wash Care': 'Machine washable in hostel laundry'
    },
    department: 'Hostel Living',
    brand: 'Wakefit',
  },
  {
    id: 'hostel-06',
    title: 'Underbed Storage Organizer Bag with Clear Window (65 Liters)',
    subtitle: 'Keep extra jackets, winter blankets, and off-season luggage dust-free under cot.',
    category: 'hostel',
    condition: 'New',
    price: 299,
    originalPrice: 499,
    rating: 4.6,
    ratingCount: 140,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Maximize space in cramped hostel double or triple sharing rooms. Slides neatly beneath standard hostel wooden cots. Clear PVC window lets you see contents instantly.',
    specifications: {
      'Capacity': '65 Liters',
      'Material': 'Three-ply non-woven fabric with reinforced stitching',
      'Closure': 'Heavy-duty dual stainless steel zippers'
    },
    department: 'Hostel Living',
    brand: 'Kuber',
    badge: 'Under ₹499',
  },

  // ==========================================
  // 6. FASHION & COLLEGE APPAREL (12 items)
  // ==========================================
  {
    id: 'fash-01',
    title: 'Campus Heavyweight 350 GSM Fleece Oversized College Hoodie',
    subtitle: 'Drop-shoulder relaxed fit, kangaroo pocket, ribbed cuffs & minimal chest embroidery.',
    category: 'fashion',
    condition: 'New',
    price: 1199,
    originalPrice: 1999,
    rating: 4.8,
    ratingCount: 190,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The definitive college hoodie for morning 8 AM classes, library marathons, and hostel evening walks. Thick 350 GSM cotton-poly fleece keeps you toasty with a modern relaxed streetwear drape.',
    specifications: {
      'Fabric': '80% Combed Cotton, 20% Polyester (350 GSM)',
      'Fit': 'Oversized Streetwear Fit',
      'Sizes': 'S, M, L, XL, XXL'
    },
    department: 'Apparel',
    brand: 'Campus Cart Originals',
    badge: 'Student Favorite',
  },
  {
    id: 'fash-02',
    title: 'University Classic 100% Cotton Crewneck T-Shirt (Pack of 3)',
    subtitle: 'Breathable 180 GSM bio-washed cotton in Navy, Charcoal Heather & Off-White.',
    category: 'fashion',
    condition: 'New',
    price: 799,
    originalPrice: 1299,
    rating: 4.7,
    ratingCount: 310,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Everyday campus essentials pack. Pre-shrunk bio-washed cotton feels ultra-soft against skin and stays in shape through repeated hostel laundry cycles.',
    specifications: {
      'Pack': '3 T-Shirts (Navy Blue, Charcoal, Chalk White)',
      'Material': '100% Super Combed Cotton (180 GSM)',
      'Neck': 'Lycra-ribbed crew neck'
    },
    department: 'Apparel',
    brand: 'Campus Cart',
    badge: 'Hot Deal',
  },
  {
    id: 'fash-03',
    title: 'Canvas Low-Top Lightweight College Sneakers (Unisex)',
    subtitle: 'Cushioned memory foam insole, vulcanized rubber anti-skid outsole for campus walking.',
    category: 'fashion',
    condition: 'New',
    price: 999,
    originalPrice: 1699,
    rating: 4.6,
    ratingCount: 150,
    stock: 18,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Built for universities with sprawling campuses where you walk 8,000 to 12,000 steps a day between lecture halls, mess halls, and hostel blocks. Breathable canvas keeps feet cool.',
    specifications: {
      'Upper': '100% Heavyweight Cotton Canvas',
      'Sole': 'Vulcanized Grip Rubber',
      'Insole': 'Memory Foam Comfort Footbed'
    },
    department: 'Footwear',
    brand: 'Red Tape',
    badge: 'Hot Deal',
  },
  {
    id: 'fash-04',
    title: 'Classic Denim Trucker Jacket in Vintage Washed Blue',
    subtitle: '100% rugged denim, welt pockets, brass button placket, regular university fit.',
    category: 'fashion',
    condition: 'New',
    price: 1599,
    originalPrice: 2499,
    rating: 4.8,
    ratingCount: 95,
    stock: 14,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A timeless staple for college presentation days, cultural fests, and casual outings. Pairs effortlessly over plain tees or hoodies.',
    specifications: {
      'Fabric': '13.5 oz Raw Slub Denim',
      'Closure': 'Metal Shank Buttons',
      'Pockets': '2 Chest Flap Pockets + 2 Side Welt Pockets'
    },
    department: 'Apparel',
    brand: 'Roadster',
  },
  {
    id: 'fash-05',
    title: 'Urban Baseball Cap with Embroidered Minimal University Monogram',
    subtitle: '100% cotton twill, adjustable brass buckle strap & moisture-absorbing sweatband.',
    category: 'fashion',
    condition: 'New',
    price: 349,
    originalPrice: 599,
    rating: 4.7,
    ratingCount: 180,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Keep midday sun out of your eyes during afternoon ground walks and protect bad hair days when you overslept for 8 AM chemistry lectures.',
    specifications: {
      'Profile': '6-Panel Low Profile Structured Crown',
      'Material': '100% Breathable Chino Cotton Twill',
      'Closure': 'Metal antique brass sliding buckle'
    },
    department: 'Accessories',
    brand: 'Campus Cart',
    badge: 'Under ₹499',
  },

  // ==========================================
  // 7. LAB EQUIPMENT & PROJECT GEAR (12 items)
  // ==========================================
  {
    id: 'lab-01',
    title: 'Unisex Anti-Static White Laboratory Coat (100% Drill Cotton)',
    subtitle: 'Reinforced pen pocket, 2 deep side waist pockets, knee length for chem & bio labs.',
    category: 'lab',
    condition: 'New',
    price: 499,
    originalPrice: 750,
    rating: 4.8,
    ratingCount: 380,
    stock: 50,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mandatory standard lab coat for Chemistry, Biology, Chemical Engineering, and Medical college laboratory courses. Durable drill cotton protects street clothes from chemical splashes.',
    specifications: {
      'Fabric': '100% Pre-shrunk Cotton Lab Drill (Heavy Duty)',
      'Length': 'Knee-length with back slit for easy walking',
      'Sizes': 'S (36), M (38), L (40), XL (42), XXL (44)'
    },
    department: 'Chemistry & Biology Labs',
    brand: 'LabShield',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'lab-02',
    title: 'True-RMS Digital Multimeter with Auto-Ranging & Temp Probe',
    subtitle: 'Backlit LCD, 6000 counts, continuity buzzer, frequency and capacitor testing for EE labs.',
    category: 'lab',
    condition: 'New',
    price: 1199,
    originalPrice: 1899,
    rating: 4.8,
    ratingCount: 67,
    stock: 16,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty digital multimeter required for basic electrical engineering lab, analogue electronics, and IoT / Arduino student project builds. Protective rubber holster prevents damage when carried in student backpacks.',
    specifications: {
      'Measurement': 'AC/DC Voltage, Current, Resistance, Capacitance, Frequency, Diode, Temp',
      'Safety Rating': 'CAT III 600V with ceramic fuse protection',
      'Includes': 'Gold-plated needle test leads, K-type thermocouple probe, 9V battery'
    },
    department: 'Electrical & Electronics',
    brand: 'Mastech',
    badge: 'Senior Pick',
  },
  {
    id: 'lab-03',
    title: 'IoT & Embedded Starter Kit with ESP32 Wi-Fi + Bluetooth Board',
    subtitle: 'Includes 830-tie breadboard, 65 jumper wires, sensors, LEDs & OLED display.',
    category: 'lab',
    condition: 'New',
    price: 1350,
    originalPrice: 1999,
    rating: 4.9,
    ratingCount: 110,
    stock: 15,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Complete hands-on kit for semester mini-projects, hackathons, and IoT subject practicals. Features dual-core ESP32 chip with built-in Wi-Fi and BLE, DHT11 temp sensor, ultrasonic HC-SR04, servo motor, and 0.96" I2C OLED.',
    specifications: {
      'Microcontroller': 'ESP-WROOM-32 30-Pin NodeMCU Development Board',
      'Components': '30+ Modules (Sensors, Relays, Buzzer, LEDs, Resistors)',
      'Tutorials': 'Downloadable PDF project guide & Arduino code repository'
    },
    department: 'ECE, CS & IoT Projects',
    brand: 'Robocraze',
    badge: 'Hot Deal',
  },
  {
    id: 'lab-04',
    title: 'Solderless Breadboard (830 Points) + 65 Male-to-Male Jumper Wires',
    subtitle: 'Self-adhesive base, clear colored coordinate markings, nickel-plated contact clips.',
    category: 'lab',
    condition: 'New',
    price: 199,
    originalPrice: 320,
    rating: 4.7,
    ratingCount: 280,
    stock: 60,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Standard circuit prototyping breadboard for Digital Logic Design, Analog Electronics, and micro-controller circuit testing. Interlocking tabs let you join multiple boards together.',
    specifications: {
      'Tie Points': '830 Points (2 Distribution Strips + 1 Terminal Strip)',
      'Jumper Wires': '65 Pieces Multi-color Flexible Male-to-Male Wires',
      'Wire Gauge': 'Fits 21-26 AWG (0.4-0.7mm) wires'
    },
    department: 'ECE & EEE Labs',
    brand: 'Generic Lab',
    badge: 'Under ₹199',
  },
  {
    id: 'lab-05',
    title: 'UV400 Anti-Fog Safety Goggles with Side Splash Shields',
    subtitle: 'Polycarbonate scratch-resistant lens, fits comfortably over regular spectacles.',
    category: 'lab',
    condition: 'New',
    price: 189,
    originalPrice: 299,
    rating: 4.7,
    ratingCount: 190,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mandatory eye protection for university Chemistry, Chemical, and Metallurgy labs. Indirect ventilation vents prevent fogging during experiments while blocking acid splashes.',
    specifications: {
      'Standards': 'ANSI Z87.1 & CE EN166 Certified',
      'Lens': 'Clear Optical Grade Polycarbonate (Zero Distortion)',
      'Fit': 'Adjustable elastic headband, OTG (Over The Glasses)'
    },
    department: 'Chemistry & Metallurgy',
    brand: 'SafeLab',
    badge: 'Under ₹199',
  },
  {
    id: 'lab-06',
    title: 'Professional Mini Drafter + Engineering Drawing Board Set',
    subtitle: 'Steel clamp, dual-scale protractor arm & unbreakable wooden sheet board.',
    category: 'lab',
    condition: 'New',
    price: 950,
    originalPrice: 1450,
    rating: 4.8,
    ratingCount: 220,
    stock: 18,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Complete engineering graphics kit needed for first-year Engineering Graphics / CAD fundamentals. Includes smooth mini-drafter with unchipped acrylic blades, sturdy A2 drawing board, sheet clips, and drafting tube.',
    specifications: {
      'Included': 'Mini Drafter, Protractor Arm, A2 Wooden Board, 4 Sheet Clips',
      'Brand': 'Isomars / Omega'
    },
    department: 'Civil & Mechanical Engineering',
    brand: 'Isomars',
    badge: 'Best Seller',
    isBestseller: true,
  },

  // ==========================================
  // 8. SPORTS & FITNESS (12 items)
  // ==========================================
  {
    id: 'sport-01',
    title: 'Yonex Carbon Graph Badminton Racket Set with Shuttlecocks',
    subtitle: 'Twin graphite shaft rackets, high-tension gutting, full zippered thermal carry bag.',
    category: 'fitness',
    condition: 'New',
    price: 1899,
    originalPrice: 2890,
    rating: 4.8,
    ratingCount: 210,
    stock: 15,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for hostel quad play and indoor university sports complex matches. Lightweight isometric carbon frame enlarges sweet spot for powerful smashes.',
    specifications: {
      'Weight': '4U (Approx 83g)',
      'Shaft Material': 'Full Carbon Graphite',
      'Includes': '2 Rackets + 3 Mavis 350 Nylon Shuttles + Full Cover'
    },
    department: 'Sports',
    brand: 'Yonex',
    badge: 'Best Seller',
    isBestseller: true,
  },
  {
    id: 'sport-02',
    title: 'Nivia Storm Football (Size 5, All-Weather Rubber Moulded)',
    subtitle: 'FIFA standard weight, rubberized outer bladder for rough college dirt grounds.',
    category: 'fitness',
    condition: 'New',
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    ratingCount: 380,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The legendary durable football seen on every college field across India. Tough rubberized panels withstand gravel, concrete, and wet grass without peeling.',
    specifications: {
      'Size': 'Official Size 5 (Senior)',
      'Bladder': 'Butyl Bladder for long air retention',
      'Ground Type': 'Suitable for Hard ground, Turf, and Grass'
    },
    department: 'Sports',
    brand: 'Nivia',
    badge: 'Under ₹499',
  },
  {
    id: 'sport-03',
    title: 'High-Density 6mm Anti-Skid Yoga & Workout Mat with Carry Strap',
    subtitle: 'Eco-friendly EVA foam, textured dual-surface grip for hostel floor workouts.',
    category: 'fitness',
    condition: 'New',
    price: 449,
    originalPrice: 799,
    rating: 4.7,
    ratingCount: 165,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stay fit inside your hostel room. Cushions your knees and spine during morning push-ups, planks, and yoga sessions on cold tiled hostel floors.',
    specifications: {
      'Thickness': '6mm High-Density Cushioning',
      'Dimensions': '6 Feet x 2 Feet (183cm x 61cm)',
      'Maintenance': 'Sweat-resistant, easy to wipe clean'
    },
    department: 'Fitness',
    brand: 'Boldfit',
    badge: 'Under ₹499',
  },
  {
    id: 'sport-04',
    title: 'Kore Resistance Loop Bands Set of 5 with Carry Bag',
    subtitle: '5 resistance levels (X-Light to X-Heavy) for home & hostel strength conditioning.',
    category: 'fitness',
    condition: 'New',
    price: 299,
    originalPrice: 599,
    rating: 4.6,
    ratingCount: 220,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Can’t make it to the campus gym during exam weeks? These 100% natural latex loop bands deliver full-body workouts for chest, shoulders, arms, and legs right in your dorm.',
    specifications: {
      'Material': '100% Natural Malaysian Latex',
      'Levels': 'Green (5 lbs), Blue (15 lbs), Yellow (20 lbs), Red (30 lbs), Black (40 lbs)'
    },
    department: 'Fitness',
    brand: 'Kore',
    badge: 'Under ₹499',
  },

  // ==========================================
  // 9. ART, DESIGN & CREATIVITY (10 items)
  // ==========================================
  {
    id: 'art-01',
    title: 'Brustro Artists Sketchbook (A4, 160 GSM, 100 Pages)',
    subtitle: 'Acid-free cartridge paper, wire-bound hard cover, ideal for graphite, charcoal & ink.',
    category: 'art',
    condition: 'New',
    price: 380,
    originalPrice: 499,
    rating: 4.9,
    ratingCount: 290,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential sketchbook for Architecture, Fine Arts, and Design department students. Heavyweight 160 GSM paper withstands repeated erasing and light wash without warping.',
    specifications: {
      'Size': 'A4 Size (210 x 297 mm)',
      'Paper': '160 GSM Natural White Cartridge Paper',
      'Binding': 'Double wire spiral with sturdy chipboard back'
    },
    department: 'Architecture & Design',
    brand: 'Brustro',
    badge: 'Student Favorite',
  },
  {
    id: 'art-02',
    title: 'Camlin Artists Acrylic Colour Set (12 Tubes of 20ml)',
    subtitle: 'Rich pigment concentration, fast-drying, water-soluble, glossy archival finish.',
    category: 'art',
    condition: 'New',
    price: 320,
    originalPrice: 425,
    rating: 4.8,
    ratingCount: 340,
    stock: 25,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ideal for college cultural fest poster design, architectural models, and canvas painting. Adheres to paper, wood, canvas, and clay.',
    specifications: {
      'Contents': '12 Assorted 20ml Acrylic Tubes',
      'Properties': 'Non-toxic, high lightfastness'
    },
    department: 'Fine Arts & Architecture',
    brand: 'Camlin',
    badge: 'Under ₹499',
  },
  {
    id: 'art-03',
    title: 'Sakura Pigma Micron Technical Drawing Fineliners (Set of 6)',
    subtitle: 'Archival Pigma ink, needle tips 0.2mm to 0.5mm, waterproof & fade-proof.',
    category: 'art',
    condition: 'New',
    price: 599,
    originalPrice: 850,
    rating: 4.9,
    ratingCount: 420,
    stock: 20,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1585336261026-77894a974e5b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The global standard pen for architectural drafting, perspective drawings, and detailed biology/microbiology record diagrams. Doesn’t smear when water-colored over.',
    specifications: {
      'Sizes': '005, 01, 02, 03, 05, 08 (0.20mm to 0.50mm)',
      'Ink': 'Pigma Micron Pigment Ink (PH neutral, chemically stable)',
      'Origin': 'Made in Japan'
    },
    department: 'Architecture & Design',
    brand: 'Sakura',
    badge: 'Senior Pick',
  },

  // ==========================================
  // 10. SECOND-HAND / PRE-OWNED MARKETPLACE (12 items)
  // ==========================================
  {
    id: 'used-01',
    title: 'Pre-Owned Higher Engineering Mathematics (B.S. Grewal 43rd Ed)',
    subtitle: 'Pencil margin notes from semester topper, tight spine binding, formula sheet included.',
    category: 'secondhand',
    condition: 'Like New',
    price: 450,
    originalPrice: 1100,
    rating: 4.9,
    ratingCount: 42,
    stock: 2,
    isSecondHand: true,
    seller: {
      name: 'Rohan Sharma',
      hostel: 'Hostel Block B (Aryabhatta)',
      department: 'Mechanical Engg (Final Year)',
      phone: '+91 98765 43210',
      verified: true
    },
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Used for two semesters during M1 and M2. No torn pages, clean pencil annotations on key theorems. Save over 60% compared to buying new.',
    specifications: {
      'Condition': 'Like New (Minimal shelf wear)',
      'Hostel Pickup': 'Hostel Block B Room 304 or Central Library'
    },
    department: 'First Year Common',
    badge: 'Pre-Owned',
  },
  {
    id: 'used-02',
    title: 'Hero Sprint 26T 21-Speed Gear Bicycle (Used 1 Year)',
    subtitle: 'Dual disc brakes, front suspension, includes combination wire lock & bell.',
    category: 'secondhand',
    condition: 'Used',
    price: 3499,
    originalPrice: 8500,
    rating: 4.8,
    ratingCount: 18,
    stock: 1,
    isSecondHand: true,
    seller: {
      name: 'Karthik Menon',
      hostel: 'Hostel Block D (Shivaji)',
      department: 'Civil Engg (Final Year Graduating)',
      phone: '+91 98450 77889',
      verified: true
    },
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Selling because I am graduating this semester. Great condition, smooth Shimano thumb shifters, new rear brake pads installed last month. Perfect for getting to distant department blocks quickly.',
    specifications: {
      'Frame': 'Steel Hardtail 18-inch',
      'Gears': '21 Speed Shimano Tourney',
      'Bonus': 'Free heavy steel cable lock included'
    },
    department: 'Campus Transport',
    badge: 'Pre-Owned',
  },
  {
    id: 'used-03',
    title: 'Pre-Owned Casio FX-991ES Plus Scientific Calculator (Silver)',
    subtitle: 'Tested working condition, dual solar + battery power, protective hard slide case.',
    category: 'secondhand',
    condition: 'Like New',
    price: 650,
    originalPrice: 1495,
    rating: 4.8,
    ratingCount: 26,
    stock: 3,
    isSecondHand: true,
    seller: {
      name: 'Aditi Varma',
      hostel: 'Gargi Hall (Girls Hostel 1)',
      department: 'ECE (3rd Year)',
      phone: '+91 91234 56789',
      verified: true
    },
    images: [
      '/src/assets/images/product_scientific_calculator_1792932257416.jpg'
    ],
    description: 'Cleared all my semester math and signal processing exams with this calculator. Every button is crisp and screen has zero dead pixels.',
    specifications: {
      'Condition': 'Like New (tested before listing)',
      'Functions': '417 Functions (Matrix, Vector, Solver)'
    },
    department: 'Engineering',
    badge: 'Pre-Owned',
  },
  {
    id: 'used-04',
    title: 'Used Mini Drafter + Drawing Board with Canvas Carry Bag',
    subtitle: 'Unchipped scale blades, smooth 360 protractor swivel, includes 4 steel sheet clips.',
    category: 'secondhand',
    condition: 'Like New',
    price: 490,
    originalPrice: 1350,
    rating: 4.6,
    ratingCount: 31,
    stock: 2,
    isSecondHand: true,
    seller: {
      name: 'Devendra Patel',
      hostel: 'Hostel Block A (Kalam)',
      department: 'Mechanical Engg',
      verified: true
    },
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Used for only one semester of Engineering Graphics. Don’t pay full price for something you only need for 4 months! Ready for pickup at Hostel A.',
    specifications: {
      'Condition': 'Pristine acrylic blades, zero scratches on protractor',
      'Includes': 'Mini drafter, Board, 4 Clips, Waterproof Bag'
    },
    department: 'Engineering Graphics',
    badge: 'Pre-Owned',
  },
  {
    id: 'used-05',
    title: 'Pre-Owned Dell 22-Inch Full HD IPS Monitor (75Hz, HDMI + VGA)',
    subtitle: 'Ultra-thin bezels, flicker-free, ideal for coding with dual laptop screen.',
    category: 'secondhand',
    condition: 'Used',
    price: 3800,
    originalPrice: 8999,
    rating: 4.8,
    ratingCount: 15,
    stock: 1,
    isSecondHand: true,
    seller: {
      name: 'Arjun Nambiar',
      hostel: 'Hostel Block C (C.V. Raman)',
      department: 'CSE (Final Year)',
      phone: '+91 97890 55443',
      verified: true
    },
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Selling my hostel desk external monitor before moving out for internship. Zero scratches on screen, vibrant IPS viewing angles. Power adapter and HDMI cable included.',
    specifications: {
      'Resolution': '1920 x 1080 Full HD IPS',
      'Refresh Rate': '75Hz with AMD FreeSync',
      'Pickup': 'Hostel C Room 218'
    },
    department: 'Computer Science',
    badge: 'Pre-Owned',
  },

  // ==========================================
  // 11. SNACKS & DAILY CAMPUS NECESSITIES (10 items)
  // ==========================================
  {
    id: 'snack-01',
    title: 'Hostel Exam Night Instant Noodle Mega Bundle (Pack of 12)',
    subtitle: 'Classic masala noodles — the sacred midnight fuel of Indian engineering hostel life.',
    category: 'snacks',
    condition: 'New',
    price: 168,
    originalPrice: 192,
    rating: 4.9,
    ratingCount: 610,
    stock: 80,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Keep your hostel cupboard stocked for 2 AM cramming sessions. Ready in 4 minutes with your hostel electric kettle.',
    specifications: {
      'Pack': '12 Individual 70g Packs',
      'Flavor': 'Authentic Indian Spiced Masala'
    },
    department: 'Snacks & Pantry',
    brand: 'Maggi',
    badge: 'Under ₹199',
    isBestseller: true,
  },
  {
    id: 'snack-02',
    title: 'Nescafe Classic Instant Coffee Jar (100g) + Travel Mug Bundle',
    subtitle: '100% pure robusta coffee for late-night semester exam preparations.',
    category: 'snacks',
    condition: 'New',
    price: 340,
    originalPrice: 450,
    rating: 4.8,
    ratingCount: 420,
    stock: 40,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The irreplaceable antidote to early morning 8 AM lectures. Rich dark roast aroma provides an instant mental alertness boost.',
    specifications: {
      'Weight': '100g Glass Jar (Approx 50 cups)',
      'Bonus': 'Includes 350ml double-walled polypropylene travel sipper mug'
    },
    department: 'Snacks & Pantry',
    brand: 'Nescafe',
    badge: 'Under ₹499',
  },
  {
    id: 'snack-03',
    title: 'Haldiram’s Roasted Salted Almonds & Cashews Mix (200g)',
    subtitle: 'Healthy brain snack for long library and coding sessions, rich in healthy fats.',
    category: 'snacks',
    condition: 'New',
    price: 249,
    originalPrice: 350,
    rating: 4.7,
    ratingCount: 180,
    stock: 35,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1508061252224-237ff54ed0a7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nutritious desk snack packed with Vitamin E, magnesium, and protein to keep energy high during afternoon revision breaks without sugar crashes.',
    specifications: {
      'Contents': 'California Almonds & Mangalore Cashews',
      'Packaging': 'Resealable zip-lock pouch'
    },
    department: 'Snacks & Pantry',
    brand: 'Haldiram',
    badge: 'Under ₹499',
  },
  {
    id: 'snack-04',
    title: 'Reusable Double-Walled Stainless Steel Insulated Coffee Tumbler (380ml)',
    subtitle: 'Spill-proof flip lid, keeps beverages hot for 6 hours, fits cafeteria cup holders.',
    category: 'snacks',
    condition: 'New',
    price: 399,
    originalPrice: 699,
    rating: 4.8,
    ratingCount: 220,
    stock: 30,
    isSecondHand: false,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Carry hot chai from the campus nescafe kiosk directly into air-conditioned seminar halls without spills. Matte powder-coat exterior stays condensation-free.',
    specifications: {
      'Capacity': '380 ml',
      'Material': 'Food Grade 18/8 Stainless Steel (BPA Free)',
      'Insulation': 'Double Wall Vacuum Insulated'
    },
    department: 'Daily Essentials',
    brand: 'Campus Cart',
    badge: 'Under ₹499',
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'CAMPUS20',
    discountPercent: 20,
    minOrder: 500,
    description: '20% flat discount on college orders above ₹500 (Max ₹300)'
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minOrder: 299,
    description: 'Free Express Hostel Delivery on orders above ₹299'
  },
  {
    code: 'STUDENT10',
    discountPercent: 10,
    minOrder: 300,
    description: '10% instant discount for all verified college students'
  }
];
