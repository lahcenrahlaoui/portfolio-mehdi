/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
      domains: ['lh3.googleusercontent.com'],
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/**',
          },
      ],
  },
  webpack(config) {
    config.module.rules.push({
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        use: {
          loader: 'url-loader',
        },
      });
      config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
      }
      return config
  }
};

export default nextConfig;
