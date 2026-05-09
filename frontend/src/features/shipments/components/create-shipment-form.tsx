"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShipmentSchema, CreateShipmentValues } from "../validators/shipment.schema";
import { shipmentsService } from "../services/shipments.service";
import { useShipments } from "../hooks/use-shipments";
import { useConstants } from "@/shared/hooks/use-constants";
import { getApiErrorMessage } from "@/shared/utils/api-error";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";

/**
 Validates and formats weight input:
 - Max 2 decimal places
 - No leading zeros (except "0.")
 - Returns the sanitized string value and parsed number (or undefined).
*/
function parseWeightInput(raw: string): { display: string; value: number | undefined } | null {
  // Reject invalid format
  if (raw !== "" && !/^\d*\.?\d{0,2}$/.test(raw)) return null;
  if (raw.length > 1 && raw.startsWith("0") && !raw.startsWith("0.")) return null;

  const parsed = parseFloat(raw);
  return {
    display: raw,
    value: raw === "" ? undefined : isNaN(parsed) ? undefined : parsed,
  };
}

export function CreateShipmentForm() {
  const { constants } = useConstants();
  const { refresh } = useShipments();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Dynamiczny schemat — limity wagi z backendu, fallback na domyślne
  const minWeight = constants?.shipments.minWeight ?? 0.1;
  const maxWeight = constants?.shipments.maxWeight ?? 1000;
  const [currentWeight, setCurrentWeight] = useState('');

  const schema = createShipmentSchema(minWeight, maxWeight);

  const form = useForm<CreateShipmentValues>({
    // @ts-expect-error — Zod v4 kompatybilny w runtime, typy jeszcze nie zaktualizowane
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: "",
      weight: 0,
    },
  });

  async function onSubmit(data: CreateShipmentValues) {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      await shipmentsService.create(data);
      form.reset();
      setCurrentWeight("");
      setSuccess(true);
      refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Błąd tworzenia przesyłki"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="py-0">
      <CardHeader className="px-4 py-4">
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Nowa przesyłka
        </CardTitle>
        <CardDescription>
          Waga: {minWeight} – {maxWeight} kg
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 items-end">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Odbiorca</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan Kowalski" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full sm:w-40">
                  <FormLabel>Waga (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min={minWeight}
                      max={maxWeight}
                      placeholder={`${minWeight}`}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={currentWeight}
                      onChange={(e) => {
                        const result = parseWeightInput(e.target.value);
                        if (!result) return;

                        setCurrentWeight(result.display);
                        field.onChange(result.value);
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Dodaj
            </Button>
          </form>
        </Form>

        {error && <div className="mt-3 text-sm font-medium text-destructive">{error}</div>}
        {success && <div className="mt-3 text-sm font-medium text-emerald-600">Przesyłka została dodana!</div>}
      </CardContent>
    </Card>
  );
}