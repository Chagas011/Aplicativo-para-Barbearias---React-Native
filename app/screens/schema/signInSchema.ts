import z from "zod";

export const signInSchema = z.object({
  email: z.email("Informe um e-mail valido"),
  password: z
    .string()
    .min(8, "A senha precisa ter pelo menos 8 Caracteres")
    .regex(/[A-Z]/, "A senha precisa ter pelo menos 1 letra maiuscula")
    .regex(/[a-z]/, "A senha precisa ter pelo menos 1 letra minuscula")
    .regex(/[0-9]/, "A senha precisa ter pelo menos 1 numero")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha precisa ter pelo menos 1 caracter especial [@#$%*]",
    ),
});

export type SignInSchema = z.infer<typeof signInSchema>;
