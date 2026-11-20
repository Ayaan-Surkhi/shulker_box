import styles from "../Home.module.scss";

export default function ContactPage() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h1>Contact.</h1>
        <p className={styles.heroCopy}>
          Have an idea, question, or interesting problem? Reach out and start
          a conversation.
        </p>
        <a className={styles.primaryLink} href="mailto:hello@ayaan.dev">
          Email me <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
