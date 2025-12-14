import axios from "axios";
import type { Campaign } from "../types/Campaign";

const BACKEND_URL = import.meta.env.VITE_INDROX_URL_BACKEND || "http://localhost:8000";

const api = axios.create({
  baseURL: BACKEND_URL + "/api",
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
