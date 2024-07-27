/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            {
                "source": "/blogs", "destination": "https://blogs-plum-ten.vercel.app/blogs"
            },
            {
                "source": "/blogs/:path*", "destination": "https://blogs-plum-ten.vercel.app/blogs/:path*"
            }
        ]
    }
};

export default nextConfig;
