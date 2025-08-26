import * as React from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`border-t border-slate-200 bg-white px-3 py-2 lg:px-4 lg:py-3 flex-shrink-0 ${className || ""}`}
    >
      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>&copy; 2025 AgriTrade System</p>
        <p>v1.0</p>
      </div>
    </footer>
  );
}
