import { Bug, Flower2, PaintRoller, Scissors, Sparkles, Truck, Tv, Wrench, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ServiceCategory = {
  id: string
  name: string
  icon?: LucideIcon
  iconUrl?: string
  color: string
  bg: string
}

export const serviceCategories: ServiceCategory[] = [
  { id: '1', name: 'Cleaning', icon: Sparkles, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: '2', name: 'Plumbing', icon: Wrench, color: 'text-red-500', bg: 'bg-red-50' },
  { id: '3', name: 'Gardening', icon: Flower2, color: 'text-lime-600', bg: 'bg-lime-50' },
  { id: '4', name: 'Painting', icon: PaintRoller, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: '5', name: 'Moving', icon: Truck, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: '6', name: 'Personal Care', icon: Scissors, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: '7', name: 'Electrical', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: '8', name: 'Appliance', icon: Tv, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: '9', name: 'Pest Control', icon: Bug, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
]
