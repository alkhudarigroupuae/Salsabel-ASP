import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: '/account',
        destination: '/my-account',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
