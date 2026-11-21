import Image from "next/image";
import BlogFilters from "./BlogFilters";
import styles from "./Blogs.module.scss";
import { type BlogMeta } from "./types";
// import { blog as welcomePost } from "./welcome-to-the-shulker-box/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shulker Box | Ayaan Surkhi",
  description: "Yayyy",
};

const posts: BlogMeta[] = [];

export default function BlogsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.heading}>
          {/* <Image src="./lime_shulker.svg" alt="Shulker Box Logo" width={75} height={75} /> */}
          <h1 className={styles.title}>The Shulker Box.</h1>
        </div>
        <p className={styles.intro}>
          A shulker box stores useful things in Minecraft. This is my little shulker box
        </p>
      </header>
      <BlogFilters posts={posts} />
    </main>
  );
}
