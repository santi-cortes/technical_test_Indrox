import axios from "axios";
import type { Campaign } from "../types/Campaign";

const api = axios.create({
  baseURL: "http://18.218.12.17:8000/api",
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
