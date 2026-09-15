import {
  AlertTriangle,
  BadgeHelp,
  Briefcase,
  Building2,
  CalendarCheck,
  CircleDollarSign,
  FileBadge2,
  FileUser,
  Gauge,
  Headset,
  IdCard,
  Share2,
  User,
  UserCog,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  to: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: Gauge },
  { label: 'Users', to: '/users', icon: User },
  { label: 'Providers', to: '/providers', icon: Briefcase },
  { label: 'Service category', to: '/service-category', icon: Share2 },
  { label: 'Bookings', to: '/bookings', icon: CalendarCheck },
  { label: 'Verification / KYC', to: '/verification', icon: IdCard },
  { label: 'Earnings', to: '/earnings', icon: CircleDollarSign },
  { label: 'Disputes', to: '/disputes', icon: AlertTriangle },
  { label: 'Help & support', to: '/help-support', icon: Headset },
  { label: 'Manage FAQ', to: '/manage-faq', icon: BadgeHelp },
  { label: 'Terms & Conditions', to: '/terms', icon: FileBadge2 },
  { label: 'Privacy Policy', to: '/privacy-policy', icon: FileUser },
  { label: 'Legal & Company', to: '/legal-company', icon: Building2 },
  { label: 'Manage Profile', to: '/profile', icon: UserCog },
]
