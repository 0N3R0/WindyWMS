"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthFormValues } from "../validators/auth.schema";
import { useAuth } from "../hooks/use-auth";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const form = useForm<AuthFormValues>({
    // @ts-expect-error — Zod v4 kompatybilny w runtime, typy jeszcze nie zaktualizowane
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className="space-y-5">
        <div className="space-y-2 text-center mb-6">
          <h2 className="font-heading text-2xl font-bold text-white">
            Witaj ponownie
          </h2>
          <p className="text-sm text-white/40">
            Wprowadź email i hasło do systemu WindyWMS
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/70">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="dyspozytor@wms.pl"
                  {...field}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
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
              <FormLabel className="text-white/70">Hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-violet-500/50 focus-visible:ring-violet-500/20"
                />
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
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </form>
    </Form >
  );
}