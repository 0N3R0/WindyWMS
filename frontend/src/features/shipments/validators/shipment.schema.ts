import { z } from "zod";

// Schemat przyjmuje dynamiczne limity z backendu
export function createShipmentSchema(minWeight: number, maxWeight: number) {
  return z.object({
    recipient: z.string().min(1, { message: "Odbiorca jest wymagany." }),
    weight: z
      .number({ message: "Waga musi być liczbą." })
      .min(minWeight, { message: `Minimalna waga to ${minWeight} kg.` })
      .max(maxWeight, { message: `Maksymalna waga to ${maxWeight} kg.` }),
  });
}

export type CreateShipmentValues = z.infer<ReturnType<typeof createShipmentSchema>>;