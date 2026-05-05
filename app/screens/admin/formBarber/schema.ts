import z from "zod";

export const createBarberSchema = z.object({
  barbershopId: z.string().min(1),

  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),

  workingHours: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    }),
  ),
  file: z
    .object({
      uri: z.string(),
      type: z.enum(["image/jpeg", "image/png"]),
      name: z.string(),
      size: z.number().max(10 * 1024 * 1024),
    })
    .optional(),
});

export type CreateBarberFormData = z.infer<typeof createBarberSchema>;
