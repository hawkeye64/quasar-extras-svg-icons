<template>
  <section class="landing-page markdown-brand">
    <header class="hero">
      <div class="hero__mesh hero__mesh--left" />
      <div class="hero__mesh hero__mesh--right" />

      <div class="hero__grid">
        <div class="hero__copy">
          <div class="hero__eyebrow">Vue 3 + Quasar 2</div>
          <img src="/heart.png" alt="Quasar Extras SVG Icons Logo" class="hero-logo" />
          <h1 class="hero-title">Quasar Extras SVG Icons</h1>

          <p class="hero-subtitle">{{ siteConfig.description }}</p>
          <p class="hero-lede">
            Ship icon-heavy Quasar apps with flattened SVG sets, predictable import paths, and a
            built-in icon finder instead of hand-curating every upstream package yourself.
          </p>

          <div class="hero-buttons">
            <q-btn
              to="/getting-started/introduction"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--solid"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Get Started</span>
                <span class="hero-button__slot">
                  <q-icon :name="biArrowRightCircle" />
                </span>
              </div>
            </q-btn>

            <q-btn
              to="/getting-started/icon-finder"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
                <span class="hero-button__label">Icon Finder</span>
                <span class="hero-button__slot">
                  <q-icon name="travel_explore" />
                </span>
              </div>
            </q-btn>

            <q-btn
              href="https://github.com/hawkeye64/quasar-extras-svg-icons/tree/v3-beta"
              target="_blank"
              rel="noopener noreferrer"
              no-caps
              rounded
              unelevated
              class="hero-button hero-button--ghost"
            >
              <div class="hero-button__content q-anchor--skip">
                <span class="hero-button__slot">
                  <q-icon :name="fabGithub" />
                </span>
                <span class="hero-button__label">GitHub Repo</span>
                <span class="hero-button__slot hero-button__slot--empty" aria-hidden="true" />
              </div>
            </q-btn>
          </div>

          <div class="hero-pills">
            <span v-for="pill in heroPills" :key="pill" class="hero-pill">
              {{ pill }}
            </span>
          </div>
        </div>

        <div class="hero__visual">
          <div class="preview-panel">
            <div class="preview-panel__header">
              <span class="preview-panel__kicker">Icon Library</span>
              <span class="preview-panel__note">Import-ready catalog</span>
            </div>

            <div class="preview-panel__body">
              <div class="preview-panel__copy">
                <h2>
                  Search, compare, and import from a large icon catalog without leaving the Quasar
                  workflow
                </h2>
                <p>
                  Browse included families in the Icon Finder, keep readable import paths in app
                  code, and rely on generated TypeScript exports when you want discovery and
                  autocomplete to stay pleasant.
                </p>
              </div>

              <div class="preview-gallery">
                <div class="preview-card preview-card--primary">
                  <q-img src="/tabler-icons.png" alt="Tabler Icons preview" fit="contain" />
                </div>

                <div class="preview-card preview-card--secondary">
                  <q-img src="/simple-icons.png" alt="Simple Icons preview" fit="contain" />
                </div>
              </div>

              <div class="preview-stats">
                <article
                  v-for="highlight in previewHighlights"
                  :key="highlight.label"
                  class="preview-stat"
                >
                  <div class="preview-stat__value">{{ highlight.value }}</div>
                  <div class="preview-stat__label">{{ highlight.label }}</div>
                  <p class="preview-stat__body">{{ highlight.body }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="path-section">
      <div class="section-heading">
        <div class="section-heading__eyebrow">Start Here</div>
        <h2 class="section-heading__title">Choose the next step that matches your workflow</h2>
        <p class="section-heading__text">
          Whether you are deciding if the package fits, searching for an icon family, or planning a
          beta upgrade, the docs are organized to get you there quickly.
        </p>
      </div>

      <div class="path-grid">
        <router-link v-for="card in pathCards" :key="card.title" :to="card.path" class="path-card">
          <div class="path-card__icon">
            <q-icon :name="card.icon" />
          </div>
          <div class="path-card__eyebrow">{{ card.eyebrow }}</div>
          <h3 class="path-card__title">{{ card.title }}</h3>
          <p class="path-card__body">{{ card.body }}</p>
          <div class="path-card__meta">
            <span>{{ card.meta }}</span>
            <q-icon :name="biArrowRightCircle" />
          </div>
        </router-link>
      </div>
    </section>

    <section class="feature-section">
      <div class="section-heading">
        <div class="section-heading__eyebrow">Included</div>
        <h2 class="section-heading__title">What the package solves for Quasar applications</h2>
        <p class="section-heading__text">
          The goal is not just “more icons.” It is a better path from upstream SVG projects to icons
          that are practical to browse, import, and keep stable in real Quasar codebases.
        </p>
      </div>

      <div class="feature-grid">
        <article v-for="feature in featureCards" :key="feature.title" class="feature-card">
          <div class="feature-card__icon">
            <q-icon :name="feature.icon" />
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__body">{{ feature.body }}</p>
        </article>
      </div>
    </section>

    <section class="showcase-section">
      <div class="section-heading">
        <div class="section-heading__eyebrow">Featured</div>
        <h2 class="section-heading__title">A few icon families you can reach for right away</h2>
        <p class="section-heading__text">
          The package spans product icons, brands, pictograms, emojis, flags, and more. Here are a
          few families that give a quick feel for the range.
        </p>
      </div>

      <div class="showcase-grid">
        <router-link
          v-for="card in showcaseCards"
          :key="card.title"
          to="/getting-started/icon-finder"
          class="showcase-card"
        >
          <q-img
            :src="card.src"
            :alt="`${card.title} preview`"
            fit="contain"
            class="showcase-card__image"
          />
          <div class="showcase-card__meta">{{ card.meta }}</div>
          <h3 class="showcase-card__title">{{ card.title }}</h3>
          <p class="showcase-card__body">{{ card.body }}</p>
        </router-link>
      </div>

      <p class="showcase-more">
        ...and many more. Explore all
        <router-link to="/getting-started/icon-finder">{{ iconSetCount }} icon sets</router-link>
        in the Icon Finder, or check out the
        <a href="https://iconexplorer.app/" target="_blank" rel="noopener noreferrer">
          Icon Explorer App</a
        >.
      </p>
    </section>

    <section class="resource-section">
      <article class="resource-card resource-card--primary">
        <div class="resource-card__eyebrow">Ecosystem</div>
        <h2 class="resource-card__title">
          Built for Quasar apps and documented with the md-plugins stack
        </h2>
        <p class="resource-card__body">
          The package gives you Quasar-friendly icon exports, while the docs run on Q-Press and the
          shared md-plugins tooling used across the sibling documentation sites.
        </p>

        <div class="resource-card__actions">
          <a
            href="https://github.com/hawkeye64/quasar-extras-svg-icons"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon :name="fabGithub" />
            <span>Package Repo</span>
          </a>

          <a
            href="https://www.npmjs.com/package/quasar-extras-svg-icons"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="inventory_2" />
            <span>NPM Package</span>
          </a>

          <a
            href="https://github.com/hawkeye64/md-plugins"
            target="_blank"
            rel="noopener noreferrer"
            class="resource-link"
          >
            <q-icon name="hub" />
            <span>md-plugins</span>
          </a>
        </div>
      </article>

      <article class="resource-card resource-card--secondary">
        <div class="resource-card__eyebrow">Need Help?</div>
        <h2 class="resource-card__title">
          Use the introduction for setup, then lean on finder, guides, and release notes
        </h2>
        <p class="resource-card__body">
          Most questions are answered by choosing the right doc entry point first: installation and
          import patterns, browsing icon families, migration notes, or troubleshooting edge cases.
        </p>

        <div class="resource-list">
          <div v-for="item in supportItems" :key="item.title" class="resource-list__item">
            <div class="resource-list__title">{{ item.title }}</div>
            <div class="resource-list__body">{{ item.body }}</div>
          </div>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import { fabGithub } from "@quasar/extras/fontawesome-v7";
import { biArrowRightCircle } from "@quasar/extras/bootstrap-icons";
import siteConfig from "../../siteConfig";
import { iconSetMetadata } from "@/utils/icon-set-metadata";

const iconSetCount = iconSetMetadata.length;
const totalIconCount = iconSetMetadata
  .reduce((sum, item) => sum + item.iconCount, 0)
  .toLocaleString();
const prefixCount = new Set(iconSetMetadata.flatMap((item) => item.prefixes)).size.toLocaleString();

const heroPills = [
  `${iconSetCount} Icon Sets`,
  "Icon Finder",
  "Typed Exports",
  "Versioned Folders",
  "QIcon Ready",
  "SVG Only",
];

const previewHighlights = [
  {
    value: iconSetCount.toLocaleString(),
    label: "Icon Sets",
    body: "A wide mix of UI icons, brands, pictograms, flags, and emoji-ready families in one package.",
  },
  {
    value: totalIconCount,
    label: "SVG Exports",
    body: "Thousands of generated exports across the catalog, ready to import directly into Quasar apps.",
  },
  {
    value: prefixCount,
    label: "Prefix Groups",
    body: "Readable import prefixes help keep different icon families understandable in large codebases.",
  },
];

const pathCards = [
  {
    eyebrow: "Guide",
    title: "Introduction",
    body: "Understand how the package complements @quasar/extras and why the icon sets are flattened for Quasar.",
    icon: "rocket_launch",
    meta: "Install and first imports",
    path: "/getting-started/introduction",
  },
  {
    eyebrow: "Tool",
    title: "Icon Finder",
    body: "Browse the bundled icon families and copy the import names you need without hunting through upstream repos.",
    icon: "travel_explore",
    meta: "Search the catalog",
    path: "/getting-started/icon-finder",
  },
  {
    eyebrow: "Migration",
    title: "Upgrade Guide",
    body: "Review the beta-line changes, versioned folders, and import-path policy before moving existing code forward.",
    icon: "upgrade",
    meta: "Plan a beta upgrade",
    path: "/other/upgrade-guide",
  },
  {
    eyebrow: "Status",
    title: "Releases",
    body: "Track package changes, icon-family additions, and updates available in the current release line.",
    icon: "campaign",
    meta: "See recent changes",
    path: "/other/releases",
  },
];

const featureCards = [
  {
    icon: "integration_instructions",
    title: "Quasar-Ready Strings",
    body: "Use the exported values directly with QIcon, QBtn, and icon-set overrides instead of wrapping custom SVG components.",
  },
  {
    icon: "manage_search",
    title: "Finder-Driven Discovery",
    body: "The built-in Icon Finder gives the docs a practical way to search across the catalog before you write imports by hand.",
  },
  {
    icon: "data_object",
    title: "Typed Imports",
    body: "Generated TypeScript declarations make icon names easier to discover in editors and safer to refactor over time.",
  },
  {
    icon: "layers",
    title: "Versioned Folders",
    body: "When an icon family spans multiple supported majors, versioned folders make that explicit instead of hiding the upgrade cost.",
  },
  {
    icon: "cleaning_services",
    title: "Curated Sources",
    body: "Upstream icon packages are flattened and cleaned so the useful SVG output is easier to consume in applications.",
  },
  {
    icon: "category",
    title: "Broad Family Coverage",
    body: "Move between product UI icons, flags, brands, pictograms, and emoji-style assets without switching packages or workflows.",
  },
];

const showcaseCards = [
  {
    title: "Tabler Icons",
    body: "A large outline and brand family that fits comfortably into modern application UIs.",
    meta: "Interface + brand",
    src: "/tabler-icons.png",
  },
  {
    title: "Simple Icons",
    body: "Brand marks for services, tools, frameworks, and platforms when product integrations need visual identity.",
    meta: "Brands",
    src: "/simple-icons.png",
  },
  {
    title: "Carbon Icons",
    body: "IBM Carbon icons and pictograms for product-style interfaces with a stronger enterprise visual language.",
    meta: "Enterprise UI",
    src: "/carbon-icons.png",
  },
  {
    title: "Fluent UI",
    body: "Microsoft Fluent-style system icons for clean, contemporary application surfaces.",
    meta: "System icons",
    src: "/fluentui-icons.png",
  },
  {
    title: "OpenMoji",
    body: "Color emoji SVGs flattened for workflows that need expressive icons without leaving the package.",
    meta: "Emoji",
    src: "/openmoji-icons.png",
  },
  {
    title: "Country Flags",
    body: "SVG flags for locale selectors, dashboards, and global products that need clear regional affordances.",
    meta: "Flags",
    src: "/country-flag-icons.png",
  },
];

const supportItems = [
  {
    title: "Introduction + Imports",
    body: "Start there when you need install commands, import patterns, and the relationship to @quasar/extras.",
  },
  {
    title: "Icon Finder First",
    body: "Use the finder whenever you are choosing between icon families or need the exact export names for a feature.",
  },
  {
    title: "Upgrade + Release Notes",
    body: "Check those before publishing when versioned folders or newer upstream icon packages are part of the change.",
  },
  {
    title: "FAQ and Troubleshooting",
    body: "The guides section covers best practices, common setup issues, and edge cases that show up in app integration.",
  },
];
</script>

<style lang="scss" scoped>
.landing-page {
  position: relative;
  padding: 28px clamp(16px, 2.4vw, 34px) 42px;
  color: var(--landing-page-text);
}

.landing-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 12% 12%, rgba(38, 166, 154, 0.18), transparent 26%),
    radial-gradient(circle at 82% 8%, rgba(25, 118, 210, 0.2), transparent 32%),
    linear-gradient(180deg, rgba(8, 18, 30, 0.96), rgba(6, 14, 25, 0.98));
  pointer-events: none;
}

.landing-page > * {
  position: relative;
  z-index: 1;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 34px;
  border: 1px solid var(--landing-border);
  border-radius: 32px;
  background:
    linear-gradient(145deg, rgba(12, 25, 43, 0.96), rgba(10, 20, 36, 0.82)), rgba(11, 24, 41, 0.92);
  box-shadow: var(--landing-shadow);
}

.hero__mesh {
  position: absolute;
  border-radius: 999px;
  filter: blur(0);
  opacity: 0.74;
}

.hero__mesh--left {
  top: -70px;
  left: -56px;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle at center, rgba(38, 166, 154, 0.26), transparent 68%);
}

.hero__mesh--right {
  top: -90px;
  right: -44px;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at center, rgba(25, 118, 210, 0.28), transparent 72%);
}

.hero__grid {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hero__eyebrow,
.section-heading__eyebrow,
.path-card__eyebrow,
.resource-card__eyebrow,
.preview-panel__kicker,
.preview-panel__note,
.showcase-card__meta {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.76rem;
  font-weight: 700;
}

.hero__eyebrow,
.section-heading__eyebrow {
  color: #8fe9dc;
}

.hero-logo {
  width: clamp(88px, 14vw, 124px);
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 32px;
  box-shadow: 0 18px 42px rgba(4, 10, 20, 0.24);
}

.hero-title {
  margin: 0;
  font-family: "Space Grotesk", "Sora", "Segoe UI", sans-serif;
  font-size: clamp(2.6rem, 6vw, 4.7rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  max-width: 640px;
  margin: 0;
  font-family: "Space Grotesk", "Montserrat", "Segoe UI", sans-serif;
  font-size: clamp(1.08rem, 2vw, 1.42rem);
  line-height: 1.48;
  font-weight: 700;
  color: #eff8ff;
}

.hero-lede {
  max-width: 600px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.72;
  color: var(--landing-text-soft);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
}

.hero-buttons {
  padding-top: 6px;
  margin-bottom: 6px;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 6px;
}

.hero-button {
  min-height: 50px;
  padding: 0 18px;
  border: 1px solid transparent;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    box-shadow 0.22s ease;
}

.hero-button:hover,
.path-card:hover,
.feature-card:hover,
.showcase-card:hover,
.resource-link:hover {
  transform: translateY(-1px);
}

.hero-button :deep(.q-btn__content) {
  width: 100%;
  min-width: 0;
}

.hero-button--solid {
  background: #f1fbff;
  color: #0b2540;
  box-shadow: 0 18px 30px rgba(5, 12, 22, 0.2);
}

.hero-button--ghost {
  background: rgba(241, 251, 255, 0.08);
  border-color: var(--landing-border-strong);
  color: #f6fbff;
}

.hero-button__content {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
  align-items: center;
  column-gap: 12px;
  min-width: 0;
  width: 100%;
  font-family: "Space Grotesk", "Sora", "Segoe UI", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.hero-button__slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

.hero-button__slot--empty {
  visibility: hidden;
}

.hero-button__slot :deep(.q-icon) {
  font-size: 1.3rem;
}

.hero-button__label {
  white-space: nowrap;
  text-align: center;
}

.hero-pill {
  padding: 8px 12px;
  border: 1px solid rgba(241, 251, 255, 0.12);
  border-radius: 999px;
  background: rgba(241, 251, 255, 0.05);
  color: #b9f6ee;
  font-size: 0.84rem;
  font-weight: 600;
}

.hero__visual {
  display: flex;
  justify-content: stretch;
}

.preview-panel,
.path-card,
.feature-card,
.showcase-card,
.resource-card {
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: 24px;
  background: var(--landing-surface);
  box-shadow: 0 16px 34px rgba(4, 10, 20, 0.16);
}

.preview-panel {
  width: 100%;
  padding: 20px;
  background:
    linear-gradient(180deg, rgba(236, 247, 255, 0.08), rgba(236, 247, 255, 0.02)),
    rgba(8, 18, 32, 0.58);
  backdrop-filter: blur(8px);
}

.preview-panel__header,
.path-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.preview-panel__header {
  margin-bottom: 18px;
}

.preview-panel__note {
  color: var(--landing-note-text);
}

.preview-panel__body {
  display: grid;
  gap: 18px;
}

.preview-panel__copy h2,
.section-heading__title,
.resource-card__title {
  margin: 0;
  font-family: "Space Grotesk", "Sora", "Segoe UI", sans-serif;
  line-height: 1.08;
}

.preview-panel__copy h2 {
  font-size: clamp(1.6rem, 2.8vw, 2.3rem);
  color: #f7fcff;
}

.preview-panel__copy p,
.section-heading__text,
.feature-card__body,
.path-card__body,
.showcase-card__body,
.resource-card__body,
.resource-list__body,
.preview-stat__body {
  margin: 0;
  color: var(--landing-text-soft);
  line-height: 1.68;
}

.preview-gallery {
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
}

.preview-card {
  overflow: hidden;
  border: 1px solid rgba(241, 251, 255, 0.12);
  border-radius: 20px;
  background: rgba(9, 19, 34, 0.8);
}

.preview-card :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-card--primary {
  min-height: 210px;
}

.preview-card--secondary {
  min-height: 210px;
}

.preview-stats {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.preview-stat {
  padding: 16px;
  border: 1px solid rgba(241, 251, 255, 0.1);
  border-radius: 18px;
  background: rgba(241, 251, 255, 0.05);
}

.preview-stat__value {
  margin-bottom: 6px;
  font-family: "Space Grotesk", "Sora", "Segoe UI", sans-serif;
  font-size: 1.65rem;
  font-weight: 700;
  color: #f6fbff;
}

.preview-stat__label {
  margin-bottom: 8px;
  color: #8fe9dc;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.path-section,
.feature-section,
.showcase-section {
  padding-top: 42px;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 20px;
  text-align: center;
}

.section-heading__title {
  margin: 14px 0 10px;
  font-size: clamp(2rem, 4vw, 2.8rem);
  text-wrap: balance;
  color: #f7fcff;
}

.section-heading__text {
  font-size: 1.04rem;
}

.path-grid,
.feature-grid,
.showcase-grid {
  display: grid;
  gap: 18px;
}

.path-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-grid,
.showcase-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.path-card,
.showcase-card {
  text-decoration: none;
}

.path-card,
.feature-card,
.showcase-card,
.resource-card {
  position: relative;
  padding: 20px;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background-color 0.22s ease;
}

.path-card::before,
.feature-card::before,
.showcase-card::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(38, 166, 154, 0.58), transparent 68%);
}

.path-card:hover,
.feature-card:hover,
.showcase-card:hover {
  border-color: var(--landing-border-strong);
}

.path-card__icon,
.feature-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 14px;
  border-radius: 14px;
  background: rgba(38, 166, 154, 0.16);
  color: #a9fff1;
  font-size: 1.35rem;
}

.path-card__eyebrow {
  margin-bottom: 12px;
  color: #8fe9dc;
}

.path-card__title,
.feature-card__title,
.showcase-card__title {
  margin: 0 0 10px;
  font-family: "Space Grotesk", "Sora", "Segoe UI", sans-serif;
  font-size: 1.18rem;
  line-height: 1.3;
  color: #f7fcff;
}

.path-card__meta {
  margin-top: 18px;
  color: #9fe7ff;
  font-size: 0.9rem;
  font-weight: 600;
}

.showcase-card {
  background:
    linear-gradient(180deg, rgba(236, 247, 255, 0.05), rgba(236, 247, 255, 0.02)),
    var(--landing-surface);
}

.showcase-card__image {
  margin-bottom: 16px;
  border: 1px solid rgba(241, 251, 255, 0.08);
  border-radius: 18px;
  background: rgba(8, 18, 32, 0.82);
}

.showcase-card__meta {
  margin-bottom: 10px;
  color: #9fe7ff;
}

.showcase-more {
  margin: 18px auto 0;
  text-align: center;
  color: var(--landing-text-soft);
  font-size: 1rem;
}

.showcase-more a {
  color: #9fe7ff;
  font-weight: 700;
  text-decoration: none;
}

.showcase-more a:hover {
  text-decoration: underline;
}

.resource-section {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  align-items: start;
  padding-top: 42px;
}

.resource-card {
  padding: 20px;
}

.resource-card--primary {
  background:
    radial-gradient(circle at top right, rgba(38, 166, 154, 0.18), transparent 30%),
    var(--landing-surface-strong);
}

.resource-card__eyebrow {
  margin-bottom: 14px;
  color: #8fe9dc;
}

.resource-card__title {
  margin-bottom: 12px;
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  color: #f7fcff;
}

.resource-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 16px;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  border: 1px solid rgba(241, 251, 255, 0.1);
  border-radius: 999px;
  background: rgba(241, 251, 255, 0.05);
  color: #f6fbff;
  text-decoration: none;
  font-weight: 600;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    background-color 0.22s ease;
}

.resource-list {
  display: grid;
  gap: 0;
  padding-top: 16px;
}

.resource-list__item {
  padding: 12px 0;
  border-top: 1px solid var(--landing-resource-item-border);
}

.resource-list__item:first-child {
  padding-top: 0;
  border-top: 0;
}

.resource-list__title {
  margin-bottom: 4px;
  color: #f6fbff;
  font-weight: 700;
}

.path-card__body,
.feature-card__body,
.showcase-card__body,
.resource-card__body,
.preview-stat__body {
  color: var(--landing-body-text);
  font-size: 0.97rem;
}

.resource-list__body {
  color: var(--landing-body-text);
  font-size: 0.93rem;
  line-height: 1.55;
}

@media (max-width: 1100px) {
  .hero__grid,
  .resource-section,
  .feature-grid,
  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .path-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .landing-page {
    padding: 18px 12px 30px;
  }

  .hero {
    padding: 24px 20px;
    border-radius: 24px;
  }

  .preview-gallery,
  .preview-stats,
  .path-grid,
  .feature-grid,
  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .hero-button {
    width: 100%;
    justify-content: center;
  }

  .hero-buttons {
    gap: 10px;
  }
}

/* qpress-theme-bridge:start */
.landing-page,
body.body--dark .landing-page {
  --landing-page-text: var(--qpress-text-primary);
  --landing-heading: var(--qpress-text-primary);
  --landing-body-text: var(--qpress-text-body);
  --landing-note-text: var(--qpress-text-muted);
  --landing-border: var(--qpress-border-subtle);
  --landing-border-strong: var(--qpress-border-strong);
  --landing-surface: var(--qpress-surface-raised);
  --landing-surface-strong: var(--qpress-surface-raised-strong);
  --landing-text-soft: var(--qpress-text-soft);
  --landing-shadow: var(--qpress-shadow-large);
  --landing-card-shadow: var(--qpress-card-shadow);
  --landing-chip-bg: var(--qpress-chip-bg);
  --landing-chip-text: var(--qpress-chip-text);
  --landing-solid-bg: var(--qpress-action-solid-bg);
  --landing-solid-text: var(--qpress-action-solid-text);
  --landing-solid-shadow: var(--qpress-action-solid-shadow);
  --landing-ghost-bg: var(--qpress-action-ghost-bg);
  --landing-ghost-text: var(--qpress-action-ghost-text);
  --landing-pill-border: var(--qpress-pill-border);
  --landing-pill-bg: var(--qpress-pill-bg);
  --landing-pill-text: var(--qpress-pill-text);
  --landing-panel-gradient-top: var(--qpress-panel-gradient-top);
  --landing-panel-gradient-bottom: var(--qpress-panel-gradient-bottom);
  --landing-panel-bg: var(--qpress-surface-panel);
  --landing-preview-card-border: var(--qpress-tile-border);
  --landing-preview-card-bg: var(--qpress-tile-bg);
  --landing-preview-card-shadow: var(--qpress-card-shadow);
  --landing-stat-border: var(--qpress-highlight-border);
  --landing-stat-bg: var(--qpress-highlight-bg);
  --landing-accent-line: var(--qpress-accent-line);
  --landing-icon-bg: var(--qpress-icon-bg);
  --landing-icon-color: var(--qpress-icon-color);
  --landing-menu-color: var(--qpress-color-primary);
  --landing-menu-contrast: var(--qpress-action-solid-text);
  --landing-meta-text: var(--qpress-meta-text);
  --landing-showcase-image-border: var(--qpress-tile-border);
  --landing-showcase-image-bg: var(--qpress-tile-bg);
  --landing-spot-accent: var(--qpress-spot-accent);
  --landing-resource-link-bg: var(--qpress-resource-link-bg);
  --landing-resource-link-text: var(--qpress-resource-link-text);
  --landing-resource-item-border: var(--qpress-resource-item-border);
  --landing-resource-item-bg: var(--qpress-resource-item-bg);
  --landing-accent-text: var(--qpress-color-primary);
  --landing-page-overlay-1: var(--qpress-hero-glow-primary);
  --landing-page-overlay-2: var(--qpress-hero-glow-secondary);
  --landing-page-overlay-start: var(--qpress-hero-start);
  --landing-page-overlay-end: var(--qpress-hero-end);
  --landing-mesh-color: var(--qpress-mesh-color);
  --landing-hero-glow-1: var(--qpress-hero-glow-primary);
  --landing-hero-glow-2: var(--qpress-hero-glow-secondary);
  --landing-hero-start: var(--qpress-hero-start);
  --landing-hero-end: var(--qpress-hero-end);
}
/* qpress-theme-bridge:end */

/* landing-token-usage:start */
.landing-page::before {
  background:
    radial-gradient(circle at 12% 12%, var(--landing-page-overlay-1), transparent 26%),
    radial-gradient(circle at 82% 8%, var(--landing-page-overlay-2), transparent 32%),
    linear-gradient(180deg, var(--landing-page-overlay-start), var(--landing-page-overlay-end));
}

.hero {
  background:
    radial-gradient(circle at top left, var(--landing-hero-glow-1), transparent 34%),
    radial-gradient(circle at 82% 20%, var(--landing-hero-glow-2), transparent 20%),
    linear-gradient(145deg, var(--landing-hero-start), var(--landing-hero-end));
  box-shadow: var(--landing-shadow);
}

.hero__mesh {
  background: radial-gradient(circle, var(--landing-mesh-color), transparent 68%);
}

.hero__eyebrow,
.section-heading__eyebrow,
.path-card__eyebrow,
.resource-card__eyebrow,
.preview-panel__kicker,
.preview-panel__note,
.showcase-card__meta {
  color: var(--landing-chip-text);
}

.hero-title,
.hero-subtitle,
.preview-panel__copy h2,
.section-heading__title,
.path-card__title,
.feature-card__title,
.showcase-card__title,
.resource-card__title,
.preview-stat__value,
.resource-list__title {
  color: var(--landing-heading);
}

.hero-button--solid {
  background: var(--landing-solid-bg);
  color: var(--landing-solid-text);
  box-shadow: var(--landing-solid-shadow);
}

.hero-button--ghost {
  background: var(--landing-ghost-bg);
  border-color: var(--landing-border-strong);
  color: var(--landing-ghost-text);
}

.hero-pill {
  border-color: var(--landing-pill-border);
  background: var(--landing-pill-bg);
  color: var(--landing-pill-text);
}

.preview-panel,
.path-card,
.feature-card,
.showcase-card,
.resource-card {
  background: var(--landing-surface);
  box-shadow: var(--landing-card-shadow);
}

.preview-panel {
  background:
    linear-gradient(
      180deg,
      var(--landing-panel-gradient-top),
      var(--landing-panel-gradient-bottom)
    ),
    var(--landing-panel-bg);
}

.preview-card {
  border-color: var(--landing-preview-card-border);
  background: var(--landing-preview-card-bg);
}

.preview-stat {
  border-color: var(--landing-stat-border);
  background: var(--landing-stat-bg);
}

.preview-stat__label,
.path-card__eyebrow,
.path-card__meta,
.showcase-card__meta,
.showcase-more a {
  color: var(--landing-meta-text);
}

.path-card::before,
.feature-card::before,
.showcase-card::before {
  background: linear-gradient(90deg, var(--landing-accent-line), transparent 68%);
}

.path-card__icon,
.feature-card__icon {
  background: var(--landing-icon-bg);
  color: var(--landing-icon-color);
}

.showcase-card__image {
  border-color: var(--landing-showcase-image-border);
  background: var(--landing-showcase-image-bg);
}

.resource-card--primary {
  background:
    radial-gradient(circle at top right, var(--landing-spot-accent), transparent 30%),
    var(--landing-surface-strong);
}

.resource-link {
  border-color: var(--landing-border-strong);
  background: var(--landing-resource-link-bg);
  color: var(--landing-resource-link-text);
}

.resource-list__item {
  border-color: var(--landing-resource-item-border);
}

.resource-list__title {
  color: var(--landing-accent-text);
}
/* landing-token-usage:end */
</style>
