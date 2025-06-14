
import React from "react";

export interface LoadingSpinnerOverlayProps {
  visible: boolean;
}

export function LoadingSpinnerOverlay({ visible }: LoadingSpinnerOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center pointer-events-auto">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading" />
    </div>
  );
}
