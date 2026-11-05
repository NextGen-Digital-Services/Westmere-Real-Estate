import { MetadataRoute } from "next";
import { PROPERTIES } from "@/data/properties";
import { PROJECTS } from "@/data/projects";
import { ARTICLES } from "@/data/articles";
import { AGENTS } from "@/data/agents";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/commercial",
    "/projects",
    "/sell",
    "/valuation",
    "/services",
    "/team",
    "/blog",
    "/contact",
    "/favourites",
    "/tools",
    "/about",
    "/privacy",
    "/cookies",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const propertyRoutes = PROPERTIES.map((prop) => ({
    url: `${baseUrl}/properties/${prop.slug}`,
    lastModified: new Date(prop.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const projectRoutes = PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes = ARTICLES.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const agentRoutes = AGENTS.map((ag) => ({
    url: `${baseUrl}/team/${ag.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes, ...articleRoutes, ...agentRoutes];
}
