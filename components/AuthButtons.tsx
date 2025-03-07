"use client";

import { signIn } from "next-auth/react";

export default function AuthButtons() {




  return (
    <button
    onClick={() => signIn("google")}
    className="h-9 px-4 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
  >
    {/* Google Icon - Using a simple SVG or emoji for demo purposes */}
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.7-2.37 1.11-3.71 1.11-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C4 20.36 7.9 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.87 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.54 1 10.22 1 12s.43 3.46 1.18 4.93l3.69-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.89c1.62 0 3.07.57 4.23 1.68l3.17-3.17C17.46 1.98 14.97 1 12 1 7.9 1 4 3.64 2.18 7.07l3.69 2.84C6.73 7.32 9.15 5.4 12 4.89z"
        fill="#EA4335"
      />
    </svg>
    <span>Connect Google Drive</span>
  </button>
  );
}