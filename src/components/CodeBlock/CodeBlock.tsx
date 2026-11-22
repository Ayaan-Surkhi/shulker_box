import { codeToTokens, type BundledLanguage } from "shiki";
import CopyCodeButton from "./CopyCodeButton";
import styles from "./CodeBlock.module.scss";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
};

async function highlightCode(code: string, language: string) {
  "use cache";

  const result = await codeToTokens(code, {
    lang: language as BundledLanguage,
    theme: "github-dark",
  });

  return result.tokens.map((line) =>
    line.map((token) => ({
      content: token.content,
      color: token.color ?? undefined,
      backgroundColor: token.bgColor ?? undefined,
      fontStyle: token.fontStyle ?? undefined,
    })),
  );
}

export default async function CodeBlock({
  code,
  language = "text",
  filename,
}: CodeBlockProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div className={styles.block}>
      <div className={styles.toolbar}>
        <span className={styles.label}>
          {filename ?? language}
        </span>
        <CopyCodeButton code={code} />
      </div>
      <div className={styles.output}>
        <pre>
          <code>
            {highlightedCode.map((line, lineIndex) => (
              <span key={lineIndex}>
                {line.map((token, tokenIndex) => (
                  <span
                    key={`${lineIndex}-${tokenIndex}`}
                    style={{
                      color: token.color,
                      backgroundColor: token.backgroundColor,
                      fontStyle: token.fontStyle && (token.fontStyle & 1) ? "italic" : undefined,
                      fontWeight: token.fontStyle && (token.fontStyle & 2) ? "bold" : undefined,
                      textDecoration: token.fontStyle && (token.fontStyle & 4) ? "underline" : undefined,
                    }}
                  >
                    {token.content}
                  </span>
                ))}
                {lineIndex < highlightedCode.length - 1 ? "\n" : null}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
