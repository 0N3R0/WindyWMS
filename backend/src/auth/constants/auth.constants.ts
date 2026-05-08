export const AUTH_CONSTANTS = {
  jwtExpirationSeconds: 12 * 60 * 60,
  passwordMinLength: 8,

  messages: {
    errors: {
      EMAIL_TAKEN: "Ten adres e-mail jest już zajęty",
      INVALID_CREDENTIALS: "Nieprawidłowy e-mail lub hasło",
      USER_NOT_FOUND: "Użytkownik o podanym adresie nie istnieje",
      MISSING_TOKEN: "Brak tokenu autoryzacyjnego",
      INVALID_TOKEN: "Nieprawidłowy lub wygasły token"
    }
  }
} as const;