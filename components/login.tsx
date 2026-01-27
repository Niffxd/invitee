"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { LogIn, Loader2, AlertCircle, User, Lock, Shield, Eye, EyeOff } from "lucide-react";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { showToast } from "./toast";
import { Loading } from "./loading";

interface LoginFormData {
  admin: string;
  password: string;
}

export const Login = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      admin: "",
      password: "",
    },
    mode: "onBlur",
  });

  const admin = useWatch({ control, name: "admin" });
  const password = useWatch({ control, name: "password" });

  const isButtonDisabled = isSubmitting || !admin || !password;

  // Check if user is already logged in
  useEffect(() => {
    const storedCredential = sessionStorage.getItem('credential');

    if (storedCredential) {
      // User is already logged in, redirect to dashboard
      router.push('/dashboard');
      return;
    }

    setIsCheckingAuth(false);
  }, [router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const { admin, password } = data;

    try {
      // Call server-side API route for authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Login failed
        showToast({
          text: "Invalid credentials",
          variant: "danger",
          icon: <AlertCircle />,
          description: "Username or password is incorrect",
        });
        setIsSubmitting(false);
        return;
      }

      // Login successful
      showToast({
        text: "Login successful",
        variant: "success",
        icon: <LogIn />,
        description: "Welcome back",
      });

      // Store credential in sessionStorage or localStorage
      sessionStorage.setItem('credential', JSON.stringify(result.credential));

      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (error) {
      console.error("Login error:", error);
      showToast({
        text: "Error logging in",
        variant: "danger",
        icon: <AlertCircle />,
        description: "An error occurred. Please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <Loading />
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-dvh px-8 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      <div className="relative w-full max-w-[480px]">
        {/* Admin Panel Card */}
        <div className="relative bg-surface border border-border rounded-lg shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-linear-to-br from-accent/10 via-primary/5 to-transparent border-b border-border px-8 py-8">
            {/* Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent to-transparent" />

            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                {/* Icon Container */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 border border-accent-soft-hover">
                  <Shield className="w-8 h-8 text-accent" />
                  <div className="absolute -inset-1 bg-accent-soft-hover rounded-xl blur-md -z-10" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Login
              </h1>
              <p className="text-sm text-muted">
                Enter your credentials to continue
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              {/* admin Field */}
              <Controller
                name="admin"
                control={control}
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    name="user-field"
                    type="text"
                    className="w-full"
                  >
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-muted" />
                      Admin
                    </Label>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      autoComplete="new-password"
                      className="border border-border"
                    />
                    {errors.admin && (
                      <div className="flex items-center gap-2 text-sm text-danger mt-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errors.admin.message}</span>
                      </div>
                    )}
                  </TextField>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    name="pass-field"
                    type="password"
                    className="w-full relative"
                  >
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted" />
                      Password
                    </Label>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      autoComplete="new-password"
                      className={`border border-border ${field.value ? 'pr-10' : ''}`}
                    />
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[calc(50%+0.75rem)] -translate-y-1/2 text-muted hover:text-foreground transition-colors z-10"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    )}
                    {errors.password && (
                      <div className="flex items-center gap-2 text-sm text-danger mt-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errors.password.message}</span>
                      </div>
                    )}
                  </TextField>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                isDisabled={isButtonDisabled}
                className="w-full mt-2 h-11 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </Form>
          </div>

          {/* Footer Section */}
          <div className="px-8 py-4 bg-default/30 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted">
              <Lock className="h-3 w-3" />
              <span>Secure and encrypted connection</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted">
            Problems accessing?{" "}
            <button
              type="button"
              className="text-accent hover:underline font-medium"
              onClick={() => {
                router.push("/");
                showToast({
                  text: "Error: Soporte no disponible",
                  variant: "danger",
                  icon: <AlertCircle />,
                  description: "No se pudo identificar el error",
                });
              }}
            >
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
