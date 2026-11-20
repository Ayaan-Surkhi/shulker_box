import Link from "next/link";
import styles from "../BlogPost.module.scss";
import { blog } from "./blog";

export const metadata = {
  title: `${blog.title} | The Shulker Box`,
  description: blog.description,
};

export default function WelcomeToTheShulkerBox() {
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/blogs">
        ← Back to The Shulker Box
      </Link>
      <article>
        <header className={styles.header}>
          <div className={styles.meta}>
            <time dateTime={blog.date}>{blog.date}</time>
            <span aria-hidden="true">·</span>
            <span>{blog.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{blog.category}</span>
          </div>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.description}>{blog.description}</p>
        </header>
        <div className={styles.content}>
          <p>
            The Shulker Box is my corner of the internet for thoughts that do not fit neatly into a textbook, a project README, or a passing conversation.
          </p>
          <h2>What goes inside</h2>
          <p>
            Expect notes on creative coding, machine learning, systems, mathematics, and the interesting connections between them. Some posts will be polished essays; others will be experiments in public.
          </p>
          <p>
            Like its Minecraft namesake, this is a place to keep useful things close, carry them around, and open them up whenever curiosity calls.
          </p>
        </div>
        <div className={styles.tags} aria-label="Tags">
          {blog.tags.map((tag) => <span className={styles.tag} key={tag}>#{tag}</span>)}
        </div>
      </article>
    </main>
  );
}
