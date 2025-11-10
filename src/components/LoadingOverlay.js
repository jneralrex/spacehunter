// src/components/LoadingOverlay.js
"use client";

import useLoadingStore from "@/utils/store/useLoading";


export default function LoadingOverlay() {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
