import z from "zod";

export const createServiceSchema = z.object({
  barberId: z.string().min(1),
  name: z.string().min(3, "Nome do serviço deve ter pelo menos 3 caracteres"),
  duration: z.string().min(1, "Informe a duração do serviço"),
  price: z.string().min(1, "Informe o preço do serviço"),
  isActive: z.boolean(),
  file: z
    .object({
      uri: z.string(),
      type: z.enum(["image/jpeg", "image/png"]),
      name: z.string(),
      size: z.number().max(10 * 1024 * 1024),
    })
    .optional(),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
