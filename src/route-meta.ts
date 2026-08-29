export const SITE_ORIGIN = 'https://pixel-brief-builder.sociobot.in';

export interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
}

export const routeMeta: Record<string, RouteMetadata> = {
  '/': {
    title: 'Pixel Brief Builder — plan a tiny game art list',
    description: 'Choose four limits and get an art checklist, 16×16 tile template, six-panel storyboard, and safe filenames.',
    canonicalPath: '/',
  },
  '/demo': {
    title: 'Demo — Pixel Brief Builder',
    description: 'Try a complete sample game art packet without changing your real packet.',
    canonicalPath: '/demo',
  },
  '/privacy': {
    title: 'Privacy — Pixel Brief Builder',
    description: 'Read how Pixel Brief Builder keeps game packets in your browser.',
    canonicalPath: '/privacy',
  },
  '/terms': {
    title: 'Terms — Pixel Brief Builder',
    description: 'Read the plain terms for using Pixel Brief Builder.',
    canonicalPath: '/terms',
  },
  '/print': {
    title: 'Print packet — Pixel Brief Builder',
    description: 'Print your checklist, 16×16 tile template, and six-panel storyboard.',
    canonicalPath: '/print',
  },
};

export const notFoundMeta: RouteMetadata = {
  title: 'Page not found — Pixel Brief Builder',
  description: 'Return to Pixel Brief Builder.',
  canonicalPath: '/404',
};

export function metadataFor(pathname: string, queryDemo = false): RouteMetadata {
  if (pathname === '/' && queryDemo) return routeMeta['/demo'];
  return routeMeta[pathname] ?? { ...notFoundMeta, canonicalPath: pathname };
}
