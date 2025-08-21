import * as React from "react"

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-t border-slate-200 bg-white px-4 py-3 ${className || ''}`}>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>&copy; 2025 AgriTrade System</p>
        <p>v1.0</p>
      </div>
    </footer>
  )
}
