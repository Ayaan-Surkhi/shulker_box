import Link from "next/link";
import type { BlogMeta } from "./types";
import styles from "./BlogCard.module.scss";

export default function BlogCard({ post }: { post: BlogMeta }) {
  return (
    <Link className={styles.card} href={`/blogs/${post.slug}`}>
      <div className={styles.meta}>
        <time dateTime={post.date}>{post.date}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
        <span aria-hidden="true">·</span>
        <span>{post.category}</span>
      </div>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.tags} aria-label="Tags">
        {post.tags.map((tag) => (
          <span className={styles.tag} key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
