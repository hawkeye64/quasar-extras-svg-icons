import { fabGithub, fabXTwitter } from "@quasar/extras/fontawesome-v7";
import { mdiCharity } from "@quasar/extras/mdi-v7";

import { version, productName } from "../../../icons/package.json";
import { slugify } from "../.q-press/components/markdown-utils";

const repoBranch = "main";

export interface SocialLink {
  name: string;
  icon: string;
  path: string;
  external?: boolean;
  image?: boolean;
  color?: string;
}

export interface SiteMenuItem extends MenuItem {
  about?: string;
  expanded?: boolean;
  external?: boolean;
  children?: SiteMenuItem[];
  separator?: boolean;
  header?: string;
  mq?: number;
  extract?: string;
  image?: string;
  maxWidth?: string;
}

export interface LinksConfig {
  primaryHeaderLinks: SiteMenuItem[];
  secondaryHeaderLinks: SiteMenuItem[];
  moreLinks: SiteMenuItem[];
  footerLinks: SiteMenuItem[];
  socialLinks: SocialLink[];
  ecoSystemLinks?: SiteMenuItem[];
}

export interface LogoConfig {
  showLogo: boolean;
  logoLight: string;
  logoDark: string;
  logoAlt: string;
}

export interface versionConfig {
  showTitle: boolean;
  showVersion: boolean;
  showOnHeader: boolean;
  showOnSidebar: boolean;
}

export interface UIConfig {
  usePrimaryHeader: boolean; // typically 72px
  useSecondaryHeader: boolean; // typically 55px
  headerHeightHint: number; // typically 128 for both headers
  useMoreLinks: boolean;
  useFooter: boolean;
  useSidebar: boolean;
  useToc: boolean;
}

export interface CopyrightConfig {
  line1: string;
  line2: string;
}

export interface LicenseConfig {
  label: string;
  link: string;
}

export interface PrivacyConfig {
  label: string;
  link: string;
}

export interface SiteConfig {
  lang: string;
  title: string;
  description: string;
  theme: string;
  version: string;
  copyright: CopyrightConfig;
  githubEditRootSrc: string; // src folder for github edit links (appended with 'markdown' and 'examples')
  license: LicenseConfig;
  privacy: PrivacyConfig;
  logoConfig: LogoConfig;
  versionConfig: versionConfig;
  config: UIConfig;
  links: LinksConfig;
  sidebar: MenuItem[];
}

function getSidebarPath(item: MenuItem): string {
  if (item.external === true) {
    return item.path ?? slugify(item.name);
  }

  const path = item.path?.replace(/^\/+/, "").split("/").filter(Boolean).pop();
  return path ?? slugify(item.name);
}

function processMenuItem(item: MenuItem): MenuItem {
  return {
    name: item.name,
    path: getSidebarPath(item),
    expanded: item.expanded ?? false,
    children: item.children ? item.children.map(processMenuItem) : undefined,
  };
}

const socialLinks = {
  name: "Social",
  mq: 1400, // media query breakpoint
  children: [
    {
      name: "GitHub",
      icon: fabGithub,
      path: `https://github.com/hawkeye64/quasar-extras-svg-icons/tree/${repoBranch}`,
      external: true,
    },
    {
      name: "X (Twitter)",
      icon: fabXTwitter,
      path: "https://twitter.com/jgalbraith64",
      external: true,
    },
    {
      name: "Sponsor",
      icon: mdiCharity,
      color: "red",
      path: "https://github.com/sponsors/hawkeye64",
      external: true,
    },
    {
      name: "Jeff",
      icon: "/profile.png",
      path: "https://github.com/hawkeye64",
      external: true,
      image: true,
    },
  ] as SocialLink[],
};

function getFooterSocialLink(link: SocialLink): SiteMenuItem {
  const { image, ...rest } = link;
  const item: SiteMenuItem = {
    ...rest,
  };

  if (image === true) {
    item.image = link.icon;
  }

  return item;
}

const netlifyLink = {
  path: "https://www.netlify.com",
  external: true,
  image: "https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg",
  name: "Deploys by Netlify",
  maxWidth: "120px",
};

const sponsorLink = {
  path: "https://github.com/sponsors/hawkeye64",
  external: true,
  image: "https://github.com/hawkeye64.png?size=96",
  name: "Sponsor Jeff",
  maxWidth: "24px",
};
const SponsorsLinks = {
  name: "Sponsors",
  children: [
    {
      name: netlifyLink.name,
      path: netlifyLink.path,
      external: netlifyLink.external,
      image: netlifyLink.image,
      maxWidth: netlifyLink.maxWidth,
    },
    {
      name: sponsorLink.name,
      path: sponsorLink.path,
      external: sponsorLink.external,
      image: sponsorLink.image,
      maxWidth: sponsorLink.maxWidth,
    },
  ],
};

const footerLinks = [
  {
    name: SponsorsLinks.name,
    children: [...SponsorsLinks.children],
  },
  {
    name: socialLinks.name,
    children: socialLinks.children
      .filter(({ name }) => name !== "Sponsor" && name !== "Jeff")
      .map(getFooterSocialLink),
  },
];

const gettingStartedMenu: SiteMenuItem = {
  name: "Getting Started",
  mq: 470, // media query breakpoint
  children: [
    { name: "Introduction", path: "/getting-started/introduction" },
    { name: "Icon Finder", path: "/getting-started/icon-finder" },
  ],
};

const guidesMenu: SiteMenuItem = {
  name: "Guides",
  mq: 1100, // media query breakpoint
  children: [
    {
      name: "General FAQ",
      path: "/faq/general",
    },
    {
      name: "Best Practices",
      path: "/faq/best-practices",
    },
    {
      name: "Troubleshooting",
      path: "/faq/troubleshooting",
    },
  ],
};

const otherMenu: SiteMenuItem = {
  name: "Other",
  mq: 1190, // media query breakpoint
  children: [
    {
      name: "Upgrade Guide",
      path: "/other/upgrade-guide",
    },
    {
      name: "Releases",
      path: "/other/releases",
    },
    {
      name: "Contact",
      path: "/other/contact",
    },
    {
      name: "Contributing",
      children: [
        { name: "Overview", path: "/other/contributing/overview" },
        {
          name: "Bugs and Feature Requests",
          path: "/other/contributing/bugs-and-feature-requests",
        },
        { name: "Documentation", path: "/other/contributing/documentation" },
        { name: "Call to Action", path: "/other/contributing/call-to-action" },
        { name: "Sponsor", path: "/other/contributing/sponsor" },
      ],
    },
  ],
};

const processedGuidesMenu = {
  name: guidesMenu.name,
  path: slugify(guidesMenu.name),
  expanded: false,
  children: guidesMenu.children ? guidesMenu.children.map(processMenuItem) : [],
};

const processedOtherMenu = {
  name: otherMenu.name,
  path: slugify(otherMenu.name),
  expanded: false,
  children: otherMenu.children ? otherMenu.children.map(processMenuItem) : [],
};

const secondaryToolbarLinks = [gettingStartedMenu, guidesMenu, otherMenu];

export const moreLinks = [
  {
    name: "More",
    // children: [...primaryToolbarLinks, { separator: true }, ...secondaryToolbarLinks, socialLinks],
    children: [...secondaryToolbarLinks, socialLinks],
  },
];

export const sidebar = [
  {
    name: gettingStartedMenu.name,
    path: slugify(gettingStartedMenu.name),
    expanded: false,
    children: gettingStartedMenu.children
      ? gettingStartedMenu.children.map((item) => ({
          name: item.name,
          path: slugify(item.name),
        }))
      : [],
  },
  processedGuidesMenu,
  processedOtherMenu,
];

const config = {
  lang: "en-US",
  title: productName,
  description:
    "quasar-extras-svg-icons a collection of SVG packages that make it easy to integrate a wide arrange of SVG icons into Quasar applications.",
  theme: "doc",
  version: version,
  copyright: {
    line1: `Copyright © 2021-${new Date().getFullYear()} Jeff Galbraith`,
    line2: "",
  } as CopyrightConfig,
  githubEditRootSrc: `https://github.com/hawkeye64/quasar-extras-svg-icons/edit/${repoBranch}/docs/src/`,
  license: {
    label: "MIT License",
    link: `https://github.com/hawkeye64/quasar-extras-svg-icons/blob/${repoBranch}/LICENSE.md`,
  } as LicenseConfig,
  privacy: {
    label: "Privacy Policy",
    link: "/privacy-policy",
  } as PrivacyConfig,
  logoConfig: {
    showLogo: true,
    logoLight: "/heart.png",
    logoDark: "/heart.png",
    logoAlt: "quasar-extras-svg-icons",
  } as LogoConfig,
  versionConfig: {
    showTitle: true,
    showVersion: true,
    showOnHeader: false,
    showOnSidebar: true,
  } as versionConfig,
  config: {
    usePrimaryHeader: false,
    useSecondaryHeader: true,
    headerHeightHint: 55,
    useMoreLinks: true,
    useFooter: true,
    // useFooterLinks: true,
    useSidebar: true,
    useSidebarVersion: true,
    useToc: true,
  } as UIConfig,
  links: {
    primaryHeaderLinks: [] as SiteMenuItem[], // [...primaryToolbarLinks],
    secondaryHeaderLinks: [...secondaryToolbarLinks] as SiteMenuItem[],
    moreLinks,
    footerLinks: [...footerLinks] as SiteMenuItem[],
    socialLinks: [...socialLinks.children] as SocialLink[],
  },
  sidebar,
} as SiteConfig;

export { sidebar as menu };
export default config;
