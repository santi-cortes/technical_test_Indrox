export type CampaignStatus = "PENDING" | "PROCESSING" | "ACTIVE" | "FAILED";

export interface Campaign {
  id: number;
  name: string;
  budget: string;
  keywords: string;
  status: CampaignStatus;
  external_id: string | null;
  created_at: string;
}
