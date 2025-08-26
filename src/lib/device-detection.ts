import { NextRequest } from "next/server";

/**
 * Detect if the request is coming from a mobile or tablet device
 */
export function isMobileOrTabletRequest(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') || '';
  
  // Check for mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = mobileRegex.test(userAgent);
  
  // Check for tablet specific patterns
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i.test(userAgent);
  
  return isMobile || isTablet;
}

/**
 * Check if the request comes from a desktop device
 */
export function isDesktopRequest(req: NextRequest): boolean {
  return !isMobileOrTabletRequest(req);
}

/**
 * Get device type from user agent
 */
export function getDeviceType(req: NextRequest): 'mobile' | 'tablet' | 'desktop' {
  const userAgent = req.headers.get('user-agent') || '';
  
  if (/iPad|Android(?=.*\bTablet\b)/i.test(userAgent)) {
    return 'tablet';
  }
  
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
}
