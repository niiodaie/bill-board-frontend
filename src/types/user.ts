// User types for frontend
export interface User {
  id: number;
  username: string;
  email: string;
  stripeCustomerId?: string;
  createdAt: string;
}

export interface Ad {
  id: number;
  userId: number;
  title: string;
  description?: string;
  type: string;
  content: any;
  targetUrl?: string;
  callToAction?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: number;
  userId: number;
  adId: number;
  name: string;
  placement: string;
  dailyBudget: string;
  startDate: string;
  endDate: string;
  status: string;
  impressions: number;
  clicks: number;
  totalSpend: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: number;
  title: string;
  description: string;
  discountPercentage?: number;
  originalPrice?: string;
  discountedPrice?: string;
  affiliateUrl: string;
  imageUrl?: string;
  category: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
}

