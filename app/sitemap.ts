import { MetadataRoute } from "next";

export const dynamic = "force-static"; // ensures it's generated properly

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://esteemwears.in";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/catalogue/boys`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/catalogue/girls`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/catalogue/men`,
      lastModified: new Date(),
    },
  ];
}
