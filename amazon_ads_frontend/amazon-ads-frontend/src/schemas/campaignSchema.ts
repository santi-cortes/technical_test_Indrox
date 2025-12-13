import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  budget: z.number().min(1, "El presupuesto debe ser mayor a 0"),
  keywords: z.array(z.string().min(1, "La keyword no puede estar vacía")),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;
