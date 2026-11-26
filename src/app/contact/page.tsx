import type { Metadata } from "next";
import styles from "./Contact.module.scss";

export const metadata: Metadata = {
  title: "Contact | Ayaan Surkhi",
  description: "How to reach out to Ayaan Surkhi.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-heading">
        <h1 id="contact-heading">Contact</h1>

        <div className={styles.links}>
          <a className={styles.link} href="mailto:ayaansurkhi.work@gmail.com">
            <span className={styles.label}>Email</span>
            <span 
              className={styles.value}
              title="Written as 'at' instead of '@' to prevent spam bots from scraping it"
            >
              ayaansurkhi.work at gmail.com
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
          <a
            className={styles.link}
            href="https://www.linkedin.com/in/ayaan-surkhi-10919b219/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.label}>LinkedIn</span>
            <span className={styles.value}>Ayaan Surkhi</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a
            className={styles.link}
            href="https://github.com/Ayaan-Surkhi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.label}>GitHub</span>
            <span className={styles.value}>Ayaan-Surkhi</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
