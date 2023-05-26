/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')

dotenv.config()

const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
    },
    output: "standalone"
}

module.exports = nextConfig