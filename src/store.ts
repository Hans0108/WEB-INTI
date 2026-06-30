import { useState, useEffect } from 'react';
import { contentData as initialContentData, ContentItem } from './data';

export interface Leader {
  id: number;
  name: string;
  role: string;
  img: string;
}

export interface WebsiteImages {
  aboutCommunityImg: string;
  homeHeroImg?: string;
  showHomeHeroImg: boolean;
}

export interface Inquiry {
  id: number;
  name: string;
  phoneNumber: string;
  socials: string;
  age: number;
  occupancy: string;
  submittedAt: string;
  isNew: boolean;
}

const DEFAULT_LEADERS: Leader[] = [
  { id: 1, name: 'Budi Santoso', role: 'Chairman', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Diana Wijaya', role: 'Vice Chairman', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Hendrik Salim', role: 'Secretary General', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Linda Tan', role: 'Head of Social Welfare', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const DEFAULT_WEBSITE_IMAGES: WebsiteImages = {
  aboutCommunityImg: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  homeHeroImg: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  showHomeHeroImg: false,
};

// Simple event-based state synchronization for multiple components
type Listener = () => void;
const listeners = new Set<Listener>();

let articles: ContentItem[] = [];
let leaders: Leader[] = [];
let websiteImages: WebsiteImages = DEFAULT_WEBSITE_IMAGES;
let inquiries: Inquiry[] = [];

// Initialize
if (typeof window !== 'undefined') {
  const savedArticles = localStorage.getItem('inti_articles');
  articles = savedArticles ? JSON.parse(savedArticles) : initialContentData;

  const savedLeaders = localStorage.getItem('inti_leaders');
  leaders = savedLeaders ? JSON.parse(savedLeaders) : DEFAULT_LEADERS;

  const savedImages = localStorage.getItem('inti_website_images');
  websiteImages = savedImages ? JSON.parse(savedImages) : DEFAULT_WEBSITE_IMAGES;

  const savedInquiries = localStorage.getItem('inti_inquiries');
  inquiries = savedInquiries ? JSON.parse(savedInquiries) : [];
}

const notify = () => {
  listeners.forEach(listener => listener());
};

export const store = {
  getArticles() {
    return articles;
  },
  
  saveArticles(newArticles: ContentItem[]) {
    articles = newArticles;
    localStorage.setItem('inti_articles', JSON.stringify(newArticles));
    notify();
  },

  addArticle(article: Omit<ContentItem, 'id'>) {
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const item: ContentItem = { ...article, id: newId };
    const updated = [item, ...articles];
    this.saveArticles(updated);
    return item;
  },

  deleteArticle(id: number) {
    const updated = articles.filter(a => a.id !== id);
    this.saveArticles(updated);
  },

  updateArticle(id: number, updatedArticle: Partial<ContentItem>) {
    const updated = articles.map(a => a.id === id ? { ...a, ...updatedArticle } : a);
    this.saveArticles(updated);
  },

  getLeaders() {
    return leaders;
  },

  saveLeaders(newLeaders: Leader[]) {
    leaders = newLeaders;
    localStorage.setItem('inti_leaders', JSON.stringify(newLeaders));
    notify();
  },

  updateLeaderImage(id: number, imgUrl: string) {
    const updated = leaders.map(l => l.id === id ? { ...l, img: imgUrl } : l);
    this.saveLeaders(updated);
  },

  updateLeaderDetails(id: number, name: string, role: string, img: string) {
    const updated = leaders.map(l => l.id === id ? { ...l, name, role, img } : l);
    this.saveLeaders(updated);
  },

  getWebsiteImages() {
    return websiteImages;
  },

  saveWebsiteImages(newImages: WebsiteImages) {
    websiteImages = newImages;
    localStorage.setItem('inti_website_images', JSON.stringify(newImages));
    notify();
  },

  getInquiries() {
    return inquiries;
  },

  saveInquiries(newInquiries: Inquiry[]) {
    inquiries = newInquiries;
    localStorage.setItem('inti_inquiries', JSON.stringify(newInquiries));
    notify();
  },

  addInquiry(inquiry: Omit<Inquiry, 'id' | 'submittedAt' | 'isNew'>) {
    const newId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1;
    const item: Inquiry = {
      ...inquiry,
      id: newId,
      submittedAt: new Date().toISOString(),
      isNew: true
    };
    const updated = [item, ...inquiries];
    this.saveInquiries(updated);
    return item;
  },

  markInquiryAsRead(id: number) {
    const updated = inquiries.map(i => i.id === id ? { ...i, isNew: false } : i);
    this.saveInquiries(updated);
  },

  markAllInquiriesAsRead() {
    const updated = inquiries.map(i => ({ ...i, isNew: false }));
    this.saveInquiries(updated);
  },

  deleteInquiry(id: number) {
    const updated = inquiries.filter(i => i.id !== id);
    this.saveInquiries(updated);
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};

export function useStore() {
  const [state, setState] = useState({
    articles: store.getArticles(),
    leaders: store.getLeaders(),
    websiteImages: store.getWebsiteImages(),
    inquiries: store.getInquiries()
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState({
        articles: store.getArticles(),
        leaders: store.getLeaders(),
        websiteImages: store.getWebsiteImages(),
        inquiries: store.getInquiries()
      });
    });
    return unsubscribe;
  }, []);

  return {
    articles: state.articles,
    leaders: state.leaders,
    websiteImages: state.websiteImages,
    inquiries: state.inquiries,
    addArticle: (art: Omit<ContentItem, 'id'>) => store.addArticle(art),
    deleteArticle: (id: number) => store.deleteArticle(id),
    updateArticle: (id: number, updatedArt: Partial<ContentItem>) => store.updateArticle(id, updatedArt),
    updateLeaderImage: (id: number, img: string) => store.updateLeaderImage(id, img),
    updateLeaderDetails: (id: number, name: string, role: string, img: string) => store.updateLeaderDetails(id, name, role, img),
    updateWebsiteImages: (images: WebsiteImages) => store.saveWebsiteImages(images),
    addInquiry: (inq: Omit<Inquiry, 'id' | 'submittedAt' | 'isNew'>) => store.addInquiry(inq),
    markInquiryAsRead: (id: number) => store.markInquiryAsRead(id),
    markAllInquiriesAsRead: () => store.markAllInquiriesAsRead(),
    deleteInquiry: (id: number) => store.deleteInquiry(id),
    resetToDefault: () => {
      localStorage.removeItem('inti_articles');
      localStorage.removeItem('inti_leaders');
      localStorage.removeItem('inti_website_images');
      localStorage.removeItem('inti_inquiries');
      articles = initialContentData;
      leaders = DEFAULT_LEADERS;
      websiteImages = DEFAULT_WEBSITE_IMAGES;
      inquiries = [];
      notify();
    }
  };
}
