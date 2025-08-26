"use client";

import { ReactNode } from 'react';
import { useIsMobileOrTablet } from '@/hooks/useDeviceType';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DesktopOnlyProps {
  children: ReactNode;
  message?: string;
  showIcon?: boolean;
}

export default function DesktopOnly({ 
  children, 
  message = "This feature is only available on desktop devices for better usability and accuracy.",
  showIcon = true 
}: DesktopOnlyProps) {
  const isMobileOrTablet = useIsMobileOrTablet();

  if (isMobileOrTablet) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {showIcon && (
              <>
                <Smartphone className="h-6 w-6 text-gray-400" />
                <Tablet className="h-6 w-6 text-gray-400" />
                <span className="text-gray-400 mx-2">→</span>
                <Monitor className="h-8 w-8 text-blue-600" />
              </>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Desktop Required
          </h3>
          <p className="text-gray-600 max-w-md leading-relaxed">
            {message}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Please use a desktop or laptop computer to access this functionality.
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
}
