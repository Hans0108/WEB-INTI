export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: {
    url: string;
    altText?: string;
    caption?: string;
  };
  content: string; // This can store Markdown, HTML, or Rich Text JSON (e.g., Portable Text)
  status: PostStatus;
  
  author: Author;
  categories: Category[];
  tags: Tag[];
  
  // Timestamps
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  publishedAt?: string; // ISO 8601 string
  
  // SEO Metadata (Optional but recommended for production)
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}
