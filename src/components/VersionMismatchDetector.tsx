"use client";

import { useEffect, useState } from "react";
import {
  isVersionMismatchError,
  VERSION_MISMATCH_EVENT,
} from "../lib/version-mismatch";

function dispatchVersionMismatch() {
  window.dispatchEvent(new CustomEvent(VERSION_MISMATCH_EVENT));
}

export function VersionMismatchDetector() {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      if (isVersionMismatchError(event.error ?? event.message)) {
        dispatchVersionMismatch();
      }
    }

    function handleRejection(event: PromiseRejectionEvent) {
      if (isVersionMismatchError(event.reason)) {
        dispatchVersionMismatch();
      }
    }

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  useEffect(() => {
    function handler() {
      setDetected(true);
    }
    window.addEventListener(VERSION_MISMATCH_EVENT, handler);
    return () => window.removeEventListener(VERSION_MISMATCH_EVENT, handler);
  }, []);

  if (!detected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-8 max-w-md text-center space-y-4 shadow-xl">
        <h2 className="text-xl font-bold">A new version is available</h2>
        <p className="text-gray-600">
          Your last action was not completed because a newer version of this
          page is available. Please reload and try again.
        </p>
        <button
          autoFocus
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
