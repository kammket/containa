/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Der Katalog wird als TypeScript-Quelle eingebunden und muss mitkompiliert werden.
  transpilePackages: ['@emc/catalog'],

  experimental: {
    // Barrel-Dateien in Direktimporte umschreiben. Ohne das zieht ein einzelner
    // Import aus @emc/catalog den kompletten Katalog (Städte, Blog, Suchindex)
    // in jedes Client-Bundle.
    optimizePackageImports: [
      '@emc/catalog',
      'lucide-react',
      'framer-motion',
      '@tanstack/react-query',
    ],
  },

  images: {
    // Bilder gehen nicht über den Bildoptimierer von Vercel, sondern über
    // einen eigenen Loader: Produktfotos direkt an das CDN von Cloudinary,
    // lokale Dateien unverändert. Begründung in src/lib/image-loader.ts.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    // Bestimmen weiterhin, welche Breiten im `srcSet` landen – der eigene
    // Loader setzt sie in Cloudinary-Transformationen um. `formats` und
    // `minimumCacheTTL` galten nur für den eingebauten Optimierer und sind
    // deshalb entfallen; Format und Cache-Zeit steuert jetzt Cloudinary
    // selbst über `f_auto`.
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Statische Assets sind content-hashed und dürfen unbegrenzt gecacht werden.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      // Häufige englische bzw. alternative Schreibweisen auf die kanonische URL führen
      { source: '/products', destination: '/shop', permanent: true },
      { source: '/shipping-containers', destination: '/seecontainer-kaufen', permanent: true },
      { source: '/blog', destination: '/ratgeber', permanent: true },
      { source: '/blog/:slug', destination: '/ratgeber/:slug', permanent: true },
      { source: '/faq', destination: '/haeufige-fragen', permanent: true },
      { source: '/contact', destination: '/kontakt', permanent: true },
      { source: '/about', destination: '/ueber-uns', permanent: true },
      { source: '/cart', destination: '/warenkorb', permanent: true },
      { source: '/checkout', destination: '/kasse', permanent: true },
    ];
  },
};

export default nextConfig;
