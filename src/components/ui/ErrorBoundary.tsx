"use client";

import React from "react";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: unknown };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error } as State;
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // eslint-disable-next-line no-console
    console.error("UI ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-700 bg-red-50 border border-red-200 rounded-md">
          <p className="font-semibold">Something went wrong.</p>
          <p className="text-sm">Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
