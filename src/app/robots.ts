import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theroguepuffin.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/bootcamp/',
                '/admin/',
                '/api/',
                '/dashboard/',
                '/login/',
                '/signup/',
                '/rogue-superpower-session/start/',
                '/rogue-memory-session/start/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
