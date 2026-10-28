/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (served at the stratcoug.com root, so no basePath)
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
