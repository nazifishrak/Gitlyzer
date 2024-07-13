/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['assets5.lottiefiles.com', 'images.unsplash.com','raw.githubusercontent.com','www.google.com', "www.dwavesys.com"],
        remotePatterns:
        [{
            protocol: "https",
            hostname: "**"
        }]
    }
};

export default nextConfig;
