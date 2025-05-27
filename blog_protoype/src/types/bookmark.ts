export interface Bookmark {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  tags: string[];
  folder: string;
  // Add other properties like URL if needed
} 