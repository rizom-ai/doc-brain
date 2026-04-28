import { Fragment, h, type ComponentChildren, type JSX } from "preact";
import type { Plugin, SitePackage } from "@rizom/brain/site";

const docsSections = [
  {
    id: "docs",
    template: "docs:doc-list",
    dataQuery: {
      entityType: "doc",
      query: { limit: 100 },
    },
  },
];

const DocsLayout = ({
  sections,
}: {
  sections: ComponentChildren[];
}): JSX.Element => h(Fragment, null, ...sections);

const docsSitePlugin = (): Plugin =>
  ({
    id: "doc-brain-site",
    version: "0.1.0",
    type: "service",
    packageName: "doc-brain",
    register: async () => ({ tools: [], resources: [] }),
  }) as unknown as Plugin;

const site: SitePackage = {
  layouts: {
    default: DocsLayout,
  },
  routes: [
    {
      id: "docs-home",
      path: "/",
      title: "Documentation",
      description: "Brains documentation",
      layout: "default",
      navigation: {
        show: true,
        label: "Docs",
        slot: "primary",
        priority: 10,
      },
      sections: docsSections,
    },
    {
      id: "docs",
      path: "/docs",
      title: "Documentation",
      description: "Brains documentation",
      layout: "default",
      sections: docsSections,
    },
  ],
  plugin: () => docsSitePlugin(),
  entityDisplay: {
    doc: {
      label: "Doc",
      pluralName: "docs",
      layout: "default",
      paginate: false,
      navigation: { show: false },
    },
  },
};

export default site;
