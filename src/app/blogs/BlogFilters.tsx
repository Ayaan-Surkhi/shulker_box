"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import { blogCategories, type BlogCategory, type BlogMeta } from "./types";
import styles from "./Blogs.module.scss";

export default function BlogFilters({ posts }: { posts: BlogMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const filteredPosts =
    selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <div className={styles.filters} aria-label="Filter posts by category">
        <button
          className={`${styles.filter} ${selectedCategory === "all" ? styles.activeFilter : ""}`}
          type="button"
          aria-pressed={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        {blogCategories.map((category) => (
          <button
            className={`${styles.filter} ${selectedCategory === category ? styles.activeFilter : ""}`}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <section className={styles.list} aria-label="Blog posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className={styles.empty}>nothing here so far, would be soon :)</p>
        )}
      </section>
    </>
  );
}
