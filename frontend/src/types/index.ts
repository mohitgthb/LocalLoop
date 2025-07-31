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
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
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
  _id: string;
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

// 👉 Example: types.ts
export interface ForumThread {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replyCount: number;
  isPinned: boolean;

  // These must exist 👇
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies: Array<{
    _id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: string;
  }>;
  isLocked: boolean;
  updatedAt: string; // If you sort by updatedAt
  userVote?: 'up' | 'down'; // Optional, if user has voted
}


export interface ForumReply {
  _id: string;
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