"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles/Navbar.module.scss";
import Image from "next/image";
import { VT323 } from "next/font/google";

const links = [
  { href: "/blogs", label: "Blogs" },
  // { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", initialTheme);
    const frame = window.requestAnimationFrame(() => setIsDark(initialTheme));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  }


  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link className={styles.brand} href="/">
          <Image src="./lime_shulker.svg" alt="Shulker Box Logo" width={32} height={32} />
          <span>Shulker Box </span>
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Ayaan-Surkhi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <button
            className={styles.themeToggle}
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? "☀" : "☾"}
          </button>
        </div>
      </nav>
    </header>
  );
}