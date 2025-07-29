export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin' | 'business';
  joinedAt: string;
}

export interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$';
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  hours: {
    [key: string]: string;
  };
  featured: boolean;
  badges: string[];
  discounts?: {
    title: string;
    description: string;
    code?: string;
    validUntil: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  featured: boolean;
  heroImage: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  parentId?: string;
  replies?: Comment[];
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  replyCount: number;
  replies: ForumReply[];
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
}

export interface ForumReply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  parentId?: string;
  replies?: ForumReply[];
}