import { Business, BlogPost, ForumThread } from '../types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'The Coffee Corner',
    description: 'Cozy coffee shop perfect for studying with free WiFi, quiet atmosphere, and excellent pastries. Student-friendly prices and extended hours during finals week.',
    category: 'Cafés & Restaurants',
    images: [
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.8,
    reviewCount: 124,
    priceRange: '$$',
    location: {
      address: '123 University Ave',
      city: 'College Town',
      coordinates: [40.7128, -74.0060],
    },
    contact: {
      phone: '(555) 123-4567',
      email: 'hello@coffeecorner.com',
      website: 'https://coffeecorner.com',
    },
    hours: {
      'Monday': '6:00 AM - 10:00 PM',
      'Tuesday': '6:00 AM - 10:00 PM',
      'Wednesday': '6:00 AM - 10:00 PM',
      'Thursday': '6:00 AM - 10:00 PM',
      'Friday': '6:00 AM - 11:00 PM',
      'Saturday': '7:00 AM - 11:00 PM',
      'Sunday': '7:00 AM - 9:00 PM',
    },
    featured: true,
    badges: ['Student Discount', 'Free WiFi', 'Study Friendly'],
    discounts: [
      {
        title: '15% Student Discount',
        description: 'Show your student ID for 15% off all drinks',
        code: 'STUDENT15',
        validUntil: '2024-12-31',
      },
    ],
  },
  {
    id: '2',
    name: 'Campus Threads',
    description: 'Trendy clothing store with affordable fashion for college students. Latest styles, casual wear, and formal attire for all occasions.',
    category: 'Fashion & Clothing',
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.5,
    reviewCount: 89,
    priceRange: '$$',
    location: {
      address: '456 Student Plaza',
      city: 'College Town',
      coordinates: [40.7589, -73.9851],
    },
    contact: {
      phone: '(555) 234-5678',
      email: 'info@campusthreads.com',
      website: 'https://campusthreads.com',
    },
    hours: {
      'Monday': '10:00 AM - 9:00 PM',
      'Tuesday': '10:00 AM - 9:00 PM',
      'Wednesday': '10:00 AM - 9:00 PM',
      'Thursday': '10:00 AM - 9:00 PM',
      'Friday': '10:00 AM - 10:00 PM',
      'Saturday': '10:00 AM - 10:00 PM',
      'Sunday': '12:00 PM - 8:00 PM',
    },
    featured: true,
    badges: ['Student Discount', 'New Arrivals'],
    discounts: [
      {
        title: '20% Off First Purchase',
        description: 'New customers get 20% off their first order',
        code: 'WELCOME20',
        validUntil: '2024-12-31',
      },
    ],
  },
  {
    id: '3',
    name: 'University Lodge',
    description: 'Modern hotel with comfortable rooms, study spaces, and amenities perfect for visiting families and extended stays.',
    category: 'Hotels & Accommodation',
    images: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    rating: 4.7,
    reviewCount: 156,
    priceRange: '$$$',
    location: {
      address: '789 Campus Drive',
      city: 'College Town',
      coordinates: [40.7505, -73.9934],
    },
    contact: {
      phone: '(555) 345-6789',
      email: 'reservations@universitylodge.com',
      website: 'https://universitylodge.com',
    },
    hours: {
      'Monday': '24/7',
      'Tuesday': '24/7',
      'Wednesday': '24/7',
      'Thursday': '24/7',
      'Friday': '24/7',
      'Saturday': '24/7',
      'Sunday': '24/7',
    },
    featured: false,
    badges: ['Family Friendly', 'Business Center'],
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Surviving Finals Week',
    slug: 'ultimate-guide-surviving-finals-week',
    excerpt: 'Finals week doesn\'t have to be a nightmare. Here are proven strategies to help you stay organized, focused, and stress-free during the most challenging time of the semester.',
    content: `Finals week is approaching, and the stress is real. But with the right strategies and mindset, you can not only survive but thrive during this challenging time. Here's your comprehensive guide to conquering finals week like a pro.

## 1. Start Early and Create a Study Schedule

The biggest mistake students make is waiting until the last minute. Start preparing at least two weeks before your first exam. Create a detailed study schedule that breaks down your material into manageable chunks.

## 2. Find Your Perfect Study Environment

Everyone learns differently. Some students thrive in complete silence, while others need background noise. Experiment with different environments:
- Library quiet zones
- Coffee shops with ambient noise
- Your dorm room with study music
- Group study rooms

## 3. Take Care of Your Physical Health

Your brain needs fuel to function optimally. Don't sacrifice sleep and nutrition for extra study hours. Aim for:
- 7-8 hours of sleep per night
- Regular, nutritious meals
- Short exercise breaks
- Adequate hydration

## 4. Use Active Learning Techniques

Passive reading isn't enough. Try these active learning methods:
- Create flashcards for key concepts
- Teach the material to someone else
- Practice problems repeatedly
- Form study groups for discussion

## 5. Manage Stress and Anxiety

Finals stress is normal, but don't let it overwhelm you:
- Practice deep breathing exercises
- Take regular breaks
- Stay connected with friends and family
- Consider meditation or mindfulness apps

Remember, finals week is temporary. With proper preparation and self-care, you'll emerge successful and ready for your well-deserved break!`,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Psychology major and study tips enthusiast. Sarah has helped hundreds of students improve their study habits and academic performance.',
    },
    category: 'Study Tips',
    featured: true,
    heroImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    tags: ['Finals', 'Study Tips', 'Productivity', 'Stress Management'],
    likes: 234,
    comments: [
      {
        id: '1',
        content: 'This is exactly what I needed! The study schedule tip is going to save my semester.',
        author: {
          name: 'Mike Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-15T14:30:00Z',
        likes: 12,
      },
      {
        id: '2',
        content: 'Great advice! I especially love the part about active learning techniques.',
        author: {
          name: 'Emma Wilson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-16T09:15:00Z',
        likes: 8,
      },
    ],
  },
  {
    id: '2',
    title: 'College Life Memes That Hit Different During Midterms',
    slug: 'college-memes-midterms',
    excerpt: 'Sometimes you just need to laugh to keep from crying. Here are the most relatable college memes that perfectly capture the midterm struggle.',
    content: `We've all been there – it's 2 AM, you're surrounded by textbooks, surviving on energy drinks and sheer willpower. Sometimes the best medicine for academic stress is a good laugh. Here are some memes that perfectly capture the college midterm experience.

## The Midterm Reality Check

That moment when you realize you've been pronouncing a key term wrong all semester, and it's literally going to be half the test. We've all been there, and honestly? It builds character.

## The Study Group Dynamic

There's always that one person in the study group who somehow understood everything from day one, while the rest of us are just trying to figure out what chapter we're supposed to be on.

## The All-Nighter Chronicles

Energy drinks become a food group. Sleep becomes a luxury. And somehow, you become temporarily fluent in subjects you couldn't even spell yesterday.

## The Post-Exam Euphoria

That feeling when you walk out of an exam not knowing if you just aced it or completely bombed it, but you're too exhausted to care.

Remember, we're all in this together. Sometimes the best way to cope with academic stress is to find humor in the shared experience. You're not alone in feeling overwhelmed – we've all been there!`,
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Communications major with a passion for internet culture and making people laugh during stressful times.',
    },
    category: 'Lifestyle',
    featured: false,
    heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-12T16:30:00Z',
    readTime: 3,
    tags: ['Memes', 'College Life', 'Humor', 'Midterms'],
    likes: 189,
    comments: [
      {
        id: '3',
        content: '😂 The all-nighter part is too real! I literally lived on coffee last week.',
        author: {
          name: 'Jordan Lee',
          avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-12T18:45:00Z',
        likes: 15,
      },
    ],
  },
  {
    id: '3',
    title: '10 Productivity Apps Every College Student Should Know',
    slug: 'productivity-apps-college-students',
    excerpt: 'From note-taking to time management, these apps will revolutionize your academic workflow and help you stay organized throughout the semester.',
    content: `In today's digital age, the right apps can make the difference between academic chaos and organized success. Here are 10 essential productivity apps that every college student should have in their toolkit.

## 1. Notion - The All-in-One Workspace

Notion combines note-taking, project management, and database functionality in one powerful app. Create custom dashboards for each class, track assignments, and organize your entire academic life.

## 2. Forest - Gamified Focus Timer

Based on the Pomodoro Technique, Forest helps you stay focused by planting virtual trees. The longer you stay off your phone, the more your forest grows.

## 3. Grammarly - Writing Assistant

From essays to emails, Grammarly helps ensure your writing is clear, correct, and compelling. The premium version offers advanced suggestions for tone and clarity.

## 4. Todoist - Smart Task Management

Organize tasks by project, set deadlines, and create custom labels. The natural language processing makes adding tasks quick and intuitive.

## 5. Anki - Spaced Repetition Flashcards

Perfect for memorizing vocabulary, formulas, and concepts. The spaced repetition algorithm shows you cards just when you're about to forget them.

## 6. RescueTime - Automatic Time Tracking

Understand where your time actually goes with automatic tracking of your digital activities. Set goals and get insights into your productivity patterns.

## 7. Google Drive - Cloud Storage and Collaboration

Essential for backing up your work and collaborating on group projects. Access your files from anywhere and never lose an assignment again.

## 8. Calendly - Easy Scheduling

Perfect for scheduling study sessions, office hours, and group meetings. Share your availability and let others book time slots automatically.

## 9. Pocket - Save Articles for Later

Found an interesting article but don't have time to read it now? Save it to Pocket and access it later, even offline.

## 10. Headspace - Meditation and Sleep

Take care of your mental health with guided meditations, sleep stories, and mindfulness exercises designed specifically for students.

The key is to start with one or two apps and gradually incorporate others as you develop your workflow. Don't try to use everything at once – that's a recipe for overwhelm!`,
    author: {
      name: 'Taylor Kim',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Computer Science major and productivity enthusiast. Taylor loves finding new ways to optimize workflows and share tech tips with fellow students.',
    },
    category: 'Technology',
    featured: true,
    heroImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-10T12:00:00Z',
    readTime: 7,
    tags: ['Productivity', 'Apps', 'Technology', 'Organization'],
    likes: 312,
    comments: [
      {
        id: '4',
        content: 'Notion changed my life! Been using it for two years now and can\'t imagine college without it.',
        author: {
          name: 'Casey Thompson',
          avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-10T15:20:00Z',
        likes: 18,
      },
    ],
  },
];

export const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    title: 'What\'s the best coffee shop for studying near campus?',
    content: 'I\'m looking for a quiet place with good WiFi and outlets. The library gets too crowded during finals week. Any recommendations?',
    author: {
      name: 'StudyBuddy42',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    category: 'Local Spots',
    createdAt: '2024-01-14T09:30:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    upvotes: 23,
    downvotes: 2,
    userVote: 'up',
    replyCount: 8,
    replies: [
      {
        id: '1',
        content: 'The Coffee Corner on University Ave is amazing! They have a whole section dedicated to students with plenty of outlets and it\'s usually pretty quiet.',
        author: {
          name: 'CoffeeLover23',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-14T10:15:00Z',
        upvotes: 15,
        downvotes: 0,
        userVote: 'up',
      },
      {
        id: '2',
        content: 'I second The Coffee Corner! Plus they have a student discount. Just show your ID and get 15% off.',
        author: {
          name: 'BargainHunter',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-14T11:20:00Z',
        upvotes: 12,
        downvotes: 1,
      },
    ],
    isPinned: false,
    isLocked: false,
    tags: ['study-spots', 'coffee', 'recommendations'],
  },
  {
    id: '2',
    title: 'Anyone else struggling with organic chemistry?',
    content: 'This semester is killing me. The mechanisms are so confusing and I can\'t keep up with the pace. Looking for study partners or tips from anyone who\'s been through this.',
    author: {
      name: 'ChemStruggles',
      avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    category: 'Academic Help',
    createdAt: '2024-01-13T14:20:00Z',
    updatedAt: '2024-01-14T08:30:00Z',
    upvotes: 45,
    downvotes: 3,
    replyCount: 12,
    replies: [
      {
        id: '3',
        content: 'I took orgo last year and it was brutal! The key is to practice mechanisms over and over. Don\'t just memorize them, understand the electron flow.',
        author: {
          name: 'ChemSurvivor',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-13T15:45:00Z',
        upvotes: 28,
        downvotes: 1,
      },
      {
        id: '4',
        content: 'Form a study group! I\'m in the same class and would love to team up. PM me if you\'re interested.',
        author: {
          name: 'MoleculesMatter',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-13T16:30:00Z',
        upvotes: 22,
        downvotes: 0,
        userVote: 'up',
      },
    ],
    isPinned: true,
    isLocked: false,
    tags: ['organic-chemistry', 'study-group', 'academic-help'],
  },
  {
    id: '3',
    title: 'Best places to eat on a student budget?',
    content: 'The dining hall is getting old and my meal plan is running low. What are some good, cheap eats around campus that won\'t break the bank?',
    author: {
      name: 'BrokeStudent',
      avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    category: 'Food & Dining',
    createdAt: '2024-01-12T18:00:00Z',
    updatedAt: '2024-01-13T12:15:00Z',
    upvotes: 67,
    downvotes: 1,
    replyCount: 15,
    replies: [
      {
        id: '5',
        content: 'Taco Tuesday at El Paso is unbeatable - $1 tacos and they\'re actually good! Also, the food truck by the engineering building has amazing burritos for $6.',
        author: {
          name: 'FoodieFinds',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
        createdAt: '2024-01-12T19:30:00Z',
        upvotes: 35,
        downvotes: 0,
      },
    ],
    isPinned: false,
    isLocked: false,
    tags: ['food', 'budget', 'recommendations'],
  },
];

export const categories = [
  'All Categories',
  'Cafés & Restaurants',
  'Fashion & Clothing',
  'Hotels & Accommodation',
  'Entertainment',
  'Services',
  'Health & Fitness',
];

export const blogCategories = [
  'All',
  'Study Tips',
  'Lifestyle',
  'Technology',
  'Campus Life',
  'Career',
  'Health & Wellness',
];

export const forumCategories = [
  'All',
  'Academic Help',
  'Local Spots',
  'Food & Dining',
  'Housing',
  'Events',
  'General Discussion',
];