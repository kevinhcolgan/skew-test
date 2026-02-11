"use client";

import { useState } from "react";
import { greet } from "./actions";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    try {
      const message = await greet();
      setResult(message);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Skew Protection Test</h1>
      <p className="text-gray-500 text-sm">
        Deploy a new version while this tab is open, then click the button.
      </p>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Call server action
      </button>
      {result && (
        <p className="text-green-600 font-mono bg-green-50 px-4 py-2 rounded">
          {result}
        </p>
      )}
      {error && (
        <p className="text-red-600 font-mono bg-red-50 px-4 py-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
}
