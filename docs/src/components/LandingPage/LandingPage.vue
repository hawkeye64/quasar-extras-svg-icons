<template>
  <div class="landing-page markdown-brand">
    <header class="hero">
      <img src="/heart.png" alt="Quasar Extras SVG Icons Logo" class="hero-logo" />
      <h1 class="hero-title">Quasar Extras SVG Icons</h1>
      <h2 class="hero-subtitle">Beautiful SVG Icon Sets for Your Quasar apps</h2>
      <div class="row justify-center">
        <p class="hero-subtitle2" style="max-width: 660px">
          {{ siteConfig.description }}
        </p>
      </div>

      <div class="hero-buttons">
        <router-link
          to="/getting-started/introduction"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <span
            class="hero-button__content q-btn__content text-center col items-center q-anchor--skip justify-around row"
          >
            <span class="hero-button__label">Get Started</span>
            <q-icon :name="biArrowRightCircle" />
          </span>
        </router-link>
        <a
          href="https://github.com/hawkeye64/quasar-extras-svg-icons"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-button q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--rounded q-btn--dense"
        >
          <span
            class="hero-button__content q-btn__content text-center col items-center q-anchor--skip justify-around row"
          >
            <q-icon :name="fabGithub" class="q-mr-sm" />
            <span class="hero-button__label">GitHub Repo</span>
          </span>
        </a>
      </div>
    </header>

    <div class="byline">
      <p>
        Add production-ready SVG icon sets to Quasar apps without dragging every upstream package
        artifact into your bundle.
      </p>
    </div>

    <section class="section-heading hero">
      <div class="hero-title">Explore</div>
    </section>
    <main class="content grid-container">
      <div
        v-for="card in exploreCards"
        :key="card.name"
        class="section grid-item"
        @click="navigate(card.path)"
      >
        <q-card flat class="section-card">
          <h2>{{ card.name }}</h2>
          <p>{{ card.desc }}</p>
        </q-card>
      </div>
    </main>

    <section class="section-heading hero">
      <div class="hero-title">What You Get</div>
    </section>
    <main class="content grid-container">
      <div
        v-for="card in featureCards"
        :key="card.name"
        class="section grid-item"
        @click="navigate(card.path)"
      >
        <q-card flat class="section-card">
          <h2>{{ card.name }}</h2>
          <p>{{ card.desc }}</p>
        </q-card>
      </div>
    </main>

    <section class="section-heading hero">
      <div class="hero-title">Featured Icon Sets</div>
    </section>
    <div class="byline">
      <p>
        A broader taste of the icon families included in the package. Use the Icon Finder to search
        every exported icon across all sets.
      </p>
    </div>
    <main class="content icon-grid">
      <div
        v-for="iconSet in featuredIconSets"
        :key="iconSet.name"
        class="section icon-card"
        @click="navigate(iconSet.path)"
      >
        <q-img
          :src="iconSet.src"
          :alt="`${iconSet.name} preview`"
          fit="contain"
          class="icon-card__image rounded-borders"
        />
        <h2>{{ iconSet.name }}</h2>
        <p>{{ iconSet.desc }}</p>
      </div>
    </main>
    <div class="featured-more">
      <p>
        ...and many more. Explore all
        <router-link to="/getting-started/icon-finder">{{ iconSetCount }} icon sets</router-link>
        in the SVG Icon Finder.
      </p>
    </div>

    <q-separator />
    <div class="byline">
      <p>
        Explore the
        <a href="https://github.com/hawkeye64/quasar-extras-svg-icons" target="_blank">
          quasar-extras-svg-icons GitHub repo
        </a>
        for package source, generated icon sets, and issue tracking.
      </p>
      <p>
        This site is built with
        <a href="https://github.com/hawkeye64/md-plugins" target="_blank">@md-plugins</a>
        and Q-Press, the shared documentation tooling used across these projects.
      </p>
    </div>
    <q-separator />
    <div class="byline">
      <p>
        We hope you find this documentation helpful. If you have any questions or need further
        assistance, please don't hesitate to reach out to our support team.
      </p>
      <p>Happy coding!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QIcon } from "quasar";
import { fabGithub } from "@quasar/extras/fontawesome-v6";
import { useRouter } from "vue-router";
import siteConfig from "../../siteConfig";
import { biArrowRightCircle } from "@quasar/extras/bootstrap-icons";
import { iconSetMetadata } from "src/utils/icon-set-metadata";

const router = useRouter();
const iconSetCount = iconSetMetadata.length;

const exploreCards = [
  {
    name: "Introduction",
    desc: "Understand how this package complements @quasar/extras and why the icon sets are flattened for Quasar.",
    path: "/getting-started/introduction",
  },
  {
    name: "Icon Finder",
    desc: "Browse the bundled SVG icon sets and copy the import names you need for your application.",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Releases",
    desc: "Review recent package changes and follow what is available in the current beta line.",
    path: "/other/releases",
  },
];

const featureCards = [
  {
    name: "Quasar Ready",
    desc: "Icons are exported as strings that work directly with QIcon, QBtn, and Quasar icon-set overrides.",
    path: "/getting-started/introduction",
  },
  {
    name: "Typed Exports",
    desc: "Generated TypeScript declarations make icon imports discoverable and safer to use in applications.",
    path: "/getting-started/introduction",
  },
  {
    name: "Curated Sources",
    desc: "Upstream SVG packages are flattened and cleaned so apps can consume the useful icons without extra baggage.",
    path: "/getting-started/introduction",
  },
];

const featuredIconSets = [
  {
    name: "Ant Design Icons",
    desc: "Outlined, filled, and two-tone icons from the Ant Design ecosystem.",
    src: "/ant-design-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Boxicons",
    desc: "A broad, practical icon family with regular, solid, and logo variants.",
    src: "/box-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Tabler Icons",
    desc: "A large, practical outline and brand icon family for app interfaces.",
    src: "/tabler-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Remix Icons",
    desc: "Consistent system icons with filled and line variants.",
    src: "/remix-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Carbon Icons",
    desc: "IBM Carbon icons and pictograms for product-style interfaces.",
    src: "/carbon-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Carbon Pictograms",
    desc: "Large-scale IBM pictograms for richer product and content experiences.",
    src: "/carbon-pictograms.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "CoreUI Icons",
    desc: "Interface and brand icons with solid, line, and flag families.",
    src: "/coreui-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Country Flags",
    desc: "SVG country flags for locale selectors, dashboards, and global products.",
    src: "/country-flag-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Fluent UI System Icons",
    desc: "Microsoft Fluent-style icons for polished application interfaces.",
    src: "/fluentui-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "GitLab Icons",
    desc: "GitLab product icons for developer tooling and workflow interfaces.",
    src: "/gitlab-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Glyphs Core",
    desc: "Bold, thin, outline, duo, and poly glyph styles in one family.",
    src: "/glyphs-core-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Health Icons",
    desc: "Medical, humanitarian, and public-health iconography.",
    src: "/health-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Hero Icons",
    desc: "Clean outline and solid icons from the Tailwind Labs family.",
    src: "/hero-icons-outline.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Iconoir",
    desc: "Modern line and solid icons with a crisp product-design feel.",
    src: "/iconoir.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Keyrune Icons",
    desc: "Magic: The Gathering set symbols for deck tools and card apps.",
    src: "/keyrune-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Material Theme Icons",
    desc: "File and language icons inspired by popular editor themes.",
    src: "/material-theme-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Octicons",
    desc: "GitHub's interface icon family for developer-focused applications.",
    src: "/octicons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Simple Icons",
    desc: "Brand icons for services, tools, frameworks, and platforms.",
    src: "/simple-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "OpenMoji",
    desc: "Color emoji SVGs flattened for use in Quasar icon contexts.",
    src: "/openmoji-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Phosphor Icons",
    desc: "Flexible icon weights with a friendly, consistent visual language.",
    src: "/phosphor-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Pixel Art Icons",
    desc: "Crisp pixel-style icons for playful or retro UI moments.",
    src: "/pixelart-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Prime Icons",
    desc: "Compact UI icons commonly used in component-heavy applications.",
    src: "/prime-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Radix UI Icons",
    desc: "Small, sharp interface icons that pair well with accessible components.",
    src: "/radix-ui-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Teeny Icons",
    desc: "Tiny outline and solid icons made for dense interfaces.",
    src: "/teeny-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Vaadin Icons",
    desc: "Application and business icons from the Vaadin design system.",
    src: "/vaadin-icons.png",
    path: "/getting-started/icon-finder",
  },
  {
    name: "Weather Icons",
    desc: "Forecast and condition symbols for weather-aware interfaces.",
    src: "/weather-icons.png",
    path: "/getting-started/icon-finder",
  },
];

function navigate(path: string) {
  router.push(path);
}
</script>

<style lang="scss" scoped>
.landing-page {
  font-family: "Arial", sans-serif;
  color: #333;
}

.hero {
  background: linear-gradient(135deg, $brand-primary, $brand-secondary);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.section-heading {
  padding: 28px 20px;
}

.section-heading .hero-title {
  font-size: 2.6em;
}

.hero-logo {
  max-width: 200px;
  margin-bottom: 20px;
  border-radius: 50%;
}

.hero-title {
  font-size: 3.5em;
  line-height: 1.2em;
  font-weight: 700;
  margin: 0;
  padding: 0.2em 0;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  font-size: 1.8em;
  line-height: 1.8em;
  margin: 0;
}

.hero-subtitle2 {
  font-size: 1.2em;
  line-height: 1.2em;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.hero-button {
  background: white;
  color: $brand-primary;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.hero-button:hover {
  background: #f0f0f0;
}

.hero-button__content {
  flex-wrap: nowrap;
  width: 120px;
}

.hero-button__label {
  white-space: nowrap;
}

.byline {
  text-align: center;
  font-size: 1.2em;
  margin: 20px auto;
  max-width: 820px;
  color: #35495e;
  padding: 0 20px;
}

.byline a {
  color: $brand-primary;
  font-weight: 700;
  text-decoration: none;
}

.byline a:hover {
  text-decoration: underline;
}

body.body--dark .byline {
  color: #f0f0f0;
}

body.body--dark .byline a {
  color: $brand-accent;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.grid-container,
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
}

.icon-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-item {
  cursor: pointer;
}

.section {
  padding: 24px;
  color: white;
  text-decoration: none;
  background: linear-gradient(135deg, $brand-primary, $brand-secondary);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.section-card {
  background: transparent;
  color: inherit;
}

.section:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.section h2 {
  margin-top: 0;
  color: white;
  font-size: 2.125rem;
  line-height: 2.5rem;
  letter-spacing: 0.00735em;
  font-weight: 700;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.section p {
  color: rgba(255, 255, 255, 0.92);
  font-size: 1.05rem;
  line-height: 1.45;
}

.icon-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.icon-card__image {
  height: 150px;
  margin-bottom: 18px;
  background: rgba(255, 255, 255, 0.16);
}

.featured-more {
  margin: 4px auto 34px;
  padding: 0 20px;
  max-width: 760px;
  text-align: center;
  color: #35495e;
  font-size: 1.3rem;
  font-weight: 700;
}

.featured-more a {
  color: $brand-primary;
  text-decoration: none;
}

.featured-more a:hover {
  text-decoration: underline;
}

body.body--dark .featured-more {
  color: #f0f0f0;
}

body.body--dark .featured-more a {
  color: $brand-accent;
}

@media (max-width: 700px) {
  .hero-title {
    font-size: 2.5em;
  }

  .hero-subtitle {
    font-size: 1.35em;
  }

  .hero-buttons {
    align-items: center;
    flex-direction: column;
  }

  .grid-container,
  .icon-grid {
    grid-template-columns: 1fr;
  }
}
</style>
