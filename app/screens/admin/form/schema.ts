import { z } from "zod";

export const createBarbershopSchema = z.object({
  name: z.string().min(3, "Nome da barbearia deve ter pelo menos 3 caracteres"),

  phone: z.string().min(1, "Telefone inválido").max(20),
  file: z
    .object({
      uri: z.string(),
      type: z.enum(["image/jpeg", "image/png"]),
      name: z.string(),
      size: z.number().max(10 * 1024 * 1024),
    })
    .optional(),
  address: z.object({
    street: z.string().min(2, "Informe o nome correto da rua"),
    number: z.string().min(1, "Informe o numero da barbearia"),
    city: z.string().min(2, "Informe a cidade da barbearia"),
    state: z.string().length(2, "Informe o estado da barbearia"),
    zipCode: z.string().min(8, "Informe o CEP correto").max(9),
  }),
  socialMedia: z
    .array(
      z.object({
        name: z.string().min(1),
        url: z.string().min(1),
      }),
    )
    .optional(),
  openingHours: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      open: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      close: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
  ),
});

export type CreateBarbershopFormData = z.infer<typeof createBarbershopSchema>;
