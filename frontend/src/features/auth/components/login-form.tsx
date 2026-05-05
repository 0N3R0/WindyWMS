"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthFormValues } from "../validators/auth.schema";
import { useAuth } from "../hooks/use-auth"; // <--- Nasz nowy Hook!
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function LoginForm() {
  // Wyciągamy dokładnie to, czego potrzebujemy z hooka!
  const { login, isLoading, error } = useAuth();

  const form = useForm<AuthFormValues>({
    // @ts-expect-error — Zod v4 kompatybilny w runtime, typy jeszcze nie zaktualizowane
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-xl border-slate-200">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Zaloguj się</CardTitle>
        <CardDescription>Wprowadź email i hasło do systemu WindyWMS</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {/* Przekazujemy naszą funkcję login prosto do handlera */}
          <form onSubmit={form.handleSubmit(login)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="dyspozytor@wms.pl" {...field} disabled={isLoading} />
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
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Nie masz konta? <Link href="/register" className="text-primary hover:underline font-medium">Zarejestruj się</Link>
        </p>
      </CardFooter>
    </Card>
  );
}