export const blogCategories = ["creative coding", "systems", "ml", "random"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: BlogCategory;
  tags: string[];
};
