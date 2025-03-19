/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        oracledb: false,
        'better-sqlite3': false,
        sqlite3: false,
        mysql: false,
        mysql2: false,
        tedious: false, // SQL Server
        'pg-query-stream': false,
      };
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['knex', 'pg'],
  },
}

module.exports = nextConfig