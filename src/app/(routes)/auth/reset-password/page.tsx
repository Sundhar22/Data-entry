"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [validToken, setValidToken] = useState<boolean | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token and email from URL parameters
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!tokenParam || !emailParam) {
      setError("Invalid reset link. Please request a new password reset.");
      setValidToken(false);
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
    setValidToken(true);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
      } else {
        // Handle validation errors specifically
        if (data.error?.code === "VALIDATION_ERROR" && data.error?.details) {
          const validationErrors = data.error.details;
          if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            setError(validationErrors[0].message || data.error.message);
          } else {
            setError(
              data.error.message ||
                "Validation failed. Please check your input.",
            );
          }
        } else {
          setError(
            data.error?.message ||
              "Failed to reset password. Please try again.",
          );
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Show error page for invalid token
  if (validToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Invalid Reset Link
            </h2>
            <p className="text-red-700 mb-6">
              This password reset link is invalid or has expired. Please request
              a new password reset.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/auth/forgot-password")}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Request New Reset Link
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/auth/login")}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show success page
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-green-700 mb-6">
              Your password has been successfully reset. You can now login with
              your new password.
            </p>
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading while validating token
  if (validToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Validating reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Reset Password
          </h1>
          <p className="text-slate-600">Enter your new password</p>
        </div>

        {/* Reset Password Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Create New Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <div className="text-red-800 text-sm">{error}</div>
                </Alert>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium"
                >
                  New Password
                </Label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full pr-12 pl-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-700 font-medium"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                    className="w-full pr-12 pl-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Reset Password
                  </div>
                )}
              </Button>
            </form>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
