"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { authSchema, AuthFormValues } from "../validators/auth.schema";
import { useAuth } from "../hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { login, register, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const form = useForm<AuthFormValues>({
    // @ts-ignore - Zod v4 kompatybilny w runtime, typy jeszcze nie zaktualizowane
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(isLogin ? login : register);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2 text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-violet-300">
            {isLogin ? "Witaj ponownie" : "Utwórz konto"}
          </h2>
          <p className="text-sm text-violet-300/60">
            {isLogin ? "Wprowadź email i hasło do systemu WindyWMS" : "Zarejestruj się jako dyspozytor w WindyWMS"}
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-300/60">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="dyspozytor@wms.pl"
                  {...field}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-violet-200 placeholder:text-violet-300/30 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-300/60">Hasło</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-violet-200 placeholder:text-violet-300/30 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-300/60 hover:text-violet-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <div className="text-sm font-medium text-red-400">{error}</div>}

        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          disabled={isLoading}
        >
          {isLoading
            ? (isLogin ? "Logowanie..." : "Tworzenie konta...")
            : (isLogin ? "Zaloguj się" : "Zarejestruj się")}
        </Button>
      </form>
    </Form>
  );
}