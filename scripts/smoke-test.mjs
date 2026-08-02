import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { buildContactMailto, CONTACT_EMAIL } from "../src/utils/contact-mailto.mjs";

const root = new URL("../", import.meta.url).pathname;
const publicDir = join(root, "public");

const routes = [
  "/",
  "/anwalt/",
  "/blog/",
  "/recht/mietrecht/",
  "/recht/verkehrsrecht/",
  "/recht/versicherungsrecht/",
  "/kontakt/",
  "/impressum/",
  "/datenschutz/",
];

const routeFile = (route) =>
  route === "/" ? join(publicDir, "index.html") : join(publicDir, route, "index.html");

const readRoute = (route) => {
  const file = routeFile(route);
  assert.ok(existsSync(file), `${route}: erzeugte HTML-Datei fehlt`);
  return readFileSync(file, "utf8");
};

const count = (html, pattern) => (html.match(pattern) || []).length;

const assertNoNestedAnchors = (html, route) => {
  let depth = 0;
  for (const token of html.match(/<a\b[^>]*>|<\/a>/gi) || []) {
    if (token.startsWith("</")) {
      depth -= 1;
    } else {
      depth += 1;
      assert.equal(depth, 1, `${route}: verschachtelter Link gefunden`);
    }
    assert.ok(depth >= 0, `${route}: ungültige Link-Struktur`);
  }
  assert.equal(depth, 0, `${route}: nicht geschlossener Link`);
};

const assertHeadingOrder = (html, route) => {
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  assert.ok(headings.length > 0, `${route}: keine Überschrift`);
  assert.equal(headings[0], 1, `${route}: erste Überschrift ist kein H1`);
  for (let index = 1; index < headings.length; index += 1) {
    assert.ok(
      headings[index] <= headings[index - 1] + 1,
      `${route}: Überschriftenebene springt von H${headings[index - 1]} auf H${headings[index]}`
    );
  }
};

for (const route of routes) {
  const html = readRoute(route);
  const canonical = `https://rechtsklarheit.de${route}`;

  assert.equal(count(html, /<main\b/gi), 1, `${route}: genau ein <main> erwartet`);
  assert.equal(count(html, /<h1\b/gi), 1, `${route}: genau ein H1 erwartet`);
  assert.match(html, /<title[^>]*>[^<]+<\/title>/i, `${route}: Titel fehlt`);
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/i,
    `${route}: Beschreibung fehlt`
  );
  assert.match(
    html,
    new RegExp(`<link[^>]+rel="canonical"[^>]+href="${canonical}"[^>]*>`, "i"),
    `${route}: Canonical ist falsch`
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/[^"]+"/i,
    `${route}: absolutes Social-Bild fehlt`
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/[^"]+"/i,
    `${route}: absolutes Twitter-Bild fehlt`
  );

  const jsonLd = html.match(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i
  );
  assert.ok(jsonLd, `${route}: JSON-LD fehlt`);
  const parsedJsonLd = JSON.parse(jsonLd[1]);
  assert.equal(parsedJsonLd["@context"], "https://schema.org");

  assertNoNestedAnchors(html, route);
  assertHeadingOrder(html, route);
}

const contactHtml = readRoute("/kontakt/");
for (const name of ["vorname", "nachname", "email", "betreff", "message"]) {
  const field = contactHtml.match(
    new RegExp(`<(?:input|textarea)[^>]*name="${name}"[^>]*>`, "i")
  );
  assert.ok(field, `Kontakt: Pflichtfeld ${name} fehlt`);
  assert.match(field[0], /\srequired(?:=""|(?=\s|>))/i, `Kontakt: ${name} ist nicht required`);
}
for (const name of ["adresse", "stadt", "telefon", "rueckruf"]) {
  const field = contactHtml.match(
    new RegExp(`<input[^>]*name="${name}"[^>]*>`, "i")
  );
  assert.ok(field, `Kontakt: optionales Feld ${name} fehlt`);
  assert.doesNotMatch(field[0], /\srequired(?:=""|(?=\s|>))/i, `Kontakt: ${name} darf nicht required sein`);
}
assert.doesNotMatch(contactHtml, /data-netlify=/i, "Kontakt: Netlify-Formular ist noch aktiv");
assert.doesNotMatch(contactHtml, /name="form-name"/i, "Kontakt: Netlify-form-name ist noch aktiv");
assert.match(contactHtml, /href="\/datenschutz\/"/i, "Kontakt: Datenschutzhinweis fehlt");

const mailto = new URL(
  buildContactMailto({
    vorname: "Max",
    nachname: "Mustermann",
    adresse: "Musterstraße 10",
    stadt: "12161 Berlin",
    email: "max@example.de",
    telefon: "030 1234567",
    rueckruf: "on",
    betreff: "Mietrecht",
    message: "Bitte rufen Sie mich zurück.",
  })
);
assert.equal(mailto.protocol, "mailto:", "Kontakt: kein mailto-Link erzeugt");
assert.equal(mailto.pathname, CONTACT_EMAIL, "Kontakt: falsche Empfängeradresse");
assert.match(mailto.searchParams.get("subject"), /Mietrecht/, "Kontakt: Betreff fehlt");
for (const value of [
  "Max",
  "Mustermann",
  "Musterstraße 10",
  "12161 Berlin",
  "max@example.de",
  "030 1234567",
  "Rückruf gewünscht: Ja",
  "Mietrecht",
  "Bitte rufen Sie mich zurück.",
]) {
  assert.ok(mailto.searchParams.get("body").includes(value), `Kontakt: ${value} fehlt im E-Mail-Text`);
}

const adminHtml = readRoute("/admin/");
assert.match(adminHtml, /<script[^>]+src="[^"]+"/i, "CMS: Admin-Bundle fehlt");
assert.ok(existsSync(join(publicDir, "admin", "config.yml")), "CMS: config.yml fehlt");

const robots = readFileSync(join(publicDir, "robots.txt"), "utf8");
assert.match(
  robots,
  /^Sitemap: https:\/\/rechtsklarheit\.de\/sitemap-index\.xml$/m,
  "robots.txt: Sitemap-URL ist falsch"
);

const sitemap = readFileSync(join(publicDir, "sitemap-0.xml"), "utf8");
for (const excluded of ["testseite", "lebenslauf", "kontakt/thanks", "/404/"]) {
  assert.ok(!sitemap.includes(excluded), `Sitemap enthält ausgeschlossene Route ${excluded}`);
}

const css = readFileSync(join(root, "src", "components", "all.scss"), "utf8");
assert.match(css, /\.btn\s*\{[\s\S]*?min-height:\s*44px/, "Mobile Trefferfläche für Buttons fehlt");
assert.match(css, /\.mobile-menu-toggle\s*\{[\s\S]*?width:\s*44px/, "Mobile Trefferfläche für Menü fehlt");

console.log(`Smoke-Tests erfolgreich: ${routes.length} Seiten, Kontaktformular, CMS, SEO und Sitemap.`);
