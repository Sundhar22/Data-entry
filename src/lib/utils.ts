import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers in Indian style (1,00,000)
export function formatNumber(value: number): string {
  return value.toLocaleString('en-IN')
}

// Format currency in Indian Rupees - SSR safe
export function formatCurrency(value: number): string {
  const formatted = formatNumber(value)
  return `₹${formatted}`
}

// Format date in Indian format (DD/MM/YYYY) - SSR safe
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

// Format date and time - SSR safe
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}
