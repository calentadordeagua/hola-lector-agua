import type { NextConfig } from "next";

const staticExport = process.env.NEXT_STATIC_EXPORT === "1";
const basePath = staticExport ? (process.env.NEXT_PUBLIC_BASE_PATH || "") : "";

const staticAssetHeaders: NonNullable<NextConfig["headers"]> = async () => [
    {
        source: '/assets/:path*',
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
            },
        ],
    },
    {
        source: '/fonts/:path*',
        headers: [
            {
                key: 'Cache-Control',
                value: 'public, max-age=31536000, immutable',
            },
        ],
    },
];

const nextConfig: NextConfig = {

    ...(staticExport ? {
        output: 'export' as const,
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
    } : {}),
    reactStrictMode: true,
    devIndicators: false,
    poweredByHeader: false,
    compress: true,
    images: {
        unoptimized: staticExport,
        qualities: [60, 75],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, 
    },
    ...(!staticExport ? {
        serverExternalPackages: ['jszip'],
        outputFileTracingExcludes: {
            '*': [
                'public/books/**/*',
                'public/content/**/*',
                'public/images/books/**/*',
                '.cache/**/*',
                'node_modules/**/*.map',
                'node_modules/**/*.md',
                'node_modules/**/*.txt',
            ],
        },
        headers: staticAssetHeaders,
    } : {}),
};

export default nextConfig;
