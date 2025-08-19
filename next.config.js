/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    compiler: {
        // Remove React testing library attributes in production
        reactRemoveProperties: process.env.NODE_ENV === "production" ? { properties: ["^data-testid$"] } : false,
    }
}

module.exports = nextConfig
