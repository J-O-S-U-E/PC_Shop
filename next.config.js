/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: { // added to use images with sanity.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '**',
            },
        ],
    },
    }
module.exports = nextConfig
