import type { LucideIcon } from "lucide-react"

export interface Property {
  id: string
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: string
  image: string
  badge: string
  badgeColor: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export interface Project {
  id: string
  title: string
  location: string
  status: string
  launch: string
  description: string
  image: string
  badgeColor: string
}

export interface NavigationItem {
  name: string
  href: string
}

export interface Features {
  icon: LucideIcon
  title: string
  desc: string
}

export interface NewsItem {
  title: string
  description: string
  date: string
}