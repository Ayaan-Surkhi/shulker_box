import Link from "next/link";
import styles from "./Home.module.scss";
import { Gloock } from 'next/font/google';

const gloock = Gloock({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <div className={`${styles.heroContent}`}>
          <h1>
            Hiya, I&apos;m Ayaan
            <br />
            Surkhi
          </h1>
          <p className={styles.heroCopy}>
            I&apos;m a mathematics and computing undergrad student at NIT Warangal. I like writing about creative coding, machine
            learning, systems, sports, random life events and other cool things
          </p>
          <Link className={styles.primaryLink} href="/blogs">
            Check Shulker Box out <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
