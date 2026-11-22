import { posts } from "../blogs/posts";

const siteUrl = "https://ayaan.0xc84.fyi";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const items = posts
    .slice()
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map((post) => {
      const postUrl = `${siteUrl}/blogs/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const lastPostDate = posts
    .map((post) => Date.parse(post.date))
    .filter((timestamp) => Number.isFinite(timestamp))
    .sort((a, b) => b - a)[0];
  const lastBuildDate = lastPostDate
    ? new Date(lastPostDate).toUTCString()
    : "Sat, 22 Nov 2026 00:00:00 GMT";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Shulker Box</title>
    <link>${siteUrl}/blogs</link>
    <description>A personal collection of notes on creative coding, mathematics, machine learning, systems, and life.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
