import z from "zod";

export const scheduleSchema = z.object({
  barber: z.object({
    id: z.string(),
  }),

  service: z.object({
    id: z.string(),
  }),

  date: z.string().min(1, "Selecione uma data"),
  time: z.string().min(1, "Selecione um horário"),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
