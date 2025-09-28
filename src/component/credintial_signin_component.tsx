"use client";

import { useState } from "react";
import { signInAction } from "@/lib/signin_action";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function CredintialSigninComponent() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const response = await signInAction(formData);
        if (response?.error) {
          console.log(response.error);
          setError(String(response.error));
          setLoading(false);
        } else if (response?.success) {
          router.push("/dashboard");
          router.refresh();
        }
      }}
      className="flex flex-col gap-3 text-gray-900"
    >
      {error && (
        <div className="p-3 mb-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}
      <div className="relative flex items-center gap-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          type="email"
          placeholder="Enter your email"
          name="email"
          required
        />
      </div>

      <div className="relative flex items-center gap-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          type={showPass ? "text" : "password"}
          placeholder="Enter your password"
          name="password"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? (
            <Eye className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeOff className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      <button
        disabled={loading}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
