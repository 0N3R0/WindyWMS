import { z } from "zod";

// Używamy tego schematu i do logowania i do rejestracji
export const authSchema = z.object({
  email: z.string().email({ message: "Podaj poprawny adres e-mail." }),
  password: z.string().min(8, { message: "Hasło musi mieć minimum 8 znaków." }),
});

export type AuthFormValues = z.infer<typeof authSchema>;