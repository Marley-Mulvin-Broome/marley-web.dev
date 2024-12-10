import type { Breadcrum, BreadcrumKey } from "./types"

export const config = {
  site: 'https://marley-web.dev',
}

const foldersBreadcrum: Breadcrum = {
  title: "Folders",
  href: "/folders",
}

export const breadcrums: Record<BreadcrumKey, Breadcrum[]>  = {
  "folders": [foldersBreadcrum],
  "about": [foldersBreadcrum, { 
    title: "About Me",
    href: "/folders/about-me"
   }],
   "projects": [foldersBreadcrum, { 
    title: "Projects",
    href: "/folders/projects"
   }],
   "articles": [foldersBreadcrum, { 
    title: "Articles",
    href: "/folders/articles"
   }],
   "contact": [foldersBreadcrum, { 
    title: "Contact",
    href: "/folders/contact"
   }]
}