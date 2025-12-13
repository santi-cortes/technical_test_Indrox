import axios from "axios";
import type { Campaign } from "../types/Campaign";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getCampaigns = async (): Promise<Campaign[]> => {
  const { data } = await api.get<Campaign[]>("/campaigns/");
  return data;
};

export const createCampaign = async (payload: {
  name: string;
  budget: number;
  keywords: string;
}): Promise<Campaign> => {
  const { data } = await api.post<Campaign>("/campaigns/", payload);
  return data;
};
